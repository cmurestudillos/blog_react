import React, {Component} from 'react';
// Logo
import logo from '../../../assets/img/logo_react.svg';
// Menu de Navegacion
import {NavLink} from 'react-router-dom';

class Header extends Component{
    render(){
        // Log de seguimiento
        console.log('HeaderComponent - Metodo render()');     
           
        return (
            <header id="header">
                <div className="center">
                    {/* Logo */}
                    <div id="logo">
                        <img src={logo} className="logo" alt="logotipo" />
                        <span id="brand">
                            <strong>React.js </strong>
                        </span>
                    </div>
                    {/* Menu */}
                    <nav id="menu">
                        <ul>
                            <li><NavLink to="/inicio" activeClassName="active">Inicio</NavLink></li>
                            <li><NavLink to="/blog" activeClassName="active">Blog</NavLink></li>
                            <li><NavLink to="/login" activeClassName="active">Login</NavLink></li>
                        </ul>
                    </nav>
                    {/* Limpiar Floats */}
                    <div className="clearfix"></div>
                </div>
            </header>
        );
    }
}

export default Header;