import React, { Component, useEffect } from 'react'
import axios from 'axios'
import update from 'immutability-helper'

class EventsIndex extends Component {
    constructor(props) {
      super(props)
      this.state = {
        events: [],
        namevalue: '',
        categoryvalue: ''
      }
      }
    
    getevents() {
        axios.get('/api/v1/events')
        .then(response => {
          this.setState({events: response.data})
        })
        .catch(error => console.log(error))
      }

      createEvent = (e) => {
       
          axios.post('/api/v1/events', {event: {name: this.state.namevalue, category: this.state.categoryvalue}})
          .then(response => {
            const events = update(this.state.events, {
              $splice: [[0, 0, response.data]]
            })
            this.setState({
              events: events,
              namevalue: ''
            })
          })
          .catch(error => console.log(error))      
          
      } 

      handleName = (e) => {
        this.setState({namevalue: e.target.value});
        
      }

      handleCategory = (e) => {
     
        this.setState({categoryvalue: e.target.value});
      }

      

      componentDidMount() {
        this.getevents()
      }
      render(){
      return (
        <div>
        <div className="inputContainer">
          
          <input className="taskInput" type="text" 
            placeholder="Event Name" maxLength="100"
            value={this.state.namevalue} onChange={this.handleName} />

          <input className="taskInput" type="text" 
            placeholder="Category" maxLength="50"
            value={this.state.categoryrvalue} onChange={this.handleCategory} /> 
        </div>        
        <button onClick={(event) => this.createEvent(event)}>Create Event</button>
        
        <div className="listWrapper">
          <ul>
                {this.state.events.map((event) => {
                  return(
                    <li key={event.id}>
                      <label>{event.name}</label>
                      <label>{event.category}</label>
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
