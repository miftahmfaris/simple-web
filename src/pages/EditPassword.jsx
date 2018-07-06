import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button } from "reactstrap";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030";

class EditPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ""
    };
    this.handleChangePassword = this.handleChangePassword.bind(this);
    this.editPassword = this.editPassword.bind(this);
  }

  handleChangePassword(event) {
    let value = event.target.value;
    this.setState(() => {
      return { password: value };
    });
  }

  async getDataUser() {
    let id = window.localStorage.id;
    await axios
      .get(`${API_URL}/accounts/${id}`)
      .then(res => {
        console.log(res.data.data);
        if (res.data.data.password === this.state.password) {
          this.setState({
            password: this.state.password
          });
          console.log(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    this.getDataUser();
  }

  editPassword(event) {
    event.preventDefault();
    let id = window.localStorage.id;
    axios({
      url: `${API_URL}/accounts/password/${id}`,
      method: "PUT",
      headers: {
        Authorization: "Bearer" + window.localStorage.token
      },
      data: {
        password: this.state.password
      }
    })
      .then(res => {
        console.log(this.state.password);
        console.log(res.data);
        // if (this.state.password !== res.data.data.password) {
        //   console.log(false);
        // }
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <div className="center">
          <h1>Edit Your Password Here</h1>
        </div>

        <div>
          <div>
            <div className="center">
              <div className="container">
                <AvForm>
                  <AvField
                    placeholder="Old Password"
                    name="fullName"
                    label="Name"
                    type="password"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                    onFocus={this.handleChangeFullName}
                    onChange={this.handleChangePassword}
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
                    name="originalEmail"
                    label="Email"
                    type="password"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
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
                    name="confirmationEmail"
                    label="Email"
                    type="password"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                    validate={{
                      match: {
                        value: "originalEmail",
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
                >
                  Update
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default EditPassword;
