import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
class Footer extends Component {

    render() {
        return(
            <footer className="footer w-100 mx-0 mt-auto">
            <div className="w-100 text-center bg-white">
              <div className="container pb-0 pt-3">
                Estas Interesado en registrar tu restaurante? <a className="text-black" href="http://admin.trobalo.me:8080/register"> Registrate</a>  y crealo!
              </div>

              <hr></hr>
            
              <div className="text-center p-1 mb-0">
                © 2022 Copyright: 
                <div><a className="text-black" href="https://www.trobalo.com/">trobalo.me</a><a href="https://www.trobalo.com/" className="text-decoration-none text-white"> </a></div>
              </div>
            </div>
          </footer>
        );
    }
}

export default Footer