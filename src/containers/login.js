import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import * as loginAction from '../actions/index';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: "",
      password: ""
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSubmit(e) {
    e.preventDefault()
    const { actions } = this.props;
    actions.loginAction(this.state)
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  
  render() {
    if(this.props.isAuthenticated) {
      return <Redirect to={{
        pathname: '/notice-board',
        state: { from: this.props.location }
      }} />
    }
    return (
        <form className="main-form" onSubmit={this.onSubmit}>
          <table className="main-form-table">
            <thead>
              <tr>
                <th>Login</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ID</td>
                <td><input type="text" name="userid" onChange={this.onChange} /></td>
              </tr>
              <tr>
                <td>Password</td>
                <td><input type="password" name="password" onChange={this.onChange}/></td>
              </tr>
            </tbody>
          </table>
          
          <input className="main-form-btn" type="submit" value="Login" />
        </form>
    );
  }
}

function mapStateToProps(state) {
  return {
      isAuthenticated: state.loginReducer.isAuthenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
      actions: bindActionCreators(loginAction, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);