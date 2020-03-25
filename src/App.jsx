import React, { Component } from 'react';
import axios from 'axios'
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Login from './components/registrations/Login'
import Signup from './components/registrations/Signup'
import estaLogeado from './components/registrations/StatusLoged'
import EventsIndex from './components/eventos/Index'
import CreateEvent from './components/eventos/CreateEvent'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';


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
  handleLogin = (response) => {
    this.setState({
      isLoggedIn: true,
      user: response.user
      
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
      <body  className='fondo'>
        <header>
            <div className="cabecera">
              <div className="logo">
                  <img src="https://fotos.subefotos.com/02b664f0cf49c7689f5358094addb47bo.jpg" className ="imglogo"/>
                  {/*https://www.youtube.com/watch?v=kaOlwXiYcgk Tutorial de cabecera -->*/}
              </div>
            <nav>
                  <a className="cabeceraLinks" href="http://localhost:3000/">Inicio</a>
                  {estaLogeado(this.state.isLoggedIn)}
                  { this.state.isLoggedIn &&
                  <a className="cabeceraLinks" href="http://localhost:3000/new">Creacion de eventos</a>
                  }
                  {/* <a href="#">Contacto</a>
                      <a href="http://localhost:3000/api/v1/events/new">Creacion de eventos</a><!-- En el numeral va la URL a la que va a redireccionar -->*/}
            </nav>
          </div>
        </header>
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
                    <EventsIndex {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} sendToLogin={()=>this.sendToLogin()}/>
                    )}
                  />
                  <Route 
                    exact path='/new' 
                    render={props => (
                    <CreateEvent {...props} handleLogout={this.handleLogout} loggedInStatus={this.state.isLoggedIn} sendToLogin={()=>this.sendToLogin()}/>
                    )}
                  />
                </Switch>
              </BrowserRouter>
            </div>
          <div>
        
        </div>
      </body>
    );
  }
}
export default App;
