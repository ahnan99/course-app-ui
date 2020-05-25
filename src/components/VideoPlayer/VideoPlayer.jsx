import React from 'react';
import videojs from 'video.js'
import 'video.js/dist/video-js.min.css'
import { message } from 'antd'
import axios from 'axios'

export default class VideoPlayer extends React.Component {
    constructor(props) {
        super(props)
        this.state = { maxTime: 0 }
    }

    componentDidMount() {
        const { video } = this.props
        if (video) {
            this.setState({ maxTime: video.maxTime })

            const config = {
                autoplay: false,
                controls: true,
                sources: [{
                    src: axios.defaults.baseURL + video.filename,
                    type: 'video/mp4'
                }]
            };
            this.player = videojs(this.videoNode, config, function onPlayerReady() {
                console.log('onPlayerReady', this);
            });

            this.timer = setInterval(() => {
                if (this.player.currentTime() > this.state.maxTime) {
                    this.setState({ maxTime: this.player.currentTime() }, () => {
                        this.props.actions.postMaxTime({ ID: video.ID, currentTime: this.player.currentTime() })
                    })
                }
            }, 5000)
            this.player.currentTime(video.lastTime)
            this.player.on('seeking', () => {
                if (this.player.currentTime() > this.state.maxTime) {
                    this.player.currentTime(this.state.maxTime)
                    message.warning('请不要跳过未观看部分')
                }
            })
        }
    }


    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
        clearInterval(this.timer)
    }

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        return (

            <div>
                <div data-vjs-player>
                    <video ref={node => this.videoNode = node} className="video-js vjs-default-skin vjs-16-9" data-setup='{"fluid": true}' preload="auto" style={{ width: "100%" }}></video>
                </div>
            </div>
        )
    }
}