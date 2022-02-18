import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

import { Link } from "react-router-dom";

import { Button, Nav } from 'react-bootstrap';

class Header extends Component {

    render() {
        return(
            <Nav className="p-3 mb-3 border-bottom">
            <div className="container">
              <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                </a>

                <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <li><Link to="/" className="nav-link px-3 text-black">Home</Link></li>
                  <li><Link to="/search" className="nav-link px-3 text-black">Buscador</Link></li>
                  <li><Link to="/us" className="nav-link px-3 text-black">Sobre Nosotros</Link></li>
                </ul>

                <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" method="GET" action="/search">
                  <input type="search" className="form-control" name="name" placeholder="Search Restaurant..." aria-label="Search"/>
                </form>

                <div className="text-end">
                  <a href="http://admin.trobalo.me:8080/login">
                    <Button className="me-2 login">Acceder</Button>
                  </a>
                  <a href="http://admin.trobalo.me:8080/register">
                    <Button className="login">Registrarse</Button>
                  </a>
                </div>
              </div>
            </div>
          </Nav>
        );
    }
}

export default Header