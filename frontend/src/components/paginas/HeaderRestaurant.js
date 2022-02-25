import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import "./HeaderRestaurant.css"
import { HashLink } from 'react-router-hash-link';
import { Nav } from 'react-bootstrap';

class HeaderRestaurant extends Component {
    render() {
        return(
            <Nav className="p-3 mb-3 border-bottom bg-white font-family-header-restaurant w-100 position-fixed top-0 z-index-10">
                <div className={"d-flex flex-row justify-content-center w-100"}>
                    <div className={"d-flex flex-column main-width-restaurant ps-lg-0 m-0"}>
                        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 mb-md-0 main-width-restaurant">
                            <li><HashLink to="#photos" className="nav-link px-3 text-black">Fotos</HashLink></li>
                            <li><HashLink to="#menu" className="nav-link px-3 text-black">Carta</HashLink></li>
                            <li><HashLink to="#comments" className="nav-link px-3 text-black">Valoraciones</HashLink></li>
                            <li><HashLink to="#location" className="nav-link px-3 text-black">Ubicacion</HashLink></li>
                        </ul>
                    </div>
                </div>
            </Nav>
        );
    }
}

export default HeaderRestaurant