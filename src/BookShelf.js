import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookCard from './BookCard'


class BookShelf extends Component {
  static propTypes = {
    shelfSection: PropTypes.string.isRequired,
    books: PropTypes.array.isRequired,
  }

  updateShelf = (books) => {
    this.setState(() => ({
      books
    })
    )
  }

  render() {
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.shelfSection}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <BookCard
                book = {book}
                key = {book.id}
                onUpdateBookShelf = {this.props.onUpdateBookShelf}
              />
            ))}
          </ol>
        </div>
      </div>
    )
  }

}

export default BookShelf
