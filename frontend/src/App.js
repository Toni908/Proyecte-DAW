import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { Button, Nav } from 'react-bootstrap';

import Home from "./Home";
import BuscadorAvanzado from "./BuscadorAvanzado";

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
                  <li><Link to="#" class="nav-link px-2 text-black">Pricing</Link></li>
                  <li><Link to="#" class="nav-link px-2 text-black">FAQs</Link></li>
                  <li><Link to="#" class="nav-link px-2 text-black">Sobre Nosotros</Link></li>
                </ul>

                <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                  <input type="search" class="form-control" placeholder="Search..." aria-label="Search"/>
                </form>

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