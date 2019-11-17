import React from "react";
import {Row, Col} from "../Grid"

const SavedList = props => {
    return (props.books.length === 0) ? (
        <div className="card">
            <div className="card-body player">
                <div className="article">
                    <h3>Books that You Saved</h3>
                </div>
            </div>
        </div>
    ):(
        <div className="card">
            <div className="card-body player">
                <div className="article">
                    <h3>Books that You Saved</h3>
                    {props.books.map(book => {
                        return (
                            <li className="saved-list list-group-item">
                                <Row className="SearchResult" id={book.volumeInfo.title + "Card"} key={book.volumeInfo.id}>
                                    {/* col-3 show image of the book */}
                                    <Col size="2" className="bookImage">
                                        <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.volumeInfo.title} />
                                    </Col>
                                    <Col size="1" className="emptyCol"/>
                                    {/* col-9 show information of the book */}
                                    <Col size="9" className="bookInfo">
                                        <Row>
                                            <h2 className="bookTitle">{book.volumeInfo.title}</h2>
                                        </Row>
                                        <Row>
                                            <h3 className="bookAuthor">{book.volumeInfo.authors}</h3>
                                        </Row>
                                        <Row>
                                            <p className="bookDescription">{book.volumeInfo.description}</p>
                                        </Row>
                                    </Col>
                                </Row>
                                <br></br>
                                <Row className="buttonDiv ">
                                    <button className="deleteBook btn btn-danger" id={book.volumeInfo.id} onClick={() => props.deleteBook(book.volumeInfo.id)}>
                                        Delete Book
                                    </button>
                                    <a href={book.volumeInfo.previewLink}>
                                        <button className="viewBook btn">
                                            View Book
                                        </button>
                                    </a>
                                </Row>
                            </li>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}
export default SavedList