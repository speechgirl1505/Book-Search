import React, { Component } from "react";
import Btn from "../components/Btn";
import Jumbotron from "../components/Jumbotron";
import API from "../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../components/Grid";
import { List, ListItem } from "../components/List";
import { Input, FormBtn } from "../components/Form";

class Books extends Component {
  state = {
    books: [],
    title: "",
    author: "",
    description: "",
    image: "",
    link: "",
    booksearched: false
  };

  // use for loading saved books if you ever get to that point 
  componentDidMount() {
    this.loadBooks();
  }

  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: "" })
      )
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const theyPutSomethingIn = this.state.title || this.state.author;
    API.getBooksFromSomeWhere(theyPutSomethingIn)
      .then(res => {
        console.log(res.data)
        const stupid = [];
        for (let i = 0; i < res.data.items.length; i++) {
          stupid.push(res.data.items[i]);
        }
        // console.log(res.data.items[0]);
        // console.log("why arent you working " + res.data.items[0].volumeInfo.imageLinks.smallThumbnail)
        this.setState({ books: stupid, booksearched: true });
        console.log("this is the new book state")
        console.log(this.state.books)
      }
      )
      .catch(err => console.log(err));
  };

  saveBook = (id) => {
    // console.log(this.state.books);
    let savedBooks = this.state.books.filter(book => book.id === id)
    savedBooks = savedBooks[0];
    console.log(savedBooks)
   const saveTheDamnBook = {
            title: savedBooks.volumeInfo.title,
            author: savedBooks.volumeInfo.authors[0],
            description: savedBooks.volumeInfo.description, 
            image: savedBooks.volumeInfo.imageLinks.thumbnail,
            link: savedBooks.volumeInfo.previewLink
          }
          console.log(saveTheDamnBook)
    API.saveBook(saveTheDamnBook)
      .then(alert("You saved a book!"))
      .catch(err => console.log(err));
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>Search for a Book</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author"
              />
              <FormBtn
                onClick={this.handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books Results</h1>
            </Jumbotron>
            {this.state.booksearched ? (
              <List>
                {this.state.books.map(book => (
                  <ListItem key={book.id}>
                    <div>
                      <div id={book.id}>
                        <img src={book.volumeInfo.imageLinks.thumbnail} alt=""></img>
                      </div>
                      <Link to={"/books/" + book.id}></Link>
                      <a href={book.volumeInfo.previewLink}>Go to Book</a>
                      <h2>
                        {book.volumeInfo.title} by {book.volumeInfo.authors[0]},
                      </h2>
                      <p>{book.volumeInfo.description}</p>
                      <Btn onClick={() => this.saveBook(book.id)} />
                    </div>
                  </ListItem>
                ))}
              </List>
            ) : (
                <h3>No Results to Display</h3>
              )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Books;
