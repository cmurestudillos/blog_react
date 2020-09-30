import React, {Component} from 'react';

// Rutas
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';

// Componentes compartidos
import Header from "../components/shared/Header";
import Footer from "../components/shared/footer/Footer";
import Error from '../components/shared/error/Error';

// Componente de pruebas/maquetacion, comentar despues de formado el BackEnd
import Home from '../components/inicio/Home';
import Blog from '../components/Blog';
import Formulario from '../components/Formulario';
import Buscador from '../components/Buscador';
import Articulo from '../components/Articulo';
import CrearArticulo from '../components/crearArticulo';
import EditarArticulo from '../components/editarArticulo';

class Router extends Component{
    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//
    render(){

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
                    <Route exact path="/formulario" component={Formulario} />
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