import React from 'react';
import PropTypes from 'prop-types'

function BookShelf(props) {
    const {books, onChangeShelf} = props;

    return (
        <ol className="books-grid">
            {books.map(book => (
                <li key={book.id}>
                    <div className="book">
                    <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks && book.imageLinks.thumbnail})` }}></div>
                    <div className="book-shelf-changer">
                        <select onChange={(e) => onChangeShelf(book, e)} value={book.shelf}>
                            <option value="" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors && book.authors.join(', ')}</div>
                </div>
                </li>
            ))}
        </ol>
    )
}

BookShelf.propTypes = {
    books: PropTypes.array.isRequired,
    onChangeShelf: PropTypes.func.isRequired
}

export default BookShelf