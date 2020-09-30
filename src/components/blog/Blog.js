import React, {Component} from 'react';
// Componentes
import Slider from "../shared/slider/Slider";
import Sidebar from "../shared/sidebar/Sidebar";
import Articulos from "../articulos/Articulos";

class Blog extends Component{
    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//     
    render(){
        // Log de seguimiento
        console.log('BlogComponent - Metodo render()');

        return (
            <div id="blog">
                {/* Slider - Titulo */}
                <Slider title="Blog" size="slider-small" />
                <div className="center">
                    <div id="content">
                        {/* Listado de articulos - APIRest */}
                        <Articulos />   
                    </div>
                    <Sidebar blog="true" />
                </div>

            </div>
        );
    }
}

export default Blog;