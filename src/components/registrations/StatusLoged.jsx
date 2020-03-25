import React, {} from 'react';
import axios from 'axios'

const estaLogeado = (props) =>{

    const handleClick = () => {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then(response => {
          props.handleLogout()
          props.history.push('/')
        })
        .catch(error => console.log(error))
    }


    if(props){
      return <a  className="cabeceraLinks" href="http://localhost:3000/" onClick={handleClick}>Log Out</a>
    } else {
        return (<a>
                    <a  className="cabeceraLinks" href="http://localhost:3000/login">Log In</a> {/* Condicion Falsa, corregir, solo sale el sign up*/}
                    <a  className="cabeceraLinks" href="http://localhost:3000/signup">Sign Up</a> 
                </a> )
    }
  }

export default estaLogeado;