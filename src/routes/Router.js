import React, {Component} from 'react';
// Rutas
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
// Componentes compartidos
import Header from "../components/shared/header/Header";
import Footer from "../components/shared/footer/Footer";
import Error from '../components/shared/error/Error';
// Componente de pruebas/maquetacion, comentar despues de formado el BackEnd
import Home from '../components/inicio/Home';
import Blog from '../components/blog/Blog';
import Buscador from '../components/buscador/Buscador';
import Articulo from '../components/articulo/Articulo';
import CrearArticulo from '../components/acciones/crear/crearArticulo';
import EditarArticulo from '../components/acciones/editar/editarArticulo';

class Router extends Component{
    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//
    render(){

        // Log de seguimiento
        console.log('RouterComponent - Metodo render()');

        return(
            <BrowserRouter>
                {/* Cabecera */}
                <Header />  

                {/* Configuracion de rutas y paginas */}
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route exact path="/inicio" component={Home} />
                    <Route exact path="/blog" component={Blog} />
                    <Route exact path="/blog/articulo/:id" component={Articulo} />
                    <Route exact path="/blog/crear" component={CrearArticulo} />
                    <Route exact path="/blog/editar/:id" component={EditarArticulo} />
                    <Route exact path="/blog/busqueda/:buscar" component={Buscador} />
                    <Route exact path="/redirect/:buscar" render={
                        (props) => {
                            var buscar = props.match.params.buscar;
                            return (
                                <Redirect to={'/blog/busqueda/' + buscar} />
                            );
                        }
                    } />
                    <Route component={Error} />
                </Switch>

                {/* Limpiar los float */}
                <div className="clearfix"></div>
                {/* Footer */}
                <Footer />

            </BrowserRouter>
        );
    }
}

export default Router;