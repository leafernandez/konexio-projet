import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormInput,
  FormGroup,
  FormCheckbox,
  FormSelect,
  Button,
  Card, CardHeader
} from "shards-react";
import API from "../utils/API";

export default class UserAdd extends Component {
  constructor(props) {
    super(props);

    this.handleChangeInput = this.handleChangeInput.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    this.checkPasswordConfirmation = this.checkPasswordConfirmation.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      status: '',
      picture: null,
      newsletter: false
    }
  }

  handleChangeInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  handleChangeCheckbox = (e) => {
    const { name, checked } = e.target;
    this.setState({
      [name]: checked
    });
  }

  checkPasswordConfirmation = (e) => {
    if (this.state.password !== e.target.value) {
      e.target.setCustomValidity("Passwords do not match");
    } else {
      e.target.setCustomValidity("");
    }
  }

  onFileChange(e) {
    this.setState({ picture: e.target.files[0] });
    e.target.parentElement.lastElementChild.innerHTML = 'File selected correctly';
  }

  async onSubmit(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('firstName', this.state.firstName);
    formData.append('lastName', this.state.lastName);
    formData.append('email', this.state.email);
    formData.append('password', this.state.password);
    formData.append('status', this.state.status);
    formData.append('picture', this.state.picture);
    formData.append('newsletter', this.state.newsletter);

    try {
      await API.addUser(formData);
      window.location = '/';
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Card small>
        <CardHeader className="border-bottom">
          <h6 className="m-0">Create New User</h6>
        </CardHeader>
        <ListGroup flush>
          <ListGroupItem className="p-3">
            <Row>
              <Col>
                <Form onSubmit={this.onSubmit}>
                  <Row form>
                    <Col md="4" className="form-group">
                      <label htmlFor="feFirstName">First Name</label>
                      <FormInput name="firstName"
                        id="feFirstName" required
                        value={this.state.firstName}
                        onChange={this.handleChangeInput}
                      />
                    </Col>
                    <Col md="4" className="form-group">
                      <label htmlFor="feLastName">Last Name</label>
                      <FormInput name="lastName"
                        id="feLastName"
                        value={this.state.lastName}
                        onChange={this.handleChangeInput}
                      />
                    </Col>
                    <Col md="4">
                      <label htmlFor="feEmailAddress">Email</label>
                      <FormInput name="email"
                        id="feEmailAddress"
                        type="email"
                        required
                        value={this.state.email}
                        onChange={this.handleChangeInput}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="4">
                      <label htmlFor="fePassword">Password</label>
                      <FormInput name="password"
                        id="fePassword"
                        type="password"
                        required
                        value={this.state.password}
                        onChange={this.handleChangeInput}
                      />
                    </Col>
                    <Col md="4">
                      <label htmlFor="fePasswordConfirm">Password Confirmation</label>
                      <FormInput name="passwordConfirm"
                        id="fePasswordConfirm"
                        type="password"
                        required
                        onChange={this.checkPasswordConfirmation}
                      />
                    </Col>
                    <Col md="4">
                      <label htmlFor="feInputStatus">Status</label>
                      <FormSelect name="status"
                        id="feInputStatus"
                        onChange={this.handleChangeInput}
                      >
                        <option value="">Choose...</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Teacher assistant">Teacher assistant</option>
                        <option value="Student">Student</option>
                      </FormSelect>
                    </Col>
                  </Row>

                  <FormGroup>
                    <div className="custom-file mb-3 mt-5">
                      <input type="file" required
                        className="custom-file-input"
                        id="pictureFile"
                        onChange={this.onFileChange}
                      />
                      <label className="custom-file-label" htmlFor="pictureFile">
                        Choose file...
                      </label>
                    </div>
                  </FormGroup>

                  <Row form>
                    <Col md="12" className="form-group">
                      <FormCheckbox name="newsletter"
                        value={this.state.newsletter}
                        onChange={this.handleChangeCheckbox}
                      >
                        Subscribe to newsletter
                      </FormCheckbox>
                    </Col>
                    <Col md="12" className="form-group">
                      <FormCheckbox required>
                        I have read terms and conditions
                      </FormCheckbox>
                    </Col>
                  </Row>

                  <Link to={"/"} className="btn btn-primary m-2">Cancel</Link>
                  <Button type="submit" className="m-2">Submit</Button>
                </Form>
              </Col>
            </Row>
          </ListGroupItem>
        </ListGroup>
      </Card>
    )
  }
}