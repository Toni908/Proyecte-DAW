import React, { Component } from 'react';
import axios from "axios";

import CommentMaker from "./CommentMaker";
import LoginHotmail from "./LoginHotmail";

class Comment extends Component {

    constructor() {

        super();

        this.state={
            login: false,
            commented: false,
            email: null
        }   

        this.login = this.login.bind(this);
        this.log = this.log.bind(this);

    }

    componentDidMount(){
        var url = window.location.href;
        var l = url.split('/');
        var d = l.length-1;
        var id = l[d];

        var ip = process.env.REACT_APP_API_URL;

        axios({
            method: 'get',
            url: ip + '/comprobar?id=' + id
        })
        .then((response) => {
            console.log(response.data[0].coment);
            if(response.data[0].coment >= 1){
                this.setState({commented: true});
            }
        })
        .catch((error) => {
            console.log(error); 
        });
    }

    log(evt) {
        const val = evt.target.value;
        this.setState({
          email: val
        });
    }

    login(e){
        var url = window.location.href;
        var l = url.split('/');
        var d = l.length-1;
        var id = l[d];

        var ip = process.env.REACT_APP_API_URL;

        axios({
            method: 'get',
            url: ip + '/comentar?id=' + id + '&email=' + this.state.email
        })
        .then((response) => {
            if(response.data === 1){
                this.setState({login: true});
            }else{
                alert("Este correo no esta relacionado con esta reserva. Introduzca el correo correcto.");
            }
        })
        .catch((error) => {
            console.log(error); 
        });
    }
    
    render() {
        const isLoggedIn = this.state.login;
        const isCommented = this.state.commented;
        if (isLoggedIn) {
            return <CommentMaker />;
        }else if(isCommented){
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
                                                            <span className="h1 fw-bold mb-0">No puedes comentar</span>
                                                        </div>
    
                                                        <h5 className="fw-normal mb-3 pb-3 letter-space">Esta reserva ya a publicado un comentario! Por favor, asegurese de que esta es la reserva que queria comentar!</h5>
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
        }else{
            return <LoginHotmail login={this.login.bind(this)} log={this.log.bind(this)} />;
        }
    }
}

export default Comment;