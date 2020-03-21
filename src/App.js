// import * as BooksAPI from './BooksAPI'
import './App.css'
import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import {Route} from 'react-router-dom'
import BookShelf from './BookShelf'
import SearchBar from './SearchBar'
import { Link } from 'react-router-dom'
import * as _ from 'underscore';




class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    showSearchPage: false,
    bookShelves: [
      {
        shelfName: 'currentlyReading',
        shelfLabel: 'Currently Reading'
      },
      {
        shelfName: 'wantToRead',
        shelfLabel: 'Want to Read'
      },
      {
        shelfName: 'read',
        shelfLabel: 'Read'
      }
    ]
  }


    componentDidMount() {
      BooksAPI.getAll()
      .then((books) => {
        this.setState(()=>({
          books
        }))
      })

    }

    onUpdateBookShelf = (book, shelf) => {
      //create a method to change the status a of a book state based on input
      BooksAPI.update(book, shelf)
        .then((res) => (
          this.setState((currentState) => ({
            books: currentState.books.map(element => element.id === book.id? {...element, shelf: shelf} : element)
          }))
        )
      )
    }

    addBook = (book, shelf) => {
      //create a method to change the status a of a book state based on input
      BooksAPI.update(book, shelf)
        .then((res) => (
          this.setState((currentState) => ({
            books: currentState.books.concat([book])
          }))
        )
      )
    }




  render() {
    console.log(this.state.bookShelves)
    return (
      <div className="app">

        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
        </div>


        <Route exact path= '/' render = {() => (

          <div className="list-books-content">
            <div>
              {this.state.bookShelves.map((shelf) => (
                <BookShelf
                  books = {this.state.books.filter((b) => b.shelf === shelf.shelfName)}
                  shelfSection = {shelf.shelfLabel}
                  key = {shelf.shelfName}
                  onUpdateBookShelf = {this.onUpdateBookShelf}
                />
              ))}
            </div>
            <div className="open-search">
              <Link to='/search'><button>Add a book</button></Link>
            </div>
          </div>
        )} />

        <Route path='/search' render ={() => (
          <SearchBar addBook = {this.addBook} />
        )}
        />
      </div>
    )
  }
}

export default BooksApp
