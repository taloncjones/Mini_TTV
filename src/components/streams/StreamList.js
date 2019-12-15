import React, { Component } from 'react'
import StreamItem from './StreamItem'

class StreamList extends Component {
  render() {
    return (
      <div className="stream-list">
        {this.props.streams.map((stream) => (
          <StreamItem key={stream.id} stream={stream} />
        ))}
      </div>
    )
  }
}

export default StreamList
