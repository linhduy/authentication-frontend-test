import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import * as fetchComments from '../actions/index';
import * as logoutAction from '../actions/index';
import CommentList from '../components/commentList'

class NoticeBoardContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {  
    };
  }
  componentDidMount() {
    const { actions } = this.props;
    const userid = this.props.user._id;
    actions.fetchComments(userid);
  }

  logoutHandle = () => {
    const { actions } = this.props;
    actions.logoutAction();
  }
  render() {
    if(!this.props.isAuthenticated) {
      return <Redirect to={{
        pathname: '/login',
        state: { from: this.props.location }
      }} />
    }
    var user = this.props.user;
    var no = 1;
    var comments = this.props.comments.map(comment => ({
      no: no++,
      _id: comment._id,
      writer: comment.writer._id,
      name: user.userid,
      time: new Intl.DateTimeFormat('en-US', {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: false
      }).format(new Date(comment.createdAt)),
      title: comment.title,
      email: comment.email,
      content: comment.content
    }));
    
    return (
      <div className="notice-board">
        <div className="notice-board-header border">
          <div className="notice-board-header-name">
            <span>{user.userid}</span>
          </div>
          <input className="notice-board-header-btn-logout" type="button" value="logout" onClick={this.logoutHandle} />
        </div>
        <div className="notice-board-main">
          <CommentList data={comments}/>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      comments: state.commentReducer.comments,
      user: state.loginReducer.user,
      isAuthenticated: state.loginReducer.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(fetchComments, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NoticeBoardContainer);