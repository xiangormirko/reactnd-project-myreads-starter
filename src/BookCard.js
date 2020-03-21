import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

class BookCard extends Component {
  static propTypes = {
    book: PropTypes.object.isRequired
  }

  state = {
    bookShelfSelection: this.props.book.shelf || 'none'
  }

  handleChangeShelf = (e) => {

    const newShelf = e.target.value

    if (this.props.onUpdateBookShelf) {
      this.props.onUpdateBookShelf(this.props.book, newShelf)
    } else {
      console.log('something went wrong')
    }

    this.setState(() => ({
      bookShelfSelection: newShelf
    }))

  }

  render() {
    const {book} = this.props
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${typeof(book.imageLinks) !== "undefined" ? book.imageLinks.thumbnail : 'none' })` }}></div>
              <div className="book-shelf-changer">
                <select onChange={this.handleChangeShelf} value={this.state.bookShelfSelection}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
              </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.authors}</div>
        </div>
      </li>
    )
  }
}

export default BookCard
