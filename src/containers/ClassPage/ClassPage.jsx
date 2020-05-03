import React, { Component } from 'react'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'


const videoJsOptions = {
    autoplay: false,
    controls: false,
    sources: [{
      src: 'https://media.w3.org/2010/05/sintel/trailer.mp4',
      type: 'video/mp4'
    }]
  }
export default class ClassPage extends Component {


    render() {
        return (
            <VideoPlayer { ...videoJsOptions } />
        )
    }
}
