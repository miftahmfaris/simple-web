import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030";

class EditPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      currentPassword: "",
      retypePassword: ""
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  editPassword = event => {
    event.preventDefault();
    console.log(this.state);
    let id = window.localStorage.id;
    axios({
      url: `${API_URL}/accounts/password/${id}`,
      method: "PUT",
      headers: {
        Authorization: "Bearer" + window.localStorage.token
      },
      data: {
        password: this.state.password,
        currentPassword: this.state.currentPassword
      }
    })
      .then(res => {
        console.log(res.data);
        this.props.history.push("/");
      })
      .catch(error => {
        console.log(error);
      });
  };

  cancelResetPassword = () => {
    this.props.history.push("/profile");
  };

  render() {
    const enabled =
      this.state.password.length >= 8 &&
      this.state.currentPassword.length >= 8 &&
      this.state.retypePassword.length >= 8;
    return (
      <div>
        <div className="center">
          <h1>Edit Your Password Here</h1>
        </div>

        <div>
          <div>
            <div className="center">
              <div value className="container">
                <AvForm>
                  <AvField
                    placeholder="Old Password"
                    name="password"
                    label="Old Password"
                    type="password"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                    onFocus={this.handleChange}
                    onChange={this.handleChange}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter your name"
                      },
                      minLength: {
                        value: 8,
                        errorMessage:
                          "Your password minimal 8 character and must contain letter and number"
                      }
                    }}
                  />
                  <AvField
                    placeholder="Current Password"
                    name="currentPassword"
                    label="Current Password"
                    type="password"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                    onChange={this.handleChange}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter your Current Password"
                      },
                      minLength: {
                        value: 8,
                        errorMessage:
                          "Your password minimal 8 character and must contain letter and number"
                      }
                    }}
                  />
                  <AvField
                    placeholder="Re-type Password"
                    name="retypePassword"
                    label="Re-Type Password"
                    type="password"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                    onChange={this.handleChange}
                    validate={{
                      match: {
                        value: "currentPassword",
                        errorMessage: "Your password not match"
                      },
                      required: {
                        value: true,
                        errorMessage: "Please enter your Current Password"
                      },
                      minLength: {
                        value: 8,
                        errorMessage:
                          "Your password minimal 8 character and must contain letter and number"
                      }
                    }}
                  />
                </AvForm>
                <Button
                  outline
                  color="secondary"
                  size="lg"
                  block
                  onClick={this.editPassword}
                  disabled={!enabled}
                >
                  Update
                </Button>
                <Button
                  color="danger"
                  size="lg"
                  block
                  onClick={this.cancelResetPassword}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EditPassword);
