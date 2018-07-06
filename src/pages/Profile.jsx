import React from "react";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";
import _ from "lodash";

import EditModal from "../modal/EditModal";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      fullName: "",
      email: "",
      phoneNumber: ""
    };
    this.toggle = this.toggle.bind(this);
    this.handleSignout = this.handleSignout.bind(this);
  }

  toggle() {
    this.getDataUser();
    this.setState({
      modal: !this.state.modal
    });
  }

  async getDataUser() {
    let id = window.localStorage.id;
    await axios
      .get(`${API_URL}/accounts/${id}`)
      .then(res => {
        this.setState({
          fullName: _.startCase(_.toLower(res.data.data.fullName)),
          email: res.data.data.email,
          phoneNumber: res.data.data.phoneNumber
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  componentWillMount() {
    this.getDataUser();
  }

  handleSignout(event) {
    localStorage.clear();
    this.props.history.push("/");
  }
  render() {
    return (
      <div>
        <div>
          <h2 className="center"> {`${this.state.fullName}`} Profile</h2>
        </div>

        <div className="container">
          <h3>Name: {`${this.state.fullName}`}</h3>
          <h3>Email: {`${this.state.email}`}</h3>
          <h3>Phone Number: {`${this.state.phoneNumber}`}</h3>
          <Button outline color="success" size="lg" block onClick={this.toggle}>
            Edit
          </Button>
          <EditModal
            toggle={this.toggle}
            modal={this.state.modal}
            fullName={this.state.fullName}
            email={this.state.email}
            phoneNumber={this.state.phoneNumber}
            getDataUser={this.getAllDataUser}
          />
        </div>
        <Button
          className="margin-top-20"
          color="danger"
          size="lg"
          block
          onClick={this.handleSignout}
        >
          Sign Out
        </Button>
      </div>
    );
  }
}

export default withRouter(Profile);
