import React, {Component} from 'react';
// Rutas
import {Redirect, Link} from 'react-router-dom';

class Sidebar extends Component{

    // Variables
    buscarRef = React.createRef();
    state = {
        buscar: "",
        redirect: false
    };

    //----------------------------------------------------------------------//
    // Metodo redirectBusqueda muestra pagina de resultados de busqueda     //
    //----------------------------------------------------------------------//
    redirectBusqueda = (e) => {
        // Log de seguimiento
        console.log("Sidebar.js - Metodo redirectBusqueda");

        // Cuando se lance la busqueda, no se actualiza la pagina, bloquea la recarga 
        e.preventDefault();

        this.setState({
            buscar: this.buscarRef.current.value,
            redirect: true
        });

    }; 

    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//    
    render(){
        // Log de seguimiento
        console.log('SidebarComponent - Metodo render()');

        if(this.state.redirect){
            return (
                <Redirect to={'/redirect/' + this.state.buscar} />
            );
        }

        return (
        <aside id="sidebar">
            {/* Condicional */}
            {this.props.blog === 'true' &&

                <div id="nav-blog" className="sidebar-item">
                    <h3>Puedes hacer esto</h3>
                    <Link to={'/blog/crear'} className="btn btn-success">Crear Articulo</Link>
                </div>
            }

            <div id="search-blog" className="sidebar-item">
                <h3>Buscador</h3>
                <p>Encuentra el articulo que buscas</p>
                <form onSubmit={this.redirectBusqueda}>
                    <input type="text" nombre="search" ref={this.buscarRef} />
                    <input className="btn btn-success" type="submit" nombre="enviar" value="Buscar" />
                </form>
            </div>
        </aside>
        );
    }
}

export default Sidebar;