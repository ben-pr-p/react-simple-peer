# react-simple-peer
Wraps `simple-peer` in a React component for declarative WebRTC.

For a full understanding of what is going on behind the hood, check out the
library this wraps [`simple-peer`](https://github.com/feross/simple-peer) and the
WebRTC spec on [MDN](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API).

This library has one additional benefit beyond `simple-peer` – if the stream you
pass the `SimplePeer` component changes, it will renogiate the connection to
connect the new stream.

## Usage

The component

```javascript
import SimplePeer from 'react-simple-peer'

export default class MyApp extends Component {
  componentDidMount() {
    // You now have access to this.peer.send(data) and this.peer.signal

    // Use this.peer.signal to pass SimplePeer signaling data
    ServerSocket.on('signal', signalingData => {
      this.peer.signal(signalingData)
    })
  }

  render() {
    return (
      <div>
        <SimplePeer
          ref={peer => this.refs.peer = peer} // peer will have .send and .signal
          initiator={true}                    // who should answer the call
          stream={stream}                     // something that comes from getUserMedia
          onSignal={this.onSignal}            // called back with signaling data - needs to somehow get the data to another peer
          onData={this.onData}                // called back with data another peer sent
          onConnect={this.onConnect}          // ready to use `peer.send`
          onStream={this.onStream}            // called back with a remote stream from a peer
                                                // set it as the srcObject of a video element
          onError={this.handleError}          // called back with errors from `simple-peer`
          verbose={true}                      // will log various stages an options (or not)
        />
      </div>
    )
  }
}
```
