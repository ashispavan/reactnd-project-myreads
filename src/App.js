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
    readList: [],
    bookSearchList: []
  }

  componentDidMount() {
    debugger
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

  searchBook(query) {
    BooksAPI.search(query).then(books => {
      this.setState({bookSearchList: books ? books : {error: 'No books found'}});
    })
  }

  clearBookList() {
    this.setState({bookSearchList: []});
  }

  updateBookShelf(book, shelf) {
    BooksAPI.update(book, shelf);
  }
  

  render() {
    
    const {currentList, wantToReadList, readList} = this.state;
    return (
      <div className="app">
        <Route exact path="/search" render={({history}) => <SearchBooks history={history} updateBookShelf={this.updateBookShelf.bind(this)} books={this.state.bookSearchList} 
        searchBook={this.searchBook.bind(this)} clearBookList={this.clearBookList.bind(this)}/>}/>
        <Route exact path="/" render={({history}) => 
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
            <div className="list-books-content">
              <BookShelf title="Currently Reading" history={history} bookList={currentList} selectedShelf='currentlyReading' updateBookShelf={this.updateBookShelf.bind(this)}/>
              <BookShelf title="Want to Read" history={history}  bookList={wantToReadList} selectedShelf='wantToRead' updateBookShelf={this.updateBookShelf.bind(this)}/>
              <BookShelf title="Read"  history={history} bookList={readList} selectedShelf='read' updateBookShelf={this.updateBookShelf.bind(this)} />
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