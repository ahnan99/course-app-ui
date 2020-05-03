import React, { Component } from 'react'
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer'


export default class ClassPage extends Component {


    render() {
        return (
            <VideoPlayer src="https://media.w3.org/2010/05/sintel/trailer.mp4" />
        )
    }
}
