import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030";

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      email: "",
      phoneNumber: ""
    };
    this.handleChangeFullName = this.handleChangeFullName.bind(this);
    this.handleChangeEmail = this.handleChangeEmail.bind(this);
    this.handleChangePhoneNumber = this.handleChangePhoneNumber.bind(this);
    this.editAccount = this.editAccount.bind(this);
  }

  handleChangeFullName(event) {
    let value = event.target.value;
    this.setState(() => {
      return { fullName: value };
    });
    console.log(value);
  }

  handleChangeEmail(event) {
    let value = event.target.value;
    this.setState(() => {
      return { email: value };
    });
    console.log(value);
  }

  handleChangePhoneNumber(event) {
    let value = event.target.value;
    this.setState(() => {
      return { phoneNumber: value };
    });
    console.log(value);
  }

  editAccount(event) {
    event.preventDefault();
    let id = window.localStorage.id;
    axios({
      url: `${API_URL}/accounts/${id}`,
      method: "PUT",
      headers: {
        Authorization: "Bearer" + window.localStorage.token
      },
      data: {
        fullName: this.state.fullName,
        email: this.state.email,
        phoneNumber: this.state.phoneNumber
      }
    })
      .then(res => {
        this.props.toggle();
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const enabled =
      this.state.fullName.length > 0 &&
      this.state.email.length > 0 &&
      this.state.phoneNumber.length > 0;
    const defaultValues = {
      fullName: this.props.fullName,
      email: this.props.email,
      phoneNumber: this.props.phoneNumber
    };
    return (
      <div className="center">
        <Modal
          isOpen={this.props.modal}
          toggle={this.props.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.props.toggle}>Edit Form</ModalHeader>
          <ModalBody>
            <AvForm model={defaultValues}>
              <AvField
                placeholder="Full Name"
                name="fullName"
                label="Name"
                onFocus={this.handleChangeFullName}
                onChange={this.handleChangeFullName}
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
                onFocus={this.handleChangeEmail}
                onChange={this.handleChangeEmail}
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Please enter your email"
                  }
                }}
              />
              <AvField
                placeholder="Phone Number"
                name="phoneNumber"
                label="Phone Number"
                type="number"
                onFocus={this.handleChangePhoneNumber}
                onChange={this.handleChangePhoneNumber}
                validate={{
                  required: {
                    value: true,
                    errorMessage: "Please enter your phone number"
                  }
                }}
              />
            </AvForm>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={this.editAccount}
              disabled={!enabled}
            >
              Update
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
