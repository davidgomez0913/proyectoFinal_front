import React, {useEffect} from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import EventsIndex from './eventos/Index'

const Home = (props) => {

  if (props.loggedInStatus === false) {
    props.sendToLogin()
  }

  const handleClick = () => {
      axios.delete('http://localhost:3001/logout', {withCredentials: true})
      .then(response => {
        props.handleLogout()
        props.history.push('/')
      })
      .catch(error => console.log(error))
    }


  const fetchDatos = () => {
    fetch ('http://localhost:3001/api/v1/events.json')
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
    });
  }
  useEffect(function(){
    fetchDatos()
  }, [] )

  return (
   
    <div>
      <Link to='/login'>Log In</Link>
      <br></br>
      <Link to='/signup'>Sign Up</Link>
      <br></br>

      <EventsIndex/>

      { 
        props.loggedInStatus ? 
        <Link to='/logout' onClick={handleClick}>Log Out</Link> : 
        null
      }
    </div>
  );
};
export default Home;