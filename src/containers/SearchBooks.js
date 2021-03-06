import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import * as BooksAPI from './../BooksAPI'
import BookShelf from './../components/BookShelf';
import PropTypes from 'prop-types';
import _ from 'lodash'
import Spinner from '../components/Spinner';

class SearchBooks extends Component
{
  static propTypes = {
    onChangeShelf: PropTypes.func.isRequired,
    booksOnShelves: PropTypes.array.isRequired
  }

  state = {
    query: '',
    booksFromSearch: [],
    loading: false,
    noResults: false
  }

  searchBooks = _.debounce((query) => {
    BooksAPI
    .search(query)
    .then(books => {
      if (!books.error) {
        this.setState({
          booksFromSearch: books.map(book => {
            var bookInShelf = this.props.booksOnShelves.find(b => b.id === book.id)
            book.shelf = bookInShelf ? bookInShelf.shelf : 'none';
            return book;
          }),
          loading: false,
          noResults: false
        })
      } else {
        this.setState({loading: false, noResults: true, booksFromSearch: []})
      }
    })
    .catch(response => console.log(new Error(response)));
  }, 1000)

  updateQuery = (query) => {
    this.setState({query, loading: true})
    if (query) {
      this.searchBooks(query)
    } else {
      this.setState({loading: false, booksFromSearch: []})
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
            <Spinner loading={this.state.loading} />
            <div className={this.state.loading ? 'transparent' : ''}>
              {this.state.noResults ? (
                <p>No results found. Please, refine your search.</p>
              ) : (
                <BookShelf
                  books={this.state.booksFromSearch}
                  onChangeShelf={this.props.onChangeShelf}
                />
              )}
            </div>
          </div>
      </div>
    )
  }
}

export default SearchBooks