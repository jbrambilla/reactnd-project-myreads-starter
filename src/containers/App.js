import React from 'react'
import * as BooksAPI from './../BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks';
import ListBooks from './../components/ListBooks';
import {Route} from 'react-router-dom';
import Utils from './../utils/Utils';
import Spinner from './../components/Spinner';

class BooksApp extends React.Component {

  state = {
    books: [],
    loading: false
  }

  componentDidMount() {
    BooksAPI
      .getAll()
      .then(books => (
        this.setState({books})
      ));
  }

  changeShelf = (book, e) => {
    this.setState({loading: true})

    //Adds the book from search page to the shelves page in case it wasn't there
    if (!this.state.books.filter(b => b.id === book.id).length) {
      this.setState((state) => ({books: state.books.concat([book])}))
    }

    BooksAPI
      .update(book, e.target.value)
      .then(values => {
        //transform shelves array into an object wich the properties comes to be the Id from the book
        let shelves = Utils.transformShelfs(values);
        this.setState((prevState) => ({
          books: prevState.books.map(book => {
            book.shelf = shelves[book.id];
            return book;
          }),
          loading: false
        }))
      })
      .catch(reason => { console.log(Error(reason))});
  }

  render() {
    //transform books array into an object which the properties are the shelves and each shelf has a list of books
    const bookMap = Utils.transformBooks(this.state.books);

    return (
      <div className="app">
        <Spinner loading={this.state.loading} />
        <div className={this.state.loading ? 'transparent' : ''}>
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
