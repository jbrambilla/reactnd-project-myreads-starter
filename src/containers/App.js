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
    BooksAPI
      .update(book, e.target.value)
      .then(values => {
        this.setState((prevState) => {
          books: prevState.books.map(book => {
            book.shelf = Utils.getShelf(values, book.id);
            return book;
          })
        })
      })
      .catch(reason => { console.log(Error(reason))});
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
