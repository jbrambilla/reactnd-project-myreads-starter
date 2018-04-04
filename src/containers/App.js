import React from 'react'
import * as BooksAPI from './../BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './../components/ListBooks';
import {Route} from 'react-router-dom';
import Utils from './../utils/Utils';
import { ClipLoader } from 'react-spinners';

class BooksApp extends React.Component {

  state = {
    books: [],
    loadingChangeShelf: false
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => (
        this.setState({books})
      ));
  }

  changeShelf = (book, e) => {
    this.setState({loadingChangeShelf: true})

    if (!this.state.books.filter(b => b.id === book.id).length) {
      this.setState((state) => ({books: state.books.concat([book])}))
    }

    BooksAPI
      .update(book, e.target.value)
      .then(values => {
        let shelves = Utils.transformShelfs(values);
        this.setState((prevState) => ({
          books: prevState.books.map(book => {
            book.shelf = shelves[book.id];
            return book;
          }),
          loadingChangeShelf: false
        }))
      })
      .catch(reason => { console.log(Error(reason))});
  }

  render() {
    const bookMap = Utils.transformBooks(this.state.books);

    return (
      <div className="app">
        {this.state.loadingChangeShelf && (
          <div className="loading">
            <ClipLoader
              color={'#2e7c31'}
              loading={this.state.loadingChangeShelf}
            />
          </div>
        )}
        <div className={`${this.state.loadingChangeShelf ? 'transparent' : ''}`}>
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
      </div>
    )
  }
}

export default BooksApp
