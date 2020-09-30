import React, {Component} from 'react';

class Footer extends Component{
    //----------------------------------------------------------------------//
    // Metodo render()                                                      //
    //----------------------------------------------------------------------//     
    render(){
        // Log de seguimiento
        console.log('FooterComponent - Metodo render()');

        return (
        <footer id="footer">
            <div className="left">
                <p>Copyright &copy; - Carlos Mur</p>
            </div>
            <div className="right">
                <p> Año - 2020</p>
            </div>
        </footer>
        );
    }
}

export default Footer;