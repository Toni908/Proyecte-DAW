import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import "./Login.css";
class LoginHotmail extends Component {

    constructor() {

        super();

        this.state={
            
        }   

    }

    
    render() {
        return(
            
            <body className="background-color-general bg-white">
                <section className="vh-auto m-auto background-color-general">
                    <div className="container py-5 h-auto">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <div className="card border-radius">
                                    <div className="row g-0 m-auto w-100">
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center w-100">
                                            <div className="card-body p-4 p-lg-5 text-black w-100">
                                                <div className="w-100">
                                                    <div className="d-flex align-items-center mb-3 pb-1">
                                                        <span className="h1 fw-bold mb-0">Trobalo</span>
                                                    </div>

                                                    <h5 className="fw-normal mb-3 pb-3 letter-space"> Introduce el correo con el que realizaste tu reserva para poder hacer una reseña:</h5>

                                                    <div className="form-outline mb-4">
                                                        <input type="email" id="form2Example17" name="correo" className="form-control form-control-lg" />
                                                        <label className="form-label" for="form2Example17">Correo</label>
                                                    </div>

                                                    <div className="pt-1 mb-4">
                                                        <button className="btn btn-dark btn-lg btn-block" type="button" onClick={this.props.login} >Entrar</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </body>
        )
    }
}

export default LoginHotmail;