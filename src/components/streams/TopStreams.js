import React, { Component } from 'react'
import StreamItem from './StreamItem'

class TopStreams extends Component {
  render() {
    console.log(this.props.streams)
    return this.props.streams.map((stream) => (
      <StreamItem stream={stream} />
    ))
  }
}

export default TopStreams
