import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';

class ListBooks extends Component
{
  static propTypes = {
    books: PropTypes.object.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const {books, onChangeShelf} = this.props;

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
                <BookShelf books={books.currentlyReading} onChangeShelf={onChangeShelf}  />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BookShelf books={books.wantToRead} onChangeShelf={onChangeShelf}  />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BookShelf books={books.read} onChangeShelf={onChangeShelf}  />
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
}

export default ListBooks