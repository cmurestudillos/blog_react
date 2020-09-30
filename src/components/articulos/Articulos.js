import React, {Component} from 'react';
// Enlaces
import {Link} from 'react-router-dom';
// Peticiones HTTP
import axios from 'axios';
// Libreria para fecha
import Moment from 'react-moment';
import 'moment/locale/es';
// Carga la configuracion y URL BackEnd
import Global from '../../api/Global';
// Imagenes
import NoImage from '../../assets/img/noimage.png';

class Articulos extends Component{

    // Variables
    url = Global.url;
    state = {
        articulos: [],
        status: null
    }

    //----------------------------------------------------------------------//
    // Antes de renderizar, cargar el metodo                                //
    //----------------------------------------------------------------------//
    componentDidMount (){  
        // Log de seguimiento
        console.log("Articulos.js - Metodo componentWillMount");  

        var home = this.props.home;
        var buscar = this.props.buscar;
        if(home === 'true'){
            this.getUltimosArticulos();
        }else if(buscar && buscar !== null && buscar !== undefined){
            this.getBuscarArticulos(buscar);
        }
        else{
            this.getArticulos();
        }
    }

    //----------------------------------------------------------------------//
    // Metodo getArticulos para obtener todos los articulos                 //
    //----------------------------------------------------------------------//
    getArticulos = () => {
        // Log de seguimiento
        console.log("Articulos.js - Metodo getArticulos");

        axios.get(this.url + "articulos")
        .then(res => {
            this.setState({
                articulos: res.data.articulos,
                status: 'success'
            });
        });
    };  

    //----------------------------------------------------------------------//
    // Metodo getUltimosArticulos para obtener ultimos articulos escritos   //
    //----------------------------------------------------------------------//
    getUltimosArticulos = () => {
        // Log de seguimiento
        console.log("Articulos.js - Metodo getUltimosArticulos");

        axios.get(this.url + "articulos/last")
        .then(res => {
            this.setState({
                articulos: res.data.articulos,
                status: 'success'
            });
        });
    };  

    //----------------------------------------------------------------------//
    // Metodo getBuscarArticulos para obtener articulos                     //
    //----------------------------------------------------------------------//
    getBuscarArticulos = (stringBuscado) => {
        // Log de seguimiento
        console.log("Articulos.js - Metodo getBuscarArticulos");

        axios.get(this.url + "search/" + stringBuscado)
        .then(res => {
                this.setState({
                    articulos: res.data.articulos,
                    status: 'success'
                });
        });
    }; 

    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//
    render(){
        // Log de seguimiento
        console.log('ArticulosComponent - Metodo render()');

        // Comprobacion de si hay articulos en el state
        if(this.state.articulos.length >= 1){

            var listarArticulos = this.state.articulos.map( (articulo) => {
                return(
                    <article key={articulo._id} className="article-item" id="article-template">
                        <div className="image-wrap">
                            {
                                articulo.imagen !== null ? (
                                   <img src={this.url + 'get-imagen/' + articulo.imagen} alt={articulo.titulo} />
                                ):(
                                    <img src={NoImage} alt="sin imagen" title="sin imagen" />
                                )
                            }
                            
                        </div>
                        <h2>{articulo.titulo}</h2>
                        <span className="date">
                            <Moment locale='es' fromNow>
                                {articulo.fecha}
                            </Moment>
                            </span>
                        <Link to={'/blog/articulo/' + articulo._id} >Leer mas ...</Link>
                        {/* Limpiar los float */}
                        <div className="clearfix"></div>
                    </article>
                );
            });

            return(
                <div id="articles">
                    {listarArticulos}
               </div>
            );
        }else if(this.state.articulos.length === 0 && this.state.status === null){
            return(
                <div id="articles">
                    <h2 className="sub-header">No hay articulos a mostrar.</h2>
                    <p>No hay contenido en la sección.</p>
               </div>
            );
        }else{
            return(
                <div id="articles">
                    <h2 className="sub-header">Cargando ...</h2>
                    <p>Espere mientras se carga el contenido.</p>
               </div>
            );            
        }
    }
}

export default Articulos;