import React, {Component} from 'react';
// Rutas
import {Redirect} from 'react-router-dom';

// Configuracion BBDD - EndPoint
import firebase from "firebase/app";
import "firebase/app";
import "firebase/auth";

// Componentes
import Slider from '../shared/slider/Slider';

class Login extends Component{

    //----------------------------------------------------------------------//
    // Metodo para conectarse al panel de control                           //
    //----------------------------------------------------------------------//
    logIn = () => {
        // Log de seguimiento
        console.log("Login.js - Metodo logIn");

        firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then( () =>  {
                return (
                    <Redirect to={'/blog/crear'}  />
                );
            })
            .catch(function(error) {
                console.log(error.message)
            });
    };      

    render(){
        // Log de seguimiento
        console.log('LoginComponent - Metodo render()');     
           
        return (
            <div className="general">
                {/* Slider */}
                <Slider title="Login" size="slider-small" />
                <div className="center">
                    {/*Contenido */}
                    <section id="content">
                        <h2 className="sub-header">Acceso al Panel de Control</h2>
                        <form className="middle-form">
                            <div className="form-group">
                                <label htmlFor="email">Correo electronico</label>
                                <input type="text" id="email" placeholder="Correo electronico"/>
                            </div>

                            <div className="form-group">
                                <label htmlFor="password">Contraseña</label>
                                <input type="text" id="password"  placeholder="Introduce el Password" />
                            </div>

                            {/* Limpiar los float */}
                            <div className="clearfix"></div>
                            <input type="submit" value="Conectar" className="btn-azul" />
                        </form>
                    </section>
                </div>
            </div>                
        );
    }
}

export default Login;