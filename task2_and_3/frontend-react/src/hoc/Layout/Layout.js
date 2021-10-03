import React, { Component } from 'react';
import { connect } from 'react-redux'
import { logout } from '../../pages/login/login.action'
import Aux from '../Auxiliary/Auxiliary';
import Toolbar from '../../components/Navigation/Toolbar';
import classes from './Layout.css';

class Layout extends Component {
  render() {
    return (
      <Aux>
        <Toolbar
          title={this.props.title}
          username={this.props.username}
          logoutBtnHandler={this.props.onLogout} />
        <main className={classes.Content}>
          {this.props.children}
        </main>
      </Aux>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onLogout: () => dispatch(logout())
  }
}


export default connect(null, mapDispatchToProps)(Layout)