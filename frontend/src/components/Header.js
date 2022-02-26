import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';

import { Link } from "react-router-dom";
import { FaGlobe } from 'react-icons/fa';

import { Button, Nav, Dropdown } from 'react-bootstrap';

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

                <Dropdown>
                  <Dropdown.Toggle className='bg-white border-0' id="dropdown-custom-components">
                    <FaGlobe size='28' className='me-3' color='#ADC5d9'/>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#">es</Dropdown.Item>
                    <Dropdown.Item href="#">ca</Dropdown.Item>
                    <Dropdown.Item href="#">en</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>

                <div className="text-end">
                
                  <a href={"http://admin." + process.env.REACT_APP_URL + ":8080/login"}>
                    <Button className="me-2 login">Acceder</Button>
                  </a>
                  <a href={"http://admin." + process.env.REACT_APP_URL + ":8080/register"}>
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