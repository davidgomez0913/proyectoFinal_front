import React, { Component } from 'react'
import axios from 'axios'
import {update} from 'immutability-helper'

class EditEvent extends Component {
    constructor(props) {
      super(props)
      this.state = {
        events: [],

        idvalue: '',
        namevalue: '',
        categoryvalue:  '',
        fechavalue: '',
        quotavalue: '',
        imagevalue: ''
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

    editEvent = (e) => {
      
        axios.put(`/api/v1/events/${this.state.idvalue}`, {event: {id:this.state.id, 
                                                                  name: this.state.namevalue, 
                                                                  category: this.state.categoryvalue, 
                                                                  fecha_hora: this.state.fechavalue, 
                                                                  quota: this.state.quotavalue,
                                                                  image: this.state.imagevalue}})
        .then(response => {
          const events = update(this.state.events, {
            $splice: [[0, 0, response.data]]
          })
          this.setState({
            events: events,
            idvalue: '',
            namevalue: '',
            categoryvalue:  '',
            fechavalue: '',
            quotavalue: '',
            imagevalue: ''
          })
        })
        .catch(error => console.log(error))      
        
    } 
      
    editValoresEvent = event =>{
      console.log(event);
      this.setState({idvalue: event.id, 
                    namevalue: event.name,
                    categoryvalue: event.category,
                    fechavalue: event.fecha_hora,
                    imagevalue: event.image,
                    quotavalue: event.quota
                  })
    }
    
    handleName = (e) => {
      this.setState({namevalue: e.target.value});
    }
    handleCategory = (e) => {
      this.setState({categoryvalue: e.target.value});
    }
    handleFecha = (e) => {
      this.setState({fechavalue: e.target.value});
    }
    handleQuota = (e) => {
      this.setState({quotavalue: e.target.value});
    }
    handleImage = (e) => {
      this.setState({imagevalue: e.target.value});
    }
    handleId = (e) => {
      this.setState({idvalue: e.target.value});
    }

    componentDidMount() {
      this.getEvents()
    }

    render(){
      return (
        <div className="centrado">
          <h3 className="notaEdit">Seleccione el nombre del evento que desea modificar: </h3> <br/>
              {this.state.events.map((event,indice) => {      
                return(
                  <a className="bloque" key={event.id}>
                    <button onClick={() => this.editValoresEvent(this.state.events[indice]) } type="button" className="btn btn-outline-light center" >{event.name}</button>                  
                  </a>
                )       
              })}

            <section className="form-registrer">
         
                <h4>Editar Eventos</h4>             

                <input className="control" type="text" 
                    placeholder="Nombre del Evento" maxLength="100"
                    value={this.state.namevalue} onChange={this.handleName}/>

                <select value={this.state.categoryrvalue} onChange={this.handleCategory} className="control controlmenu" name="menu">
                    <option defaultValue> Cambio de categoria </option>
                    <option value="Concierto">Concierto</option>
                    <option value="Evento Deportivo">Evento Deportivo</option>
                    <option value="Conferencia">Conferencia</option>
                </select>

                <input className="control" type="datetime-local"
                    value={this.state.fechavalue} onChange={this.handleFecha} />

                <input className="control" type="number" 
                    placeholder="Cantidad de asistentes" maxLength="8"
                    value={this.state.quotavalue} onChange={this.handleQuota} /> 

                <input className="control" type="url" 
                    placeholder="Url imagen"
                    value={this.state.imagevalue} onChange={this.handleImage} />

                <p className="nota">Nota: La fecha y el tipo de evento quedan guardados, si no se necesita cambiar, no mover los campos </p>
                <button onClick={(event) => this.editEvent(event)} type="button" className="btn btn-outline-light center">Editar Evento</button>
                
            </section>        
                
        </div>
    )
  }
}
export default EditEvent;
