import 'bootstrap/dist/css/bootstrap.min.css';
import React, {useEffect, useState} from 'react';
import "./HeaderRestaurant.css"
import { HashLink } from 'react-router-hash-link';
import { Nav } from 'react-bootstrap';
import HorarioRestaurant from "../components_interns/HorarioRestaurant";

function HeaderRestaurant(props) {
    const [isVisible, setIsVisible] = useState(true);
    const [height, setHeight] = useState(0)

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
        return () =>
            window.removeEventListener("scroll", listenToScroll);
    })

    const listenToScroll = () => {
        let heightToHideFrom = 1000;
        const winScroll = document.body.scrollTop ||
            document.documentElement.scrollTop;
        setHeight(winScroll);
        height.valueOf();
        if (winScroll > heightToHideFrom) {
            isVisible && setIsVisible(false);
        } else {
            setIsVisible(true);
        }
    };

    return(
            <Nav className="p-3 mb-3 border-bottom bg-white font-family-header-restaurant w-100 position-fixed top-0 z-index-10">
                <div className={"d-flex flex-row justify-content-center w-100"}>
                    <div className={"row main-width-restaurant ps-lg-0 m-0"}>
                        <ul className="nav col-lg-10 col-12 px-4">
                            <li><HashLink to="#photos" className="nav-link px-3 text-black">Fotos</HashLink></li>
                            <li><HashLink to="#menu" className="nav-link px-3 text-black">Carta</HashLink></li>
                            <li><HashLink to="#location" className="nav-link px-3 text-black">Ubicacion</HashLink></li>
                            <li><HashLink to="#comments" className="nav-link px-3 text-black">Valoraciones</HashLink></li>
                        </ul>
                        <div className={"col-lg-2 col-12"}>
                            {!isVisible &&
                            <div>
                                <HorarioRestaurant isSimple={true} onlyHeader={true} restaurant={props.restaurant}/>
                            </div>
                            }
                        </div>
                    </div>
                </div>
            </Nav>
        );
}

export default HeaderRestaurant