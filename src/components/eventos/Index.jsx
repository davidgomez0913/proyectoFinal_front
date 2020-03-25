import React, { Component } from 'react'
import axios from 'axios'
import CreateEvent from './CreateEvent'


class EventsIndex extends Component {
    
  constructor(props) {
    super(props)
      this.state = {
        events: [],
        namevalue: '',
        categoryvalue: ''
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

  componentDidMount() {
    this.getEvents()
  }
  
  render(){
    //const user_events = this.props.user_id ? this.state.events.filter((event) => { return this.props.user_id === event.user_id }) : this.state.events
      return (
        <div>
          
                {/*<CreateEvent/>*/} 
          
          <div className="listWrapper">
            <br></br>
            <br></br>
            <ul className="centrado">
              {this.state.events.map((event) => {       
                return(
                  <li key={event.id}>
                    <label>{`${event.name}, ${event.category}`} </label>
                    <br/>
                    <img src={event.image} className="imagenes_evento"/>
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
