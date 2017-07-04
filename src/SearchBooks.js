import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import uuid from 'uuid';

class SearchBooks extends Component {

    state = {
        query: ''
    }

    onQueryChange(event) {      
        this.setState({query: event.target.value});
        this.props.searchBook(event.target.value);
    }

    render() {
        const {books} = this.props;
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.onQueryChange.bind(this)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {!books.error && books.map(book => 
                    <li key={uuid()}>
                        <div className="book">
                          <div className="book-top">
                            <div className="book-cover" style={{ width: 128, height: 192, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail: ''})` }}></div>
                            <div className="book-shelf-changer">
                              <select>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>
                          <div className="book-title">{book.title}</div>
                          <div className="book-authors">{book.authors ? book.authors[0]: ''}</div>
                        </div>
                    </li>
                    )}
                    {books.error && 
                        <p>No books found</p>
                    }
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchBooks;