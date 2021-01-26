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
// Modelo
import ArticuloModel from '../../models/ArticuloModel';
// Imagenes
import noimagen from '../../assets//img/noimage.png'; 

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

        var esBlog = true;

        axios.get(this.url + "/articulos.json")
        .then(res => {
            this.setState({
                articulos: this.ordenarArray(res.data, esBlog),
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

        var esBlog = false;

        axios.get(this.url + "/articulos.json")
        .then(res => {
            this.setState({
                articulos: this.ordenarArray(res.data, esBlog),
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

        axios.get(this.url + "/articulos.json")
        .then(res => {
                this.setState({
                    articulos: this.buscarArray(res.data, stringBuscado),
                    status: 'success'
                });
        });
    }; 

    //----------------------------------------------------------------------//
    // Metodo para mostrar los articulos recuperados de la BBDD             //
    //----------------------------------------------------------------------//
    ordenarArray(articulosArray, esBlog){

        var articulosData = [];
        if(articulosArray === null){
            return [];
        }

        Object.keys(articulosArray).reverse().forEach( key => {
            var articulo = ArticuloModel; 
            articulo = articulosArray[key];
            
            if(esBlog){
                articulo = articulosArray[key];
                articulo.id = key;
                // Devolvemos en el Array el objeto extraido
                articulosData.push(articulo);
            }else{
                if(articulosData.length <= 4){
                    articulo.id = key;
                    // Devolvemos en el Array el objeto extraido
                    articulosData.push(articulo);
                }
            }
        });

        return articulosData;
    } 

    //----------------------------------------------------------------------//
    // Metodo para mostrar articulo/s buscados                              //
    //----------------------------------------------------------------------//
    buscarArray(articulosArray, stringBuscado){

        var articulosData = [];
        if(articulosArray === null){
            return [];
        }

        Object.keys(articulosArray).forEach( key => {
            var articulo = ArticuloModel;
            articulo = articulosArray[key];
            var titulo = articulo.titulo.toLowerCase();
            var stringTexto = stringBuscado.toLowerCase();
            if(titulo.includes(stringTexto)){
                articulo.id = key;
                // Devolvemos en el Array el objeto extraido
                articulosData.push(articulo);
            }
        });
        
        return articulosData;
    }

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
                    <article key={articulo.id} className="article-item" id="article-template">
                        <div className="image-wrap">
                            {
                                articulo.imagen !== null ? (
                                   <img src={articulo.imagen} alt={articulo.titulo} />
                                ):(
                                    <img src={noimagen} alt={articulo.titulo} title={articulo.titulo} />
                                )
                            }
                            
                        </div>
                        <h2>{articulo.titulo}</h2>
                        <span className="date">
                            <Moment locale='es' fromNow>
                                {articulo.fecha}
                            </Moment>
                            </span>
                        <Link to={'/blog/articulo/' + articulo.id} >Leer mas ...</Link>
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
                    <p>No hay contenido en la sección.</p>
               </div>
            );
        }else{
            return(
                <div id="articles">
                    <p>No hay contenido en la sección.</p>
               </div>
            );            
        }
    }
}

export default Articulos;