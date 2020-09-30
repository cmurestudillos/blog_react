import React, {Component} from 'react';
// Rutas y enlaces
import {Redirect} from 'react-router-dom';
// Peticiones HTTP
import axios from 'axios';
// Ventanas de alerta
import swal from 'sweetalert';
// Carga la configuracion y URL BackEnd
import Global from '../../../api/Global';

class CrearArticulo extends Component{

    // Variables
    url = Global.url;
    tituloRef = React.createRef();
    contenidoRef = React.createRef();
    state = {
        articulo: {},
        status: null
    };

    //----------------------------------------------------------------------------------//
    // Metodo para modificar el state de manera dinamica                                //
    //----------------------------------------------------------------------------------//
    cambiarState = () => {
        // Log de seguimiento
        console.log("crearArticulo.js - Metodo cambiarState"); 

        this.setState({
            articulo: {
                titulo: this.tituloRef.current.value,
                contenido: this.contenidoRef.current.value,
                fecha: new Date(),
                imagen: ''
            }
        });
    };

    //----------------------------------------------------------------------------------//
    // Metodo para recoger los datos del formulario y guardar el articulo               //
    //----------------------------------------------------------------------------------//
    guardarArticulo = (e) => {
        // Log de seguimiento
        console.log("crearArticulo.js - Metodo guardarArticulo"); 

        // cuando se lance el formulario, no se actualiza la pagina, bloquea la recarga 
        e.preventDefault();

        // Rellena el state con los datos del formulario
        this.cambiarState()

        // Peticion http 'POST' para guardar el articulo 
        axios.post(this.url + "/articulos.json", this.state.articulo)
        .then(res => {
            if(res.data){
                this.setState({
                    articulo: res.data,
                    status: 'success'
                });

                // popup de confirmacion
                swal(
                    'Articulo Creado',
                    'El articulo ha sido creado correctamente.',
                    'success'
                );
            }else{
                this.setState({
                    status: null
                });

                // popup de Error
                swal(
                    'Error',
                    'Error al crear el articulo.',
                    'error'
                );

            }
        });

        console.log("Formulario enviado");
    };

    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//     
    render(){
        // Log de seguimiento
        console.log('crearArticuloComponent - Metodo render()');

        if(this.state.status === 'success'){
            return(
                <Redirect to={'/blog'} />
            );
        }

        return (
            <div id="formulario">
                <div className="center">
                    <div id="content">
                        <h1 className="sub-header">Crear Articulo</h1>
                        <form className="middle-form" onSubmit={this.guardarArticulo}> 
                            <div className="form-group">
                                <label htmlFor="titulo">Titulo</label>
                                <input type="text" name="titulo" ref={this.tituloRef} onChange={this.cambiarState} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contenido">Contenido</label>
                                <textarea name="contenido" ref={this.contenidoRef} onChange={this.cambiarState} ></textarea>
                            </div>

                            {/*Limpiar los float */}
                            <div className="clearfix"></div>

                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CrearArticulo;