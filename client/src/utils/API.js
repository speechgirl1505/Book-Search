import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    return axios.get("/api/books/");
  },
  // Gets the book with the given id
  getBook: function(id) {
    return axios.get("/api/books/save/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    return axios.delete("/api/books/save/" + id);
  },
  // Saves a book to the database
  saveBook: function(bookData) {
    return axios.post("/api/books/", bookData);
  }, 
  getBooksFromSomeWhere: function(query) {
    console.log(query)
    return axios.get("https://www.googleapis.com/books/v1/volumes?q=" +query);
  }
};
