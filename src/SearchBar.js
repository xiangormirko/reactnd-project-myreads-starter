import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'

class SearchBar extends Component {

  // static propTypes = {
  //   onUpdateQuery: PropTypes.func.isRequired
  // }

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim()
    })
    )

    BooksAPI.search(query)
      .then((res) => {
        if (res && !res.error) {
        this.setState(() => ({
          books : res
        }))
      } else {
        console.log('no response')
      }
      })
  }

  render() {
    const {query} = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link onClick={this.forceUpdate} to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <div>
            <BookShelf
              books = {this.state.books ? this.state.books : []}
              shelfSection = {'Your Results'}
              onUpdateBookShelf = {this.props.addBook}
            />
          </div>
        </div>
      </div>
    )
  }

}

export default SearchBar
