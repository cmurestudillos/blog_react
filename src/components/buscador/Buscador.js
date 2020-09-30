import React, {Component} from 'react';
// Componentes
import Slider from "../shared/slider/Slider";
import Sidebar from "../shared/sidebar/Sidebar";
import Articulos from "../articulos/Articulos";

class Buscador extends Component{
    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//    
    render(){
        // Log de seguimiento
        console.log('BuscadorComponent - Metodo render()');

        var stringBuscado = this.props.match.params.buscar;
        return (
            <div id="blog">
                {/* Slider - Titulo */}
                <Slider title={'Busqueda: ' + stringBuscado} size="slider-small" />
                <div className="center">
                    <div id="content">
                        {/* Listado de articulos - APIRest */}
                        <Articulos buscar={stringBuscado} />   
                    </div>
                    <Sidebar blog="true" />
                </div>

            </div>
        );
    }
}

export default Buscador;