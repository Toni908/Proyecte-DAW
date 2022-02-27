import 'bootstrap/dist/css/bootstrap.min.css';
import React, {Component} from 'react';
import "./HeaderRestaurant.css"
import { HashLink } from 'react-router-hash-link';
import { Nav } from 'react-bootstrap';
import HorarioRestaurant from "../components_interns/HorarioRestaurant";

class HeaderRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            horario: false
        }

        this.handleLoad = this.handleLoad.bind(this);
    }

    handleLoad() {
        window.addEventListener("scroll", this.onScroll);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.onScroll);
        window.addEventListener('load', this.handleLoad);
    }

    componentWillUnmount() {
        window.removeEventListener('load', this.handleLoad)
        window.removeEventListener("scroll", this.onScroll);
    }

    onScroll = () => {
        // 600 -> IMAGEN Y HEADER
        // HEIGHT CARTA -> Segun quanta informacion haya a la carta
        if (window.scrollY>((600+this.props.heightCarta))) {
            this.setState({ horario: true });
        } else {
            this.setState({ horario: false });
        }
    }

    render() {
        const {restaurant} = this.props;
        const {horario} = this.state;

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
                            {horario && <HorarioRestaurant isSimple={true} onlyHeader={true} restaurant={restaurant}/>}
                        </div>
                    </div>
                </div>
            </Nav>
        );
    }
}

export default HeaderRestaurant