import React, { Component } from 'react'
import axios from 'axios'

class EventsIndex extends Component {
    
  constructor(props) {
    super(props)
      this.state = {
        events: [],

        namevalue: '',
        categoryvalue: '',
        fechavalue:'',
        quotavalue:'',
        imagevalue:'',
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
                    <br/> 
                    <label>{`${event.name}, ${event.category}`} </label>
                    <br/>
                    <img src={event.image} className="imagenes_evento"/> <br/>
                    <button type="button" className="btn btn-outline-light center" >Comprar Boletos</button>
                    { this.props.loggedInStatus &&
                    <button onClick={() => this.deleteEvent(event.id)} type="button" className="btn btn-outline-light center" >Eliminar</button>
                    }
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
