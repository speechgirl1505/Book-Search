import React from "react";
import {Row, Col} from "../Grid";


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
                                <Row className="SearchResult" id={book.title + "Card"} key={book.id}>
                                    {/* col-3 show image of the book */}
                                    <Col size="2" className="bookImage">
                                        <img src={book.image} alt={book.title} />
                                    </Col>
                                    <Col size="1" className="emptyCol"/>
                                    {/* col-9 show information of the book */}
                                    <Col size="9" className="bookInfo">
                                        <Row>
                                            <h2 className="bookTitle">{book.title}</h2>
                                        </Row>
                                        <Row>
                                            <h3 className="bookAuthor">{book.authors}</h3>
                                        </Row>
                                        <Row>
                                            <p className="bookDescription">{book.description}</p>
                                        </Row>
                                    </Col>
                                </Row>
                                <br></br>
                                <Row className="buttonDiv ">
                                    <button className="takeItAway btn" onClick={() => props.deleteBook(book.id)}>
                                        Delete Book
                                    </button>
                                    <a href={book.link}>
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