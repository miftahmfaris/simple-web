import React from "react";
import { AvForm, AvField } from "availity-reactstrap-validation";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3030";

class EditModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: props.fullName,
      email: props.email,
      phoneNumber: props.phoneNumber
    };
  }

  componentWillReceiveProps() {
    this.setState({
      fullName: this.props.fullName,
      email: this.props.email,
      phoneNumber: this.props.phoneNumber
    });
  }

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  editAccount = event => {
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
        console.log(res.data);
        this.props.toggle();
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
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
                onFocus={this.handleChange}
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
                onFocus={this.handleChange}
                onChange={this.handleChange}
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
                onFocus={this.handleChange}
                onChange={this.handleChange}
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
            <Button color="primary" onClick={this.editAccount}>
              Update
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default EditModal;
