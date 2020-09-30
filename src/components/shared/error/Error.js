import React, {Component} from 'react';

class Error extends Component{
    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//     
    render(){
        // Log de seguimiento
        console.log('ErrorComponent - Metodo render()');
        
        return(
            <React.Fragment>
                <h1 class="sub-header-error">Pagina no encontrada.</h1>
                <p>La pagina que buscas no existe, intentalo mas tarde.</p>
            </React.Fragment>
        );
    }
}

export default Error;