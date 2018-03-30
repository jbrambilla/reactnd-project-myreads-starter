import React, {Component} from 'react'; 
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types'
import BookShelf from './BookShelf';

class ListBooks extends Component
{
  static propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
  }

  render() {
    const {books, onChangeShelf} = this.props;
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
            <BookShelf title={"Currently Reading"} books={currentlyReadingBooks} onChangeShelf={onChangeShelf}  />
            <BookShelf title={"Want to Read"} books={wantToReadBooks} onChangeShelf={onChangeShelf} />
            <BookShelf title={"Read"} books={readBooks} onChangeShelf={onChangeShelf}/>
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