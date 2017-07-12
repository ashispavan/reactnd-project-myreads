import React from 'react';
import Book from './Book';
import uuid from 'uuid';

const BookShelf = (props) => {

      const {title, bookList, updateBookShelf, history} = props;
        return(
            <div className="bookshelf">
                  <h2 className="bookshelf-title">{title}</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {bookList.map(book => 
                            <Book key={uuid()} history={history} updateBookShelf={updateBookShelf} book={book} />                                    
                      )}
                    </ol>
                  </div>
            </div>
        );
    
}

export default BookShelf;