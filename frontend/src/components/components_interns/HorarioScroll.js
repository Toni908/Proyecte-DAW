import {Component} from "react";
import HorarioRestaurant from "./HorarioRestaurant";

class HorarioScroll extends Component {

    constructor(props) {
        super(props);
        this.state = {
            header: false,
            hideTop: true,
            hideResize: true
        }

        this.handleHorario = this.handleHorario.bind(this);
    }


    componentDidMount() {
        window.addEventListener("scroll", this.handleHorario);
        window.addEventListener('resize', this.handleHorario);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleHorario);
        window.removeEventListener('resize', this.handleHorario);
    }

    handleHorario = () => {
        // HEIGHT DEL MENU DONDE TIENE QUE PARAR DE VERSE EL HORARIO
        let MenuHeight = document.getElementById('menu').offsetHeight;
        let InfoHeight = document.getElementById('info').offsetHeight;
        let startHeight = document.getElementById('start').offsetHeight;
        let galleryHeight = document.getElementById('photos').offsetHeight;

        let menu = MenuHeight-InfoHeight;

        // HORARIO TOP
        if (window.scrollY<(menu+galleryHeight+startHeight)) {

            if (window.innerWidth<1500) {

                if (window.scrollY>600) {
                    this.setState({hideTop: false, header: true, hideResize: false});
                } else {
                    this.setState({hideTop: false, header: false, hideResize: false});
                }

            } else {

                if (window.scrollY>600) {
                    this.setState({hideTop: true, header: true, hideResize: true});
                } else {
                    this.setState({hideTop: true, header: false, hideResize: true});
                }

            }

        } else {
            if (window.innerWidth < 1500) {
                this.setState({hideTop: true, header: true, hideResize: false});
            } else {
                this.setState({hideTop: false, header: true, hideResize: true});
            }
        }
    };

    render() {
        const {header,hideTop,hideResize} = this.state;
        const {restaurant} = this.props;

        if (hideResize) {
            return(
                <div className={header ? "col-lg-4 col-12 px-lg-0 px-3 position-relative" : "col-lg-4 col-12 px-lg-0 px-3 w-30"}>
                    <div className={hideTop ? "z-index-10" : "postion-restaurant-bottom"}>
                        <div className={hideTop && header ? "postion-horario-restaurant":""}>
                            <HorarioRestaurant isSimple={true} onlyHeader={false} restaurant={restaurant}/>
                        </div>
                    </div>
                </div>
            )
        } else {
            return(<div hidden>No Horario</div>)
        }

    }
}

export default HorarioScroll