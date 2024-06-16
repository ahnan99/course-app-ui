import React, { Component } from "react";
import ReactDOM from 'react-dom';
import videojs from 'video.js'
import { connect } from "react-redux";
import 'video.js/dist/video-js.min.css'
import { message, Button, Modal } from 'antd'
import { actions as UserActions } from "../../modules/user";
import { actions as CourseActions } from "../../modules/courses";
import { bindActionCreators } from "redux";

// export default class VideoPlayer extends React.Component {
class VideoPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = { 
            maxTime: 0,
            loading: false,
            shotVisible: false,
            shotNow: false,
            shoted: 0,
            doCancel: false,
            warning: false
        }
    }

    componentDidMount() {
        const { video } = this.props
        if (video) {
            this.setState({ maxTime: video.maxTime, shotNow:  (video.shotNow===0 ? false : true) })

            const config = {
                autoplay: false,
                controls: true,
                sources: [{
                    src: video.vod,
                    type: 'video/mp4'
                }]
            };
            
            this.player = videojs(this.videoNode, config, () => {
                // How about an event listener?
                //播放事件监听
                this.player.on('play', () => {
                    if(this.state.shotNow){
                        this.player.pause();
                        this.setState({ shotVisible: true, doCancel: false });
                    }
                });

                // 快进事件
                this.player.on('seeking', () => {
                    if (this.player.currentTime() > this.state.maxTime) {
                        this.player.currentTime(this.state.maxTime)
                        message.warning('请不要跳过未观看部分')
                    }
                })

                //暂停事件监听
                this.player.on('pause', function () {
                    // message.warning("pause now")
                });
            });
    
            this.timer = setInterval(() => {
                if (this.player.currentTime() > this.state.maxTime && !this.state.shotNow) {
                    this.setState({ maxTime: this.player.currentTime() }, () => {
                        this.props.courseActions.postMaxTime({ ID: video.ID, currentTime: this.player.currentTime(), shoted: this.state.shoted });
                        this.setState({ shoted: 0 });   // 恢复未检测状态
                    })
                }
            }, 1000 * 10)
            this.player.currentTime(video.lastTime)
        }
    }

    componentDidUpdate () {
        if(this.props.course.maxTimeRes && this.props.course.maxTimeRes.status === 1 && !this.state.shotVisible){
            this.setState({ shotNow: true });
            this.props.courseActions.updateMaxTime(null)
        }
        if(this.state.shotNow && !this.state.shotVisible && !this.state.doCancel){
            this.setState({ shotVisible: true });
            this.player.pause();
        }
        if(this.state.shotVisible && this.props.user.faceDetectOSS){
            message.warning(this.props.user.faceDetectOSS.msg);
            if(this.props.user.faceDetectOSS.status===2 && !this.state.warning){
                // 比对未通过
                this.setState({ warning: true });
            }
            if(this.props.user.faceDetectOSS.status<2){
                // 比对通过或没有比对
                this.setState({ shotVisible: false, shotNow: false, shoted: 1, warning: false });
                this.player.play();
            }
            this.props.userActions.updateFaceDetectOSS(null);
        }
    }

    handleClick = () => {
        // 需要获取真实的dom元素的点击事件，而不是react实例
        ReactDOM.findDOMNode(this.fileInput).click();
    };

    handleChange = info => {
        // console.log("file：", info.target.files[0]);
        this.getBase64(info.target.files[0], (result) => {
            // console.log("dataBase64", result);
            message.warning("after read");
            this.props.userActions.postFaceDetectOSS({
                refID: this.props.video.ID,
                kindID: 0,
                base64Data: result,
                username: this.props.application.username
            })
        });
    };

    getBase64(file, cb) {
        message.warning("before read");
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            message.warning(error);
            console.log('Error: ', );
        };
    }
        
    onClickCancel = () => {
        this.setState({ shotVisible: false, doCancel: true });
    }

    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
        clearInterval(this.timer)
        clearInterval(this.timer1)
    }

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        const { video } = this.props
        if(!video){
            return (
                <div>
                   <p>本节课无视频资料</p> 
                </div>
            )
        }
        return (
            <div className="container">
                <Modal
                    visible={this.state.shotVisible}
                    title="头像检测"
                    centered
                    footer={[<Button onClick={this.onClickCancel}>取消</Button>, 
                            <Button type='primary' onClick={this.handleClick}>拍照</Button>]} 
                    >
                    <span style={{'fontSize':'1.3em', 'color':'red'}}>将检测您的正面头像，请平视摄像头</span>
                </Modal>
                <input
                    id="file"
                    type="file"
                    name="singlePhoto"
                    // capture="camera"
                    capture="user"
                    ref={(el) => (this.fileInput = el)}
                    accept="image/*"
                    onChange={this.handleChange}
                    style={{ display: "none" }}
                />
                <div data-vjs-player onContextMenu={e => e.preventDefault()}>
                    <video ref={node => this.videoNode = node} className="video-js vjs-default-skin vjs-16-9" data-setup='{"fluid": true}' preload="auto" style={{ width: "100%" }}></video>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    application: state.application,
    user: state.user,
    course: state.course
})

const mapDispatchToProps = (dispatch) => ({
  userActions: bindActionCreators(UserActions, dispatch),
  courseActions: bindActionCreators(CourseActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoPlayer);