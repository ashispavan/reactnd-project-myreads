import React, {Component} from 'react';
import Book from './Book';
import uuid from 'uuid';

class BookShelf extends Component {
    render() {
      const {title, bookList, updateBookShelf, history} = this.props;
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {bookList.map(book => 
                            <Book key={uuid()} history={history} updateBookShelf={updateBookShelf} book={book} selectedShelf={this.props.selectedShelf}/>                                    
                      )}
                    </ol>
                  </div>
                </div>
        );
    }
}

export default BookShelf;