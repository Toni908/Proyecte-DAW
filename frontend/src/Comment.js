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

        /*var data = {
            email: this.state.email,
            id: id
        }*/

        var ip = process.env.REACT_APP_API_URL;

        axios({
            method: 'get',
            url: ip + '/comentar?id=' + id + '&email=' + this.state.email
        })
        .then((response) => {
            console.log(response);
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
            
        }else{
            return <LoginHotmail login={this.login.bind(this)} log={this.log.bind(this)} />;
        }
    }
}

export default Comment;