import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';

function ListBooks(props) {
  const {books, onChangeShelf} = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Curretly Reading</h2>
            <div className="bookshelf-books">
              {books.currentlyReading && (<BookShelf books={books.currentlyReading} onChangeShelf={onChangeShelf}  />)}
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              {books.wantToRead && (<BookShelf books={books.wantToRead} onChangeShelf={onChangeShelf}  />)}
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              {books.read && (<BookShelf books={books.read} onChangeShelf={onChangeShelf}  />)}
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">Add a book</Link>
      </div>
    </div>
  )
}

ListBooks.propTypes = {
  books: PropTypes.object.isRequired,
  onChangeShelf: PropTypes.func.isRequired
}

export default ListBooks