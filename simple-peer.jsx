import React, { Component } from 'react'
import Peer from 'simple-peer'

export default class SimplePeer extends Component {
  peer = null

  signal = data => this.peer.signal(data)
  send = data =>
    this.peer.send(typeof data == 'object' ? JSON.stringify(data) : data)

  componentWillMount() {
    this.peer = new Peer({
      initiator: this.props.initiator,
      stream: this.props.stream
    })

    this.bindProps()
  }

  bindProps = () => {
    this.peer.on('error', this.props.onError)
    this.peer.on('signal', this.props.onSignal)
    this.peer.on('stream', this.props.onStream)
    this.peer.on('data', this.props.onData)
    this.peer.on('connect', this.props.onConnect)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stream != this.props.stream) {
      this.peer.destroy()
      this.peer = new Peer({
        initiator: this.props.initiator,
        stream: nextProps.stream
      })
    }
  }

  componentWillUnmount() {
    this.peer.destroy()
  }

  render() {
    return null
  }
}
