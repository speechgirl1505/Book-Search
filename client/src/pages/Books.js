import React, { Component } from "react";
import DeleteBtn from "../components/DeleteBtn";
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
    link: ""
  };

// use for loading saved books if you ever get to that point 
  componentDidMount() {
    this.loadBooks();
  }

 
  
loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", author: ""})
      )
      .catch(err => console.log(err));
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const theyPutSomethingIn = this.state.title || this.state.author;
    API.getBooksFromSomeWhere(theyPutSomethingIn)
      .then(res => {
     const stupid = [];   
     for (let i = 0; i < res.data.items.length; i++) {
       stupid[i] = res.data.items[i].volumeInfo;
       
     }
        console.log(res.data.items[0].volumeInfo);
        this.setState({books: stupid});
        // this.loadBooks();
        // this.setState({ books: res.data, title: "", author: "" })
      }
      )
      .catch(err => console.log(err));
  };

  deleteBook = id => {
    API.deleteBook(id)
      .then(res => this.loadBooks())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // handleSave = event => {
  //   event.preventDefault();
  //   if (this.state.title || this.state.author) {
  //     API.saveBook({
  //       title: this.state.title,
  //       author: this.state.author,
  //       description: this.state.description, 
  //       image: this.state.image,
  //       link: this.state.link
  //     })
  //       .then(res => this.loadBooks())
  //       .catch(err => console.log(err));
  //   }
  // };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-6">
            <Jumbotron>
              <h1>What Books Should I Read?</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.title}
                onChange={this.handleInputChange}
                name="title"
                placeholder="Title (required)"
              />
              <Input
                value={this.state.author}
                onChange={this.handleInputChange}
                name="author"
                placeholder="Author (required)"
              />
              {/* <TextArea
                value={this.state.description}
                onChange={this.handleInputChange}
                name="description"
                placeholder="description (Optional)"
              /> */}
              <FormBtn
                // disabled={!(this.state.author && this.state.title)}
                onClick={this.handleFormSubmit}
              >
                Search Book
              </FormBtn>
            </form>
          </Col>
          <Col size="md-6 sm-12">
            <Jumbotron>
              <h1>Books On My List</h1>
            </Jumbotron>
            {this.state.books.length ? (
             <List>
               {this.state.books.map(book => (
                 <ListItem key={book._id}>
                   <div>
                     <img src={book.imageLinks} alt=""></img>
                     <Link to={"/books/" + book._id}></Link>
                     <a href={book.previewLink}>Go to Book</a>
                     <h2>
                       {book.title} by {book.authors},
                     </h2>
                     <p>{book.description}</p>
                     <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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
