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
  Button,
  Card, CardHeader
} from "shards-react";
import API from "../utils/API";

export default class UserEdit extends Component {
  constructor(props) {
    super(props);

    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      status: '',
      picture: '',
      newsletter: false
    }
  }

  async componentDidMount() {
    try {
      const { data } = await API.getUser(this.props.match.params.id);
      this.setState(data);
    } catch (error) {
      console.log(error);
    }
  }

  handleChangeFirstName(e) {
    this.setState({
      firstName: e.target.value
    })
  }

  async onSubmit(e) {
    e.preventDefault();

    const user = {
      firstName: this.state.firstName,
    }

    try {
      await API.editUser(this.props.match.params.id, user);
      window.location = '/';
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <Card small>
        <CardHeader className="border-bottom">
          <h6 className="m-0">Edit User</h6>
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
                        onChange={this.handleChangeFirstName}
                      />
                    </Col>
                    <Col md="4" className="form-group">
                      <label htmlFor="feLastName">Last Name</label>
                      <FormInput id="feLastName"
                        disabled
                        value={this.state.lastName}
                      />
                    </Col>
                    <Col md="4">
                      <label htmlFor="feEmailAddress">Email</label>
                      <FormInput id="feEmailAddress"
                        type="email"
                        disabled
                        value={this.state.email}
                      />
                    </Col>
                  </Row>
                  <Row form>
                    <Col md="4">
                      <label htmlFor="fePassword">Password</label>
                      <FormInput id="fePassword"
                        type="password"
                        disabled
                        value="********"
                      />
                    </Col>
                    <Col md="4">
                      <label htmlFor="feInputStatus">Status</label>
                      <FormInput id="feInputStatus"
                        disabled
                        value={this.state.status}
                      />
                    </Col>
                    <Col md="4">
                      <label htmlFor="feInputNewsletter">Newsletter</label>
                      <FormInput id="feInputNewsletter"
                        disabled
                        value={this.state.newsletter ? 'Yes' : 'No'}
                      />
                    </Col>
                  </Row>

                  <FormGroup>
                    <div className="mb-3 mt-3">
                      <label>Picture: </label>
                      <div className="mb-3 mx-auto">
                        <img src={API.getPictureURL(this.state.picture)} alt="" className="img-thumbnail w-50" />
                      </div>
                    </div>
                  </FormGroup>

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