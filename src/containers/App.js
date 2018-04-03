import React from 'react'
import * as BooksAPI from './../BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './../components/ListBooks';
import {Route} from 'react-router-dom';
import Utils from './../utils/Utils';

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

  changeShelf = (book, e) => {
    if (!this.state.books.filter(b => b.id === book.id).length) {
      this.state.books.push(book);
    }
    BooksAPI
      .update(book, e.target.value)
      .then(values => {
        let shelves = Utils.transformShelfs(values);
        this.setState((prevState) => {
          books: prevState.books.map(book => {
            book.shelf = shelves[book.id];
            return book;
          })
        })
      })
      .catch(reason => { console.log(Error(reason))});
  }

  render() {
    const bookMap = Utils.transformBooks(this.state.books);

    return (
      <div className="app">
        <Route path="/search" render={() => (
          <SearchBooks
            onChangeShelf={this.changeShelf}
            booksOnShelves={this.state.books}
          />
        )}/>
        {bookMap.hasBooks && (
          <Route exact path="/" render={() => (
            <ListBooks
              books={bookMap}
              onChangeShelf={this.changeShelf}
            />
          )}/>
        )}
      </div>
    )
  }
}

export default BooksApp
