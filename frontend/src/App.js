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
        <div className="App">
          <Nav class="p-3 mb-3 border-bottom">
            <div class="container">
              <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none">
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li><Link to="/" class="nav-link px-2 text-black">Home</Link></li>
                  <li><Link to="/search" class="nav-link px-2 text-black">Buscador Avanzado</Link></li>
                  <li><Link to="/us" class="nav-link px-2 text-black">Sobre Nosotros</Link></li>
                </ul>

                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" method="GET" action="/search">
                  <input type="search" class="form-control" name="name" placeholder="Search Restaurant..." aria-label="Search"/>
                </form>

                <div class="text-end">
                  <Button className="button me-2">Acceder</Button>
                  <Button >Registrarse</Button>
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
          
          <footer class="footer w-100 mx-0 mt-5">
            <footer class="w-100 text-center bg-white">
              <div class="container pb-0 pt-3">
                Estas Interesado en registrar tu restaurante? <a class="text-black" href="http://admin.trobalo.me:8080/register"> Registrate</a>  y crealo!
              </div>

              <hr></hr>
            
              <div class="text-center p-1 mb-4">
                © 2022 Copyright: 
                <a class="text-black" href="https://www.trobalo.com/"><a href="https://www.trobalo.com/" className="text-decoration-none text-white"> </a>trobalo.me</a>
              </div>
            </footer>
          </footer>

        </div>
      </Router>
    );
  }
}

export default App;