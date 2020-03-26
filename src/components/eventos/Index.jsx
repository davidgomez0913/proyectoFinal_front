import React, { Component, useState } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import EditEvent from './EditEvent'
import ReactCardFlip from 'react-card-flip';

class EventsIndex extends Component {
    
  constructor(props) {
    super(props)
      this.state = {
        events: [],

        namevalue: '',
        categoryvalue: '',
        fechavalue:'',
        quotavalue:'',
        imagevalue:''
      }
  }
  
  getEvents() {
    axios.get('/api/v1/events')
    .then(response => {
      this.setState({events: response.data})
      console.log(response.data)

    }) 
    .catch(error => console.log(error))
  }

  deleteEvent=  (id) => {
    axios.delete(`/api/v1/events/${id}`);
    console.log(id);
  }

  /*IndexEvent = (props) => {
    const [isFlipped, setIsFlipped] = useState(false);
  }
  handleClick = () => {
    setIsFlipped(!isFlipped);
  }*/
  
  componentDidMount() {
    this.getEvents()
  }

  
  render(){
    return (
        <div>
          
          <div className="listWrapper">
            <br></br>
            <ul className="centrado">
              {this.state.events.map((event,indice) => {      
                return(
                  
                  
                  <li key={event.id}>
                    <label>{`${event.name}, ${event.category}`} </label>
                    <br/>
                    <img src={event.image} className="imagenes_evento"/> <br/>
                    <button onClick={() => this.deleteEvent(event.id)} type="button" className="btn btn-outline-light center" >Eliminar</button>
                    {/*<button type="button" onClick={this.handleClick()}> Ver Detalles </button>*/}
                  </li>

                  

                  
                )       
              })}        
            </ul>
          </div>
        </div>
    )
  }
}
export default EventsIndex;
