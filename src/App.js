import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Link, Route, Switch} from 'react-router-dom';
import SearchBooks from './SearchBooks';
import BookShelf from './BookShelf';
import _ from 'lodash';
import NoMatch from './NoMatch';

class App extends React.Component {
  
  constructor(){
    super();
    this.searchBook = _.debounce(this.searchBook, 300);
  }
  
  state = {
    books: [],
    bookSearchList: []
  }

  componentDidMount() {
    BooksAPI.getAll().then(books => {
      this.setState({ 
        books: books
      });
    })
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
    BooksAPI.update(book, shelf).then(() => {
      const updatedBook = this.state.books.filter(item => item.id === book.id)[0];
      const restOfBooks = this.state.books.filter(item => item.id !== book.id);
      const bookToAdd =  updatedBook ? updatedBook : book;
      bookToAdd.shelf = shelf;
      this.setState({
        books: restOfBooks.concat([bookToAdd])
      });
    }
    );
  }
  
  render() {

    const {books} = this.state;
    const currentList = books.filter(book => book.shelf === 'currentlyReading');
    const wantToReadList = books.filter(book => book.shelf === 'wantToRead');
    const readList = books.filter(book => book.shelf === 'read');  
    return (
      <div className="app">
      <Switch>
        <Route exact path="/search" render={({history}) => <SearchBooks booksInShelf={books} history={history} updateBookShelf={this.updateBookShelf.bind(this)} books={this.state.bookSearchList} 
        searchBook={this.searchBook.bind(this)} clearBookList={this.clearBookList.bind(this)}/>}/>
        <Route exact path="/" render={({history}) => 
          <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
            <div className="list-books-content">
              <BookShelf title="Currently Reading" history={history} bookList={currentList}  updateBookShelf={this.updateBookShelf.bind(this)}/>
              <BookShelf title="Want to Read" history={history}  bookList={wantToReadList}  updateBookShelf={this.updateBookShelf.bind(this)}/>
              <BookShelf title="Read"  history={history} bookList={readList} updateBookShelf={this.updateBookShelf.bind(this)} />
            </div>

            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        }
        
        />
        <Route component={NoMatch}/>
      </Switch>
      </div>

        )
  }

}

export default App;