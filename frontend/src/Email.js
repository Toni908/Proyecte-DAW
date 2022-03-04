import React, { Component } from 'react';
import $ from 'jquery';

class Email extends Component {

    sendEmail() {
        var data = {
            service_id: 'service_1oq8hpi',
            template_id: 'template_d3g3uye',
            user_id: '8MM4-J8FO99oHPBq9',
            template_params: {
                'reply_to': 'tlovesc908@gmail.com',
                'ruta': 'ruta'
            }
        };
         
        $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json'
        }).done(function() {
            alert('Your mail is sent!');
        }).fail(function(error) {
            alert('Oops... ' + JSON.stringify(error));
        });
      }

    render() {
    return(
        /*<div className='' >
            <form onSubmit={this.sendEmail} onLoad={this.onSubmit}>
                <input type="text" name="reply_to" value="tlovesc908@gmail.com"></input>
                <input type="text" name="ruta"></input>
                <input type="submit"></input>
            </form>
        </div>*/
        <div>
            <button onClick={this.sendEmail}>click</button>
        </div>
        );
    }

}

export default Email