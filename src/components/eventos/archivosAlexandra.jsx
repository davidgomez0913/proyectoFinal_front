import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './components/Home'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isLoggedIn: false,
      user: {}
     };
  }
componentDidMount() {
    this.loginStatus()
  }
loginStatus = () => {
    axios.get('http://localhost:3001/logged_in', {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  }
handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
    })
  }
handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

sendToLogin() {
  window.location.href = "/login"
}

render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route 
              exact path='/login' 
              render={props => (
                <Login {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
            />
            <Route 
              exact path='/signup' 
              render={props => (
                <Signup {...props} handleLogin={this.handleLogin} loggedInStatus={this.state.isLoggedIn}/>
                )}
            />
                <Route 
                  exact path='/' 
                  render={props => (
                  <Home {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} sendToLogin={()=>this.sendToLogin()}/>
                  )}
                />
            
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
export default App;

// ------------- // ------------- // ------------ //
Home

import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import BooksContainer from './books/BooksContainer'
// import Book2 from './books/Book2'

const Home = (props) => {
 
 
  if (props.loggedInStatus === false) {
    window.location.href = "/login"
    // props.sendToLogin()
  } 
const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }
return (
   
    <div>
      <Link to='/login'>Log In</Link>
      <br></br>
      <Link to='/signup'>Sign Up</Link>
      <br></br>
      
     

      <BooksContainer/>
      <br></br>
      { 
        props.loggedInStatus ? 
       
        <Link to='/logout' onClick={handleClick}>Log Out</Link>
        : null
        
      }
    </div>
  );
};
export default Home;

// ------------- // ------------- // ------------ //
BooksContainer

import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class BooksContainer extends Component {
    constructor(props) {
      super(props)
      this.state = {
        books: [],
        namevalue: '',
        authorvalue: ''
      }
      }
    
    getBooks() {
        axios.get('/api/v1/books')
        .then(response => {
          this.setState({books: response.data})
        })
        .catch(error => console.log(error))
      }

      createBook = (e) => {
       
          axios.post('/api/v1/books', {book: {name: this.state.namevalue, author: this.state.authorvalue}})
          .then(response => {
            const books = update(this.state.books, {
              $splice: [[0, 0, response.data]]
            })
            this.setState({
              books: books,
              namevalue: ''
            })
          })
          .catch(error => console.log(error))      
          
      } 

      handleName = (e) => {
        this.setState({namevalue: e.target.value});
        
      }

      handleAuthor = (e) => {
     
        this.setState({authorvalue: e.target.value});
      }

      

      componentDidMount() {
        this.getBooks()
      }
      render(){
      return (
        <div>
        <div className="inputContainer">
          
          <input className="taskInput" type="text" 
            placeholder="Name of Book" maxLength="50"
            value={this.state.namevalue} onChange={this.handleName} />

          <input className="taskInput" type="text" 
            placeholder="Author" maxLength="50"
            // onKeyPress={this.createBook}
            value={this.state.authorvalue} onChange={this.handleAuthor} /> 
        </div>        
        <button onClick={(event) => this.createBook(event)}>Create Book</button>
        <div className="listWrapper">
          <ul className="taskList">
            {this.state.books.map((book) => {
              return(
                <li className="task" key={book.id}>
                               
                  <label className="taskLabel">{book.name}</label>
                 
                </li>
              )       
            })}        
          </ul>
        </div>
      </div>
    )
  }
}
export default BooksContainer;