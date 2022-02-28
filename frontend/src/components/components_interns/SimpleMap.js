import {Component} from "react";
import GoogleMapReact from 'google-map-react';
import marker from "../../img/output-onlinepngtools.png";

class SimpleMap extends Component {
    constructor() {
        super();

        this.state = {
            height: '250px',
            width: '250px'
        }
    }

    render() {
        const {height, width} = this.props;
        const center = {
            lat: this.props.lat,
            lng: this.props.lng
        }

        const Marker = props => {
            return (<img className={"marker-map"} src={marker} alt={"Restaurant"}/>)
        }

        return (
            <div className={this.props.class} style={{ height: height, width: width }}>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyBCKiIqCdZGrVxx06LSbe7uG3zXOq1Cz5k" }}
                    defaultCenter={center}
                    defaultZoom={this.props.zoom}
                >
                    <Marker lat={this.props.lat} lng={this.props.lng} />
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap