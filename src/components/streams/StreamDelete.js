import React from 'react';
import { connect } from 'react-redux';

import Modal from '../Modal';
import history from '../../history';
import { fetchStream, deleteStream } from '../../actions';


class StreamDelete extends React.Component {

  componentDidMount() {
      this.props.fetchStream(this.props.match.params.id);
  }

  onDismiss = () => {
    history.goBack();
  }

  onDeleteStream = () => {
    this.props.deleteStream(this.props.match.params.id);
  }

  renderActions() {
    return (
      <React.Fragment>
        <button className="ui button negative" onClick={this.onDeleteStream}>Delete</button>
        <button className="ui button" onClick={history.goBack}>Cancel</button>
      </React.Fragment>
    )
  }

  render() {
    const id = this.props.match.params.id;
    const content = this.props.streams[id] ? `Do you want to delete the stream titled "${this.props.streams[id].title}"?` : ""
    return (
      <Modal title="Delete Stream"
        content={content}
        actions={this.renderActions()}
        onDismiss={this.onDismiss}
      />
    )
  }
}

function stateToProps(state) {
  return {
    streams: state.streams
  }
}

export default connect(stateToProps, { fetchStream, deleteStream })(StreamDelete);
