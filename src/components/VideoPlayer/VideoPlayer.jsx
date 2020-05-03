import React from 'react';
import videojs from 'video.js'

export default class VideoPlayer extends React.Component {
    componentDidMount() {
        const config = {
            autoplay: false,
            controls: true,
            sources: [{
                src: this.props.src,
                type: 'video/mp4'
            }]
        };
        this.player = videojs(this.videoNode, config, function onPlayerReady() {
            console.log('onPlayerReady', this);
        });
    }


    componentWillUnmount() {
        if (this.player) {
            this.player.dispose();
        }
    }

    // wrap the player in a div with a `data-vjs-player` attribute
    // so videojs won't create additional wrapper in the DOM
    // see https://github.com/videojs/video.js/pull/3856
    render() {
        return (

            <div>
                <div data-vjs-player>
                    <video ref={node => this.videoNode = node} className="video-js vjs-default-skin video" preload="auto" style={{ width: "100%" }}></video>
                </div>
            </div>
        )
    }
}