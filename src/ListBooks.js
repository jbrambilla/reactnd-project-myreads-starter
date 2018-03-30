import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';

class ListBooks extends Component
{
  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const {books} = this.props;
    let currentlyReadingBooks = books.filter(b => b.shelf === "currentlyReading")
    let wantToReadBooks = books.filter(b => b.shelf === "wantToRead")
    let readBooks = books.filter(b => b.shelf === "read")

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title={"Currently Reading"} books={currentlyReadingBooks} />
            <BookShelf title={"Want to Read"} books={wantToReadBooks} />
            <BookShelf title={"Read"} books={readBooks} />
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