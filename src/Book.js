import React, {Component} from 'react';
import uuid from 'uuid';

class Book extends Component{

    constructor(props) {
        super(props);
        this.updateBookShelf = this.updateBookShelf.bind(this);
    }

    state = {
        displayedBook: this.props.book
    }
    
    componentDidMount() {
        const {book, booksInShelf} = this.props;
        const bookInShelf = booksInShelf ? booksInShelf.filter(item => item.id === book.id)[0] : '';
        if (bookInShelf) {
            book.shelf = bookInShelf.shelf;
            this.setState({
                displayedBook: book
            });
        }
    }
    
    updateBookShelf(book, event) {
        const updatedBookShelf = event.target.value;
        this.props.updateBookShelf(book, updatedBookShelf);  
    }

    render() {
        const book = this.state.displayedBook;
        return (
            <li key={uuid()}>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks ? book.imageLinks.thumbnail: ''})` }}></div>
                        <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={(event) => this.updateBookShelf(book, event)}>
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
        );
    }
}

export default Book;