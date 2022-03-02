import React, { Component } from 'react';
import emailjs from '@emailjs/browser';

class Email extends Component {

    sendEmail(e) {
        e.preventDefault();
    
        emailjs.sendForm('service_1oq8hpi', 'template_d3g3uye', e.target, '8MM4-J8FO99oHPBq9')
          .then((result) => {
              console.log(result.text);
          }, (error) => {
              console.log(error.text);
          });
      }

    render() {
    return(
        <div className='' >
            <form onSubmit={this.sendEmail}>
                Email:
                <input type="text" name="reply_to"></input>
                Mensaje:
                <input type="text" name="ruta"></input>
                <input type="submit"></input>
            </form>
        </div>
        );
    }

}

export default Email