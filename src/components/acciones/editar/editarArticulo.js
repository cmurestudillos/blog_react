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

class EditarArticulo extends Component{

    // Variables
    url = Global.url;
    tituloRef = React.createRef();
    contenidoRef = React.createRef();
    articuloId = null;
    state = {
        articulo: {},
        status: null,
        selectedfile: null
    };

    //----------------------------------------------------------------------//
    // Antes de renderizar, cargar el metodo                                //
    //----------------------------------------------------------------------//
    componentDidMount(){  
        // Log de seguimiento
        console.log("editarArticulo.js - Metodo componentDidMount");  
         
        // Obtenemos el id del articulo a modificar
        this.articuloId = this.props.match.params.id;

        // Sacamos el articulo elegido y rellenado en el state
        this.getArticulo(this.articuloId);
    }

    //----------------------------------------------------------------------------------//
    // Metodo para obtener los datos de articulo a modificar                            //
    //----------------------------------------------------------------------------------//
    getArticulo = (id) => {
        // Log de seguimiento
        console.log("editarArticulo.js - Metodo getArticulo"); 

        axios.get(this.url + "/articulos/" + id + '.json')
        .then(res => {
            this.setState({
                articulo: res.data
            });
        });
    };

    //----------------------------------------------------------------------------------//
    // Metodo para modificar el state de manera dinamica                                //
    //----------------------------------------------------------------------------------//
    cambiarState = () => {
        // Log de seguimiento
        console.log("editarArticulo.js - Metodo cambiarState"); 

        this.setState({
            articulo: {
                titulo: this.tituloRef.current.value,
                contenido: this.contenidoRef.current.value,
                fecha: new Date()
            }
        });
    };

    //----------------------------------------------------------------------------------//
    // Metodo para recoger los datos del formulario y guardar el articulo               //
    //----------------------------------------------------------------------------------//
    guardarArticulo = (e) => {
        // Log de seguimiento
        console.log("editarArticulo.js - Metodo guardarArticulo"); 

        // cuando se lance el formulario, no se actualiza la pagina, bloquea la recarga 
        e.preventDefault();

        // Rellena el state con los datos del formulario
        this.cambiarState()

        // Peticion http 'POST' para guardar el articulo 
        axios.put(this.url + "/articulos/" + this.articuloId + '.json', this.state.articulo)
        .then(res => {
            if(res.data){
                this.setState({
                    articulo: res.data,
                    status: 'success'
                });

                // popup de confirmacion
                swal(
                    'Articulo Modificado',
                    'El articulo ha sido modificado correctamente.',
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
        console.log('editarArticuloComponent - Metodo render()');

        // Redirecion
        if(this.state.status === 'success'){
            return(
                <Redirect to={'/blog/articulo/' + this.articuloId} />
            );
        }

        var articuloUpdate = this.state.articulo;

        return (
            <div id="formulario">
                <div className="center">
                    <div id="content">
                        <h1 className="sub-header">Editar Articulo</h1>

                        {this.state.articulo.titulo &&

                            <form className="middle-form" onSubmit={this.guardarArticulo}> 
                            <div className="form-group">
                                <label htmlFor="titulo">Titulo</label>
                                <input type="text" name="titulo" defaultValue={articuloUpdate.titulo} ref={this.tituloRef} onChange={this.cambiarState} />
                            </div>

                            <div className="form-group">
                                <label htmlFor="contenido">Contenido</label>
                                <textarea name="contenido" defaultValue={articuloUpdate.contenido} ref={this.contenidoRef} onChange={this.cambiarState} ></textarea>
                            </div>

                            {/*Limpiar los float */}
                            <div className="clearfix"></div>

                            <input type="submit" value="Guardar" className="btn btn-success" />
                            </form>

                        }

                        {!this.state.articulo.titulo &&
                            <div>
                                <h1 className="sub-header">Cargando ...</h1>
                                <p>Espere mientras se carga el contenido.</p>
                            </div>

                        }
                    </div>

                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default EditarArticulo;