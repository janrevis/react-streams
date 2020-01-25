import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';

class StreamList extends React.Component {

  componentDidMount() {
    this.props.fetchStreams();
  }

  renderAdmin(stream) {
    if (this.props.isSignedIn && this.props.currentUserId === stream.userId) {
      return (
        <div className="ui right floated">
          <Link to={`/streams/edit/${stream.id}`} className="ui primary button">Edit</Link>
          <Link to={`/streams/delete/${stream.id}`} className="ui negative button">Delete</Link>
        </div>
      )
    }
    return <div />
  }

  renderStreamList() {

    return Object.values(this.props.streams).map(stream => {
      return (
        <div className="item" key={stream.id}>
          {this.renderAdmin(stream)}
          <i className="middle aligned camera icon" />
          <div className="content">
            <Link to={`/streams/${stream.id}`} className="header">{stream.title}</Link>
            <div className="description">{stream.desc}</div>
          </div>
        </div>
      )
    });
  }

  render() {
    return (
      <div>
        <div className="ui celled list">
        {this.renderStreamList()}
        </div>
        <Link to="/streams/new"
          className="ui button positive right floated"
          style={{ marginRight: '10px'}}>
          Create Stream
        </Link>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    streams: state.streams,
    isSignedIn: state.auth.isSignedIn,
    currentUserId: state.auth.userId
  }
}

export default connect(mapStateToProps, { fetchStreams })(StreamList);
