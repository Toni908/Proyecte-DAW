import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "./HeaderRestaurant.css"
import { HashLink } from 'react-router-hash-link';
import { Nav } from 'react-bootstrap';
import HorarioRestaurant from "../components_interns/HorarioRestaurant";

function HeaderRestaurant(props) {
    return(
            <Nav className="mb-3 border-bottom bg-white font-family-header-restaurant w-100 position-fixed top-0 z-index-10">
                <div className={"d-flex flex-row justify-content-center w-100"}>
                    <div className={"row main-width-restaurant ps-lg-0 m-0"}>
                        <ul className="nav col-lg-10 col-12 d-flex flex-row justify-content-center justify-content-lg-start px-4">
                            <li><HashLink to="#photos" className="nav-link p-3 header-select">Fotos</HashLink></li>
                            <li><HashLink to="#menu" className="nav-link p-3 header-select">Carta</HashLink></li>
                            <li><HashLink to="#location" className="nav-link p-3 header-select">Ubicacion</HashLink></li>
                            <li><HashLink to="#comments" className="nav-link p-3 header-select">Valoraciones</HashLink></li>
                        </ul>
                        <div className={"col-lg-2 col-12 py-2"}>
                            <HorarioRestaurant isSimple={true} onlyHeader={true} restaurant={props.restaurant}/>
                        </div>
                    </div>
                </div>
            </Nav>
        );
}

export default HeaderRestaurant