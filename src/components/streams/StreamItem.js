import React, { Component } from 'react'

export class StreamItem extends Component {
  getThumbnail(url) {
    var tmp = url.replace('{width}', '440')
    tmp = tmp.replace('{height}', '248')
    return tmp
  }

  render() {
    return (
      <div style={streamStyle}>
        <img src={this.getThumbnail(this.props.stream.thumbnail_url)} alt=""/>
        <p>{this.props.stream.title}</p>
      </div>
    )
  }
}

const streamStyle = {
  backgroundColor: '#333',
  padding: '10px',
  borderBottom: '1px #ccc solid',
}

export default StreamItem
