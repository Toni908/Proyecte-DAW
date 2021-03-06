import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Translate from "./locales/Translate";

import "./Login.css";
class LoginHotmail extends Component {

    constructor() {

        super();

        this.state={
            inputValue: null
        }   

    }

    

    log(){

    }

    
    render() {
        return(
                <section className="vh-auto m-auto">
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

                                                    <h5 className="fw-normal mb-3 pb-3 letter-space"> <Translate string={'descLogin'}/></h5>

                                                    <div className="form-outline mb-4">
                                                        <input type="email" id="form2Example17" name="correo" className="form-control form-control-lg" onChange={this.props.log}/>
                                                        <label className="form-label" htmlFor="form2Example17"><Translate string={'correo'}/></label>
                                                    </div>

                                                    <div className="pt-1 mb-4">
                                                        <button className="btn btn-dark btn-lg btn-block" type="button" onClick={this.props.login} ><Translate string={'entrar'}/></button>
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
        )
    }
}

export default LoginHotmail;