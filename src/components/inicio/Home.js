import React, {Component} from 'react';

// Componentes
import Slider from "./shared/Slider";
import Sidebar from "./shared/Sidebar";
import Articulos from '../components/Articulos';

class Home extends Component{
    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//     
    render(){

        return (
            <div id="home">
                {/* Slider - Titulo */}
                <Slider title="Bienvenidos a React.js" btn="Ir al Blog" size="slider-big" />
                <div className="center">
                    <div id="content">
                        <h1 className="sub-header"> Ultimos Articulos </h1>
                        <Articulos home="true" />
                    </div>
                    <Sidebar />
                </div>
            </div>
        );
    }
}

export default Home;