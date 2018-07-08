import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";
import { Link, withRouter } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      isValidPassword: true
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  submitForm = async event => {
    event.preventDefault();
    await axios
      .post(`${API_URL}/accounts/signin`, {
        email: this.state.email,
        password: this.state.password
      })
      .then(res => {
        if (res.data.token) {
          window.localStorage.token = res.data.token;
          window.localStorage.id = res.data.id;
          this.setState({ isValidPassword: true });
          this.props.history.push("/profile");
        } else {
          this.setState({ isValidPassword: false });
        }
      })
      .catch(error => {
        console.log(error.res);
      });
  };

  render() {
    return (
      <div>
        <div className="center">
          <h1>Welcome to Simple Website</h1>
        </div>

        <div>
          <div className="center">
            <div className="container">
              <Form onSubmit={this.submitForm}>
                <FormGroup>
                  <Label for="inputEmail">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="inputEmail"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="inputPassword">Password</Label>
                  &nbsp;&nbsp;
                  {this.state.isValidPassword ? (
                    <span />
                  ) : (
                    <span className="invalid-notif">
                      (Your Password or Email is Invalid)
                    </span>
                  )}
                  <Input
                    type="password"
                    name="password"
                    id="inputPassword"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <Button outline color="secondary" size="lg" block>
                  Sign In
                </Button>
              </Form>
            </div>
          </div>

          <div>
            <h6 className="center margin-top-5">
              Don't have an account?
              <Link to="/signup">
                <h6>Sign up here</h6>
              </Link>
            </h6>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Home);
