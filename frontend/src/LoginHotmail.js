import React, { Component } from 'react';

import "./Login.css";
class LoginHotmail extends Component {

    constructor() {

        super();

        this.state={
            
        }   

    }

    
    render() {
        return(
            
            <body class="background-color-general">
                <section class="vh-auto background-color-general">
                    <div class="container py-5 h-auto">
                        <div class="row d-flex justify-content-center align-items-center h-100">
                            <div class="col col-xl-10">
                                <div class="card border-radius">
                                    <div class="row g-0 m-auto w-100">
                                        <div class="col-md-6 col-lg-7 d-flex align-items-center w-100">
                                            <div class="card-body p-4 p-lg-5 text-black w-100">
                                                <form class="w-100" method="post" action="/register">
                                                    <div class="d-flex align-items-center mb-3 pb-1">
                                                        <span class="h1 fw-bold mb-0">Trobalo</span>
                                                    </div>

                                                    <h5 class="fw-normal mb-3 pb-3 letter-space"> Introduce el correo con el que realizaste tu reserva para poder hacer una reseña:</h5>

                                                    <div class="form-outline mb-4">
                                                        <input type="email" id="form2Example17" name="correo" class="form-control form-control-lg" />
                                                        <label class="form-label" for="form2Example17">Correo</label>
                                                    </div>

                                                    <div class="pt-1 mb-4">
                                                        <input class="btn btn-dark btn-lg btn-block" type="submit" text="Entrar"/>
                                                    </div>
                                                </form>
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