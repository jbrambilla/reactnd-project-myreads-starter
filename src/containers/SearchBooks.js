import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './../BooksAPI'
import BookShelf from './../components/BookShelf';
import PropTypes from 'prop-types';

class SearchBooks extends Component
{
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    booksOnShelves: PropTypes.array.isRequired
  }

  state = {
    query: '',
    booksFromSearch: []
  }

  updateQuery = (query) => {
    this.setState({query})
    if (query) {
      BooksAPI
        .search(query)
        .then(books => this.setState({
          booksFromSearch: books.map(book => {
            var bookInShelf = this.props.booksOnShelves.find(b => b.id === book.id)
            book.shelf = bookInShelf ? bookInShelf.shelf : 'none';
            return book;
          })
        }));
    }
  }

  render() {
    return (
        <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e) => this.updateQuery(e.target.value)} />
          </div>
        </div>
        <div className="search-books-results">
          <BookShelf
              books={this.state.booksFromSearch}
              onChangeShelf={this.props.onChangeShelf}
            />
        </div>
      </div>
    )
  }
}

export default SearchBooks