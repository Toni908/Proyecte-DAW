import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Button, Nav } from 'react-bootstrap';

import Home from "./Home";
import BuscadorAvanzado from "./BuscadorAvanzado";
import AboutUs from "./AboutUs";

import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="d-flex flex-column min-vh-100 App">
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
          
          
                
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<BuscadorAvanzado />} />
              <Route path="/us" element={<AboutUs />} />
            </Routes>
          </div>
          
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

        </div>
      </Router>
    );
  }
}

export default App;