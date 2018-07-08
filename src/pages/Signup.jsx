import React from "react";
import { FormGroup, Button } from "reactstrap";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { withRouter } from "react-router-dom";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030";

class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      email: "",
      password: "",
      phoneNumber: "",
      isValidEmail: true,
      isValidPhone: true,
      allData: []
    };
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getAllDataUser = async () => {
    await axios
      .get(`${API_URL}/accounts`)
      .then(res => {
        this.setState({
          allData: res.data.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  cancelSignUp = () => {
    this.props.history.push("/");
  };

  submitClickForm = event => {
    event.preventDefault();
    axios
      .post(`${API_URL}/accounts`, {
        fullName: this.state.fullName,
        email: this.state.email,
        password: this.state.password,
        phoneNumber: this.state.phoneNumber
      })
      .then(res => {
        if (res.data.data) {
          console.log(res.data);
          this.props.history.push("/");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  componentWillMount() {
    this.getAllDataUser();
  }

  render() {
    const enabled =
      this.state.email.length > 0 &&
      this.state.password.length >= 8 &&
      this.state.fullName.length > 0 &&
      this.state.phoneNumber.length > 0;
    return (
      <div>
        <div className="center">
          <h1>Sign Up Your Data Here</h1>
        </div>

        <div>
          <div>
            <div className="center">
              <div className="container">
                <AvForm>
                  <AvField
                    placeholder="Full Name"
                    name="fullName"
                    label="Name"
                    onChange={this.handleChange}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter your name"
                      }
                    }}
                  />
                  <AvField
                    placeholder="Email"
                    name="email"
                    label="Email Address"
                    type="email"
                    onChange={this.handleChange}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter your email"
                      }
                    }}
                  />
                  <AvField
                    name="password"
                    label="Password"
                    type="password"
                    pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
                    placeholder="Password"
                    onChange={this.handleChange}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter your password"
                      },
                      minLength: {
                        value: 8,
                        errorMessage:
                          "Your password minimal 8 character and must contain letter and number"
                      }
                    }}
                  />
                  <AvField
                    placeholder="Phone Number"
                    name="phoneNumber"
                    label="Phone Number"
                    type="number"
                    onChange={this.handleChange}
                    validate={{
                      required: {
                        value: true,
                        errorMessage: "Please enter your phone number"
                      }
                    }}
                  />
                  <FormGroup>
                    <Button
                      outline
                      color="secondary"
                      size="lg"
                      block
                      onClick={this.submitClickForm}
                      disabled={!enabled}
                    >
                      Sign Up
                    </Button>
                    <Button
                      color="danger"
                      size="lg"
                      block
                      onClick={this.cancelSignUp}
                    >
                      Cancel
                    </Button>
                  </FormGroup>
                </AvForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Signup);
