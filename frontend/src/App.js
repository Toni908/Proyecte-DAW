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
          
<footer class="footer w-100 mx-0 mt-5" style="position: static; bottom: 0px;">

        <footer class="w-100 text-center text-white bg-black">
            <div class="container p-4 pb-0">
                <section class="">
                    <form action="">

                        <div class="row d-flex justify-content-center">
                            <div class="col-auto">
                                <p class="pt-2">
                                    <strong>Apuntate para recibir nuestras noticias</strong>
                                </p>
                            </div>
                            <div class="col-md-5 col-12">
                                <div class="form-outline form-white mb-4">
                                    <input type="email" id="form5Example2" class="form-control" />
                                    <label class="form-label" for="form5Example2">Email address</label>
                                </div>
                            </div>
                            <div class="col-auto">
                                <button type="submit" class="btn btn-outline-light mb-4">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </form>
                </section>
            </div>
            
            <div class="text-center p-3" style="background-color: rgb(31,31,31)">
                © 2022 Copyright:
                <a class="text-white" href="https://www.trobalo.com/">trobalo.com</a>
            </div>
        </footer>
</footer>
        </div>
      </Router>
    );
  }
}

export default App;