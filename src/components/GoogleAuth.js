import React from 'react';
import { connect } from 'react-redux';

import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {

  componentDidMount() {
    window.gapi.load('auth2', () => {
      window.gapi.auth2.init({
        client_id: '259961983303-9cj2mvnuadiesl8q63nqt0j7ld5hkh7j.apps.googleusercontent.com',
        scope: 'email'
      }).then(() => {
        this.auth = window.gapi.auth2.getAuthInstance();
        this.onAuthChange(this.auth.isSignedIn.get())
        this.auth.isSignedIn.listen(this.onAuthChange);
      })
    })
  }

  signIn = () => {
    this.auth.signIn();
  }

  signOut = () => {
    this.auth.signOut();
  }

  onAuthChange = (signedIn) => {
    const userId = this.auth.currentUser.get().getId();
    if (signedIn) {
      this.props.signIn(userId);
    } else {
      this.props.signOut(userId);
    }
  }


  render() {
    if (this.props.isSignedIn === null) {
      return (<div></div>);
    } else if (this.props.isSignedIn) {
      return (
        <div>
          <button className="ui red google button" onClick={this.signOut}>
            <i className="google icon" />Sign Out
          </button>
        </div>
        )
    } else {
      return (
        <div>
          <button className="ui red google button" onClick={this.signIn}>
            <i className="google icon" />Sign In
          </button>
        </div>
      )
    }
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId
  }
}

export default connect(
  mapStateToProps,
  { signIn, signOut }
)(GoogleAuth);
