import React, { Component } from "react";
import { func, number } from "prop-types";
import { connect } from "react-redux";
import {
  Container,
  Row,
  Col,
  FormLabel,
  FormControl,
  Button,
  Form,
  FormGroup,
} from "react-bootstrap";
import { login } from "./login.action";
import { loginStatus } from "./login.constant";
import { loginStatusSelector } from "./login.selector";
import "./login.css";

export class Login extends Component {
  static propTypes = {
    login: func.isRequired,
    status: number.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
  }

  onUsernameChange = (e) => {
    this.setState({ username: e.target.value });
  };

  onPasswordChange = (e) => {
    this.setState({ password: e.target.value });
  };

  login = () => {
    const { username, password } = this.state;
    this.props.login(username, password);
  };

  renderError() {
    const { status } = this.props;

    switch (status) {
      case loginStatus.inProgress:
        return <span>Validating account...</span>;
      case loginStatus.fail:
        return <span>Username or password is incorrect</span>;
      default:
        return null;
    }
  }

  render() {
    return (
      <Container>
        <Col md={4} className="mx-auto mt-5">
          <Form>
            <h3>Login with admin account</h3>
            <FormGroup>
              <FormLabel>Username</FormLabel>
              <FormControl
                type="text"
                placeholder="Username"
                onChange={this.onUsernameChange}
                value={this.state.username}
              />
            </FormGroup>
            <FormGroup className="mt-4">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="Password"
                placeholder="Enter password"
                onChange={this.onPasswordChange}
                value={this.state.password}
              />
            </FormGroup>

            <Button
              className="mt-4"
              block
              size="lg"
              bsstyle="primary"
              onClick={this.login}
            >
              Login
            </Button>
            <Row>{this.renderError()}</Row>
          </Form>
        </Col>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    status: loginStatusSelector(state),
  };
}
function mapDispatchToProps(dispatch) {
  return {
    login: login(dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
