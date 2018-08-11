import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as commentAction from '../actions/index'
import CommentList from '../components/commentList'
import CommentBox from '../components/commentBox'

class CommentAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      writer: this.props.user._id,
      userid: this.props.user.userid,
      title: "",
      email: "",
      content: ""
    };
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { actions, btnHandler } = this.props;
    actions.addComment(this.state)
    btnHandler('list');
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    return (
      <div className="comment-add">
        <CommentBox data={this.state} onChange={this.onChange}/>
        <input className="comment-add-form-btn-add" type="button" value="save" onClick={this.onSubmit} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
      comments: state.commentReducer.comments,
      user: state.loginReducer.user
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(commentAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentAdd);