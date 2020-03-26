import React, { Component } from 'react'
import axios from 'axios'
import update from 'immutability-helper'


class CreateEvent extends Component {
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
    
      createEvent = (e) => {
       
          axios.post('/api/v1/events', {event: {name: this.state.namevalue, category: this.state.categoryvalue, 
                                                fecha_hora: this.state.fechavalue, quota: this.state.quotavalue,
                                                image: this.state.imagevalue}})
          .then(response => {
            const events = update(this.state.events, {
              $splice: [[0, 0, response.data]]
            })
            this.setState({
              events: events,
              namevalue: '',
              categoryrvalue: '',
              fechavalue:'',
              quotavalue:'',
              imagevalue:''
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
      handleFecha = (e) => {
        this.setState({fechavalue: e.target.value});
      }
      handleQuota = (e) => {
        this.setState({quotavalue: e.target.value});
      }
      handleImage = (e) => {
        this.setState({imagevalue: e.target.value});
      }

      render(){
      return (
        <div>
           
            <section className="form-registrer">
         
                <h4>Creacion de Eventos</h4>

                <input className="control" type="text" 
                    placeholder="Nombre del Evento" maxLength="100"
                    value={this.state.namevalue} onChange={this.handleName}/>

                <select value={this.state.categoryrvalue} onChange={this.handleCategory} className="control controlmenu" name="menu">
                    <option> Seleccione la Categoria </option>
                    <option value="Concierto">Concierto</option>
                    <option value="Evento Deportivo">Evento Deportivo</option>
                    <option value="Conferencia">Conferencia</option>
                </select>

                <input className="control" type="datetime-local"
                    value={this.state.fechavalue} onChange={this.handleFecha} />

                <input className="control" type="number" 
                    placeholder="Cantidad de asistentes" maxLength="7"
                    value={this.state.quotavalue} onChange={this.handleQuota} /> 

                <input className="control" type="url" 
                    placeholder="Url imagen"
                    value={this.state.imagevalue} onChange={this.handleImage} />

                <button onClick={(event) => this.createEvent(event)} type="button" className="btn btn-outline-light center">Crear Evento</button>
              
            </section>        
                
        </div>
    )
  }
}
export default CreateEvent;
