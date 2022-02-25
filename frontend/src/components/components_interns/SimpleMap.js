import {Component} from "react";
import GoogleMapReact from 'google-map-react';

class SimpleMap extends Component {
    constructor() {
        super();

        this.state = {
            center: {
                lat: 59.955413,
                lng: 30.337844
            },
            zoom: 11,
            height: '250px',
            width: '250px'
        }
    }

    render() {
        const {center,zoom, height, width} = this.state;

        return (
            // Important! Always set the container height explicitly
            <div style={{ height: height, width: width }}>
                <GoogleMapReact
                    // bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
                    defaultCenter={center}
                    defaultZoom={zoom}
                >
                </GoogleMapReact>
            </div>
        );
    }
}

export default SimpleMap