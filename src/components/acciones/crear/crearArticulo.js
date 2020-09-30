import React, {Component} from 'react';
// Rutas y enlaces
import {Redirect} from 'react-router-dom';
// Peticiones HTTP
import axios from 'axios';
// Ventanas de alerta
import swal from 'sweetalert';
// Carga la configuracion y URL BackEnd
import Global from '../../../api/Global';
import Sidebar from '../../shared/sidebar/Sidebar';

class CrearArticulo extends Component{

    // Variables
    url = Global.url;
    tituloRef = React.createRef();
    contenidoRef = React.createRef();
    state = {
        articulo: {},
        status: null,
        selectedfile: null
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
                contenido: this.contenidoRef.current.value
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
        axios.post(this.url + "save", this.state.articulo)
        .then(res => {
            if(res.data.articulo){
                this.setState({
                    articulo: res.data.articulo,
                    status: 'waiting'
                });

                // popup de confirmacion
                swal(
                    'Articulo Creado',
                    'El articulo ha sido creado correctamente.',
                    'success'
                );

                // Subir la imagen
                if(this.state.selectedfile !== null){
                    // Sacar el id del articulo 
                    var articuloId = this.state.articulo._id;

                    // Crear formData y añadir fichero
                    const formData = new FormData();
                    formData.append(
                        'file0',
                        this.state.selectedfile,
                        this.state.selectedfile.name
                    );

                    // Peticion AJAX
                    axios.post(this.url + "upload-imagen/" + articuloId, formData)
                    .then(res => {
                        if(res.data.articulo){
                            this.setState({
                                articulo: res.data.articulo,
                                status: 'success'
                            });
                        }else{
                            this.setState({
                                articulo: res.data.articulo,
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

                }else{
                    this.setState({
                        status: 'success'
                    });
                }

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

    //----------------------------------------------------------------------------------//
    // Metodo para el evento para imagenes con el articulo                              //
    //----------------------------------------------------------------------------------//
    fileChangeEvent = (evento) => {
        // Log de seguimiento
        console.log("crearArticulo.js - Metodo fileChangeEvent"); 

        this.setState({
            selectedfile: evento.target.files[0]
        });

        //console.log(this.state);
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

                            <div className="form-group">
                                <label htmlFor="file0">Imagen</label>
                                <input type="file" name="file0" onChange={this.fileChangeEvent} />
                            </div>

                            {/*Limpiar los float */}
                            <div className="clearfix"></div>

                            <input type="submit" value="Guardar" className="btn btn-success" />
                        </form>
                    </div>

                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default CrearArticulo;