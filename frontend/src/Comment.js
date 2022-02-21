import React, { Component } from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

import CommentMaker from "./CommentMaker";
import LoginHotmail from "./LoginHotmail";

class Comment extends Component {

    constructor() {

        super();

        this.state={
            login: false
        }   

        this.login = this.login.bind(this);

    }

    login(){
        var data = {
            email: "tgamil",
            id: useParams()
        }

        var ip = process.env.REACT_APP_API_URL;

        axios({
            method: 'get',
            url: ip + '/comentar',
            data: data
        })
        .then((response) => {
            console.log(response);
            if(response){
                this.setState({login: true});
            }else{
                alert("Este correo no esta relacionado con esta reserva. Intentalo otra vez.");
            }
        })
        .catch((error) => {
            console.log(error); 
        });
    }
    
    render() {
        const isLoggedIn = this.state.login;
        if (isLoggedIn) {
            return <CommentMaker />;
        }
            return <LoginHotmail login={this.login.bind()} />;
        }
}

export default Comment;