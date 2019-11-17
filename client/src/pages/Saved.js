import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import SavedList from "../components/SavedList"

class Saved extends Component {
  state = {
    books: []
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id

  componentDidMount() {
    API.getBook()
      .then(res => this.setState({ books: res.data }))
      .catch(err => console.log(err));
  }

  // need to make delete button
  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.componentDidMount())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Your Saved Books</h1>
            </Jumbotron>
          </Col>
        </Row>
        <Row>
          <Col size="md-10 md-offset-1">
          <SavedList books={this.state.books} deleteBook={this.deleteBook} />
          </Col>
        </Row>
        <Row>
          <Col size="md-2">
            <Link to="/">← Back to Home</Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Saved;
