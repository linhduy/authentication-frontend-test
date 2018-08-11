import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as loginAction from '../actions/index'
import ListView from './listview'
import CommentAdd from './commentAdd'
import CommentUpdate from './commentUpdate'

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: 'list',
      currentComment: {}
    };
  }
  btnHandler = (status, comment) => {
    this.setState({ status: status, currentComment: comment });
  }
  render() {
    var listData = this.props.data;
    var currentComment = this.state.currentComment;
    var main = ""
    if(this.state.status == 'add') {
      main = (<div className="comment-add">
          <CommentAdd btnHandler={this.btnHandler}/>
          <div className="comment-add-controller">
            <input type="button" name="list" value="list" onClick={() => this.btnHandler('list')}/>
          </div>
        </div>
      )
    }
    else if(this.state.status == 'update') {
      main = (<div className="comment-update">
          <CommentUpdate data={currentComment} btnHandler={this.btnHandler}/>
          <div className="comment-update-controller">
            <input type="button" name="list" value="list" onClick={() => this.btnHandler('list')}/>
          </div>
        </div>
      )
    }
    else {
      main = (<div className="comment-list-table">
        <ListView data={listData} btnHandler={this.btnHandler}/>
        <div className="comment-list-controller">
          <input type="button" name="add" value="Add" onClick={() => this.btnHandler('add')}/>
        </div>
      </div>)
    }
    return (
      <div className="comment-list border">
        <div className="comment-list-main">
          {main}
        </div>
        
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(loginAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentList);