import React, {Component} from 'react';
// Peticiones HTTP
import axios from 'axios';
// Rutas
import {Redirect, Link} from 'react-router-dom';
// Ventanas de alerta
import swal from 'sweetalert';
// Libreria para fecha
import Moment from 'react-moment';
import 'moment/locale/es';
// Carga la configuracion y URL BackEnd
import Global from '../../api/Global';
// Componentes
import Sidebar from '../shared/sidebar/Sidebar';
// Imagenes
import noImagen from '../../assets/img/noimage.png';

class Articulo extends Component{

    // Variables
    url = Global.url;
    state = {
        articulo: false,
        status: null
    }

    //----------------------------------------------------------------------//
    // Antes de renderizar, cargar el metodo                                //
    //----------------------------------------------------------------------//
    componentWillMount(){  
        // Log de seguimiento
        console.log("Articulo.js - Metodo componentWillMount");  

        this.getArticulo();
    }
    //----------------------------------------------------------------------//
    // Metodo getArticulo para obtene el articulo seleccionado              //
    //----------------------------------------------------------------------//
    getArticulo = () => {
        // Log de seguimiento
        console.log("Articulo.js - Metodo getArticulo");

        var id = this.props.match.params.id;
        axios.get(this.url + "/articulos/" + id + '.json')
        .then(res => {
            this.setState({
                articulo: res.data,
                status: 'success'
            });
        });
    }; 

    //----------------------------------------------------------------------//
    // Metodo eliminarArticulo para eliminar articulo                       //
    //----------------------------------------------------------------------//
    eliminarArticulo = () => {
        // Log de seguimiento
        console.log("Articulo.js - Metodo eliminarArticulo");

        // Popup de confirmacion
        swal({
            title: "¿Estas seguro?",
            text: "Una vez eliminado, no podrá recuperar este archivo.",
            icon: "warning",
            buttons: true,
            dangerMode: true,
            })
            .then((willDelete) => {
            if (willDelete) {
                var id = this.props.match.params.id;
                axios.delete(this.url + '/articulos/' + id + '.json')
                .then(res => {
                    this.setState({
                        articulo: res.data,
                        status: 'delete'
                    });
                });
            } else {
                swal("Tu archivo esta seguro.");
            }
        });
    };

    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//     
    render(){
        // Log de seguimiento
        console.log('ArticuloComponent - Metodo render()');

        if(this.state.status === 'delete'){
            return(
                <Redirect to={'/blog'}  />
            );
        }

        var articulo = this.state.articulo;
        return (
            <div className="center">
                <section id="content">
                    {/* Si el articulo existe */}
                    {articulo &&

                    <div id="articles">
                        <article className="article-item detail">
                            <div className="image-wrap">
                            { 
                                articulo.imagen !== null ? (
                                <img src={articulo.imagen} alt={articulo.titulo} className="img-detalle-articulo center" />
                                ):(
                                    <img src={noImagen} alt={articulo.titulo} title={articulo.titulo} />
                                )
                            }                                
                            </div>
                            <h1 className="sub-header">
                                {articulo.titulo}
                                <Link to={'/inicio'} className="btn-azul right">Volver</Link>    
                            </h1>
                            <span className="date">
                                <Moment locale='es' fromNow>
                                    {articulo.fecha}
                                </Moment>
                            </span>
                            <p>{articulo.contenido}</p>

                            {/* Limpiar los float */}
                            <div className="clearfix"></div>
                        </article>
                    </div>

                    }

                    {/* Si el articulo no existe */}    
                    {!articulo && this.state.status === null &&
                    
                    <div id="articles">
                        <h2 className="sub-header">El articulo no existe.</h2>
                        <p>Intentalo mas tarde.</p>
                    </div>
                    
                    }

                </section>

                <Sidebar />

                {/* Limpiar los float */}
                <div className="clearfix"></div>
                
            </div>
        );
    }
}

export default Articulo;