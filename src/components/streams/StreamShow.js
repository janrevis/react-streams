import React from 'react';
import { connect } from 'react-redux';
import flv from 'flv.js';
import { fetchStream } from '../../actions'

class StreamShow extends React.Component {

  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  buildPlayer() {

    if (this.flvPlayer || !this.props.stream) {
      return;
    }
    const videoElement = this.videoRef.current;
    this.flvPlayer = flv.createPlayer({
        type: 'flv',
        url: `http://localhost:8000/live/${this.props.stream.id}.flv`
    });
    this.flvPlayer.attachMediaElement(videoElement);
    this.flvPlayer.load();
  }

  render() {
    if (!this.props.stream) {
      return <div />
    }
    const { title, desc } = this.props.stream;
    return (
      <div>
        <video ref={this.videoRef} controls style={{ width: '100%' }}/>
        <h3>{title}</h3>
        <div>{desc}</div>
      </div>

    )
  }

}

function mapStateToProps(state, ownProps) {
  return {
    stream: state.streams[ownProps.match.params.id]
  }
}

export default connect(mapStateToProps, { fetchStream })(StreamShow);
