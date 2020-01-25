import React from 'react';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

  onSubmit = formValues => {
    if (this.props.currentUserId) {
      formValues = { ...formValues, userId: this.props.currentUserId }
      this.props.createStream(formValues);
    }
  }

  render () {
    if (!this.props.isSignedIn) {
      return <div className="ui message error">You must be signed in to create a stream</div>
    }
    return (
      <div>
        <h3>Create Stream</h3>
        <StreamForm onSubmit={this.onSubmit} userId={this.props.currentUserId} isSignedIn={this.props.isSignedIn}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId
  }
}

export default connect(mapStateToProps, { createStream })(StreamCreate);
