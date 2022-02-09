import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

<<<<<<< HEAD
import { Button, Nav } from 'reactstrap';
=======
import { Button, Nav } from 'react-bootstrap';
>>>>>>> main

import Home from "./Home";
import BuscadorAvanzado from "./BuscadorAvanzado";

<<<<<<< HEAD
import logo from './img/trobalot.png'
=======
>>>>>>> main
import './App.css';

class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Nav className="p-3 bg-dark text-white">
            <div class="container">
              <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                <a href="/" class="d-xl-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none d-lg-none">
                  <img src="./img/trobalot.png" alt="logo trobalo"></img>
                </a>

                <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                  <li><Link to="/" class="nav-link px-2 text-white">Home</Link></li>
                  <li><Link to="/search" class="nav-link px-2 text-white">Buscador Avanzado</Link></li>
                  <li><Link to="#" class="nav-link px-2 text-white">Pricing</Link></li>
                  <li><Link to="#" class="nav-link px-2 text-white">FAQs</Link></li>
                  <li><Link to="#" class="nav-link px-2 text-white">Sobre Nosotros</Link></li>
                </ul>

                <div class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                  <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search"/>
                </div>

                <div class="text-end">
                  <Button color='light' outline className="me-2">Acceder</Button>
                  <Button color="warning">Registrarse</Button>
                </div>
              </div>
            </div>
          </Nav>
                
          <div className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<BuscadorAvanzado />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;