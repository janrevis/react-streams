import React from 'react';
import { connect } from 'react-redux';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {

  componentDidMount() {
    this.props.fetchStream(this.props.match.params.id)
  }

  onSubmit = formValues => {
    formValues = { ...formValues, userId: this.props.currentUserId }
    this.props.editStream(this.props.match.params.id, formValues, this.props.userId);
  }

  render() {
    const stream = this.props.streams[this.props.match.params.id];
    return (
      <div>
        <h1>Edit Stream</h1>
        <StreamForm isSignedIn={this.props.isSignedIn}
          userId={this.props.userId}
          initialValues={stream}
          onSubmit={this.onSubmit}
        />
      </div>
    )
  }

}

function mapStateToProps(state) {
    return {
      streams: state.streams,
      isSignedIn: state.auth.isSignedIn,
      userId: state.auth.userId
    }
}

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);
