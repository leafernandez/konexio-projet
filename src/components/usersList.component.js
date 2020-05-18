import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Card, CardHeader, CardBody } from "shards-react";
import API from "../utils/API";

const User = (props) => (
  <tr>
    <td className="w-25"><img src={API.getPictureURL(props.user.picture)} alt="" className="img-thumbnail" /></td>
    <td>{props.user.firstName + ' ' + props.user.lastName}</td>
    <td>
      <Link to={"/users/" + props.user._id} className="btn btn-primary">Edit</Link>
    </td>
  </tr>
)

export default class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = { users: [] };
  }

  async componentDidMount() {
    try {
      const { data } = await API.getUsers();
      this.setState({ users: data });
    } catch (error) {
      console.log(error);
    }
  }


  usersList() {
    return this.state.users.map(currentUser => {
      return <User user={currentUser} key={currentUser._id} />;
    })
  }

  render() {
    return (
      <Container fluid className="main-content-container px-4">
        <Row noGutters className="page-header py-4">
          <Col xs="12" sm="4" className="text-sm-left text-center text-md-left mb-sm-0 col-12 col-sm-4">
            <Link to={"/register"} className="btn btn-primary">Add a user</Link>
          </Col>
        </Row>

        <Row>
          <Col>
            <Card small className="mb-4">
              <CardHeader className="border-bottom">
                <h6 className="m-0">List of users</h6>
              </CardHeader>
              <CardBody className="p-0 pb-3">
                <table className="table mb-0">
                  <thead className="bg-light">
                    <tr>
                      <th scope="col" className="border-0">
                        Picture
                      </th>
                      <th scope="col" className="border-0">
                        Name
                      </th>
                      <th scope="col" className="border-0">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.usersList()}
                  </tbody>
                </table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <div>

          <div className="form-group">
          </div>
        </div>
      </Container>
    )
  }
}