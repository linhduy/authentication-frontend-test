import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as commentAction from '../actions/index'
import CommentList from '../components/commentList'
import CommentBox from '../components/commentBox'

class CommentUpdate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: this.props.data._id,
      writer: this.props.user._id,
      title: this.props.data.title,
      userid:  this.props.user.userid,
      content: this.props.data.content,
      email: this.props.data.email
    };
  }

  onUpdateSubmit = (e) => {
    e.preventDefault()
    const { actions, btnHandler } = this.props;
    actions.updateComment(this.state);
    btnHandler('list');
  }

  onDeleteSubmit = (e) => {
    e.preventDefault()
    const { actions, btnHandler } = this.props;
    actions.deleteComment(this.state);
    btnHandler('list');
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="comment-add">
        <CommentBox data={this.state} onChange={this.onChange}/>
        <input className="comment-add-form-btn-add" type="button" value="update" onClick={this.onUpdateSubmit} />
        <input className="comment-add-form-btn-delete" type="button" value="delete" onClick={this.onDeleteSubmit} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      comments: state.commentReducer.comments,
      user: state.loginReducer.user,
      currentComment: state.commentReducer.currentComment
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(commentAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentUpdate);