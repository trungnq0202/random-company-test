import React, { Component } from "react";
import PropTypes from "prop-types";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { tryAutoLoggingIn } from "../../pages/login/login.action";
import { ConnectedRouter } from "connected-react-router";
import Login from "../../pages/login/Login";
import UserMangement from "../../pages/userManagement/UserManagement";
import AuthenticatedRoute from "../../hoc/CustomRoute/AuthenticatedRoute";
import NotFound from "../../pages/error/NotFound/NotFound";

import "./App.css";

class App extends Component {
  static propTypes = {
    history: PropTypes.object,
  };

  componentWillMount() {
    this.props.autoLoggingIn();
  }

  render() {
    const routes = (
      <Switch>
          <AuthenticatedRoute
            path="/user-management"
            component={UserMangement}
            auth={this.props.isAuthenticated}
          />

          <Route path="/" exact component={Login} />
          <Route path="*" component={NotFound} />
      </Switch>
    );

    return (
      <ConnectedRouter history={this.props.history}>{routes}</ConnectedRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.account != null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    autoLoggingIn: () => dispatch(tryAutoLoggingIn()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
