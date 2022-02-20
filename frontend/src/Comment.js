import React, { Component } from 'react';

import CommentMaker from "./CommentMaker";
import LoginHotmail from "./LoginHotmail";
import './components/components_interns/Comment.css';

class Comment extends Component {

    constructor() {

        super();

        this.state={
            login: false
        }   

        this.login = this.login.bind(this);

    }

    componentDidMount(){
        
    }

    login(){
        this.setState({login: true});
    }
    
    render() {
        const isLoggedIn = this.state.login;
        if (isLoggedIn) {
            return <CommentMaker />;
        }
            return <LoginHotmail login={this.login.bind(this)} />;
        }
}

export default Comment;