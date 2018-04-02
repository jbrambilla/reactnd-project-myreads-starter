import React, {Component} from 'react';
import PropTypes from 'prop-types'

class BookShelf extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onChangeShelf: PropTypes.func.isRequired
    }

    handleChange = (e, book) => {
        this.props.onChangeShelf(book, e.target.value);
    }

    render() {
        return (
            <ol className="books-grid">
                {this.props.books.map(book => (
                    <li key={book.id}>
                        <div className="book">
                        <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                        <div className="book-shelf-changer">
                            <select onChange={(e) => this.handleChange(e, book)} value={book.shelf}>
                                <option value="none" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors.join(', ')}</div>
                    </div>
                    </li>
                ))}
            </ol>
        )
    }
}

export default BookShelf