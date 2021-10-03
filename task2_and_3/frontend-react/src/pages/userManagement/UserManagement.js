import React, {
  Component,
  useState,
  useRef,
  useEffect,
  createRef,
} from "react";
import { connect } from "react-redux";
import { fetchUsers } from "./userManagement.action";
import Layout from "../../hoc/Layout/Layout"

class UserManagement extends Component {
  render() {
    return (
      <Layout>
        
      </Layout>
    )
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    // account: accountSelector(state)
    account: state.auth.account,
    users: state.userManagement.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: () => dispatch(fetchUsers()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
