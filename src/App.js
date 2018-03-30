import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './ListBooks';
import {Route} from 'react-router-dom';

class BooksApp extends React.Component {

  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => (
        this.setState({books})
      ));
  }

  changeShelf = (book, shelf) => {
    BooksAPI
      .update(book, shelf)
      .then(values => {
        const newBooks = this.state.books.map(book => { 
          if (values.currentlyReading.indexOf(book.id) !== -1) {
            book.shelf = 'currentlyReading';
          } else if (values.wantToRead.indexOf(book.id) !== -1) {
            book.shelf = 'wantToRead';
          } else if (values.read.indexOf(book.id) !== -1) {
            book.shelf = 'read';
          }
          return book;
        })
        this.setState({books: newBooks})
      });
  }
  render() {
    return (
      <div className="app">
        <Route path="/search" component={SearchBooks}/>
        <Route exact path="/" render={() => (
          <ListBooks 
            books={this.state.books}
            onChangeShelf={this.changeShelf}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
