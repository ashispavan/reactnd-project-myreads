import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Link, Route} from 'react-router-dom';
import SearchBooks from './SearchBooks';
import BookShelf from './BookShelf';

class BooksApp extends React.Component {
  state = {
    books: [],
    currentList: [],
    wantToReadList: [],
    readList: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      const currentList = books.filter(book => book.shelf === 'currentlyReading');
      const wantToReadList = books.filter(book => book.shelf === 'wantToRead');
      const readList = books.filter(book => book.shelf === 'read');
      this.setState({ 
        books: books,
        currentList: currentList,
        wantToReadList: wantToReadList,
        readList: readList
      });
    }
    )
  }
  

  render() {
    
    const {currentList, wantToReadList, readList} = this.state;
    return (
      <div className="app">
        <Route exact path="/search" render={() => <SearchBooks books={this.state.books}/>}/>
        <Route exact path="/" render={() => 
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
            <div className="list-books-content">
              <BookShelf title="Currently Reading" bookList={currentList}/>
              <BookShelf title="Want to Read"  bookList={wantToReadList} />
              <BookShelf title="Read"  bookList={readList} />
            </div>

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }
        
        />
      </div>

        )
  }

}

export default BooksApp;