import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import uuid from 'uuid';
import Book from './Book';

class SearchBooks extends Component {

    state = {
        query: ''
    }

    onQueryChange(event) {      
        const searchTerm = event.target.value;
        this.setState({query: searchTerm});
        if (searchTerm){
            this.props.searchBook(searchTerm);
        }
        else {
            this.clearBookList();
        }      
    }

    clearBookList() {
        this.props.clearBookList();
    }

    render() {
        const {books, updateBookShelf, history, booksInShelf} = this.props;       
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/" onClick={this.clearBookList.bind(this)}>Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={this.onQueryChange.bind(this)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {!books.error && books.map(book => 
                        <Book key={uuid()} booksInShelf={booksInShelf} history={history} book={book} selectedShelf='none' updateBookShelf={updateBookShelf}/>
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