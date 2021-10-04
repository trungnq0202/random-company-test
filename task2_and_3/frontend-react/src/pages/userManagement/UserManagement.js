import React, { Component } from "react";
import { func, number, array } from "prop-types";
import { connect } from "react-redux";
import {
  changeEditStatus,
  fetchUsers,
  updateUsers,
} from "./userManagement.action";
import { Container, Button } from "react-bootstrap";
import { editStatus, updateStatus } from "./userManagement.constant";
import { findUpdatedUser } from "./userManagement.helper";
import Moment from "moment";
import Layout from "../../hoc/Layout/Layout";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./userManagement.css";

class UserManagement extends Component {
  static propTypes = {
    users: array.isRequired,
    editStatus: number.isRequired,
    updateStatus: number.isRequired,
    fetchUsers: func.isRequired,
    changeEditStatus: func.isRequired,
    updateUsers: func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.users !== this.props.users) {
      this.setState({ users: nextProps.users });
    }
  }

  editBtnClickHandler = (e) => {
    if (this.props.users.length !== 0) {
      this.props.changeEditStatus(this.props.editStatus);
    }
  };

  finishEditBtnClickHandler = (e) => {
    this.props.changeEditStatus(this.props.editStatus);
    this.props.updateUsers(
      findUpdatedUser(this.props.users, this.state.users)
    );
  };

  renderError() {
    const status = this.props.updateStatus;
    switch (status) {
      case updateStatus.updating:
        return (
          <span style={{ height: 15, width: "100%" }}>
            Updating users.....
          </span>
        );
      case updateStatus.updatePartiallySuccess:
        return (
          <span style={{ height: "100%", width: "100%", color: "red" }}>
            Some users are failed to update, remember username must be unique
            and email must have the right form
          </span>
        );
      case updateStatus.updateFail:
        return (
          <span style={{ height: "100%", width: "100%", color: "red" }}>
            Fail to update editted users, remember username must be unique and
            email must have the right form
          </span>
        );
      default:
        return null;
    }
  }

  onUserDataChange = (index, newUsername, newEmail, newBirthdate) => {
    let users = [...this.state.users];
    let newUser = { ...users[index] };
    if (newUsername) newUser.username = newUsername;
    if (newEmail) newUser.email = newEmail;
    if (newBirthdate) newUser.birthdate = newBirthdate;
    users[index] = newUser;
    this.setState({ users });
  };

  render() {
    return (
      <Layout>
        <Container>
          <div style={{ height: 700, width: "100%" }}>
            <SearchBar executeSearch={this.props.fetchUsers} />
            <div className="mt-3" style={{ height: 30, width: "100%", textAlign: "center" }}>
              {this.renderError()}
            </div>
            <table className="table mt-4" id="users">
              <thead>
                <tr>
                  <th scope="col" id="usernameTh">
                    Username
                  </th>
                  <th scope="col" id="emailTh">
                    Email
                  </th>
                  <th scope="col" id="dobTh">
                    Birthdate
                  </th>
                  <th style={{ wdith: "10%" }}>
                    {this.props.editStatus === editStatus.notEditting ? (
                      <Button onClick={this.editBtnClickHandler}>Edit</Button>
                    ) : (
                      <Button onClick={this.finishEditBtnClickHandler}>
                        Finish
                      </Button>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.users.map((item, index) => (
                  <tr key={item._id}>
                    <td>
                      {this.props.editStatus === editStatus.editting ? (
                        <input
                          value={item.username}
                          type="text"
                          onChange={(e) =>
                            this.onUserDataChange(
                              index,
                              e.target.value,
                              undefined,
                              undefined
                            )
                          }
                        />
                      ) : (
                        item.username
                      )}
                    </td>
                    <td>
                      {this.props.editStatus === editStatus.editting ? (
                        <input
                          value={item.email}
                          type="email"
                          onChange={(e) =>
                            this.onUserDataChange(
                              index,
                              undefined,
                              e.target.value,
                              undefined
                            )
                          }
                        />
                      ) : (
                        item.email
                      )}
                    </td>
                    <td>
                      {this.props.editStatus === editStatus.editting ? (
                        <input
                          value={Moment(item.birthdate).format("YYYY-MM-DD")}
                          type="date"
                          onChange={(e) =>
                            this.onUserDataChange(
                              index,
                              undefined,
                              undefined,
                              e.target.value
                            )
                          }
                        />
                      ) : (
                        Moment(item.birthdate).format("YYYY-MM-DD")
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    // account: accountSelector(state)
    account: state.auth.account,
    users: state.userManagement.users,
    editStatus: state.userManagement.editStatus,
    updateStatus: state.userManagement.updateStatus,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUsers: (name) => dispatch(fetchUsers(name)),
    changeEditStatus: (currentEditStatus) =>
      dispatch(changeEditStatus(currentEditStatus)),
    updateUsers: (newUsers) => dispatch(updateUsers(newUsers)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UserManagement);
