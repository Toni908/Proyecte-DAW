import {Component} from "react";

class SimpleMap extends Component {
    render() {
        return (
            // Important! Always set the container height explicitly
            <div style={{ height: '200px', width: '200px' }}>
                <div id={"map"}/>
            </div>
        );
    }
}

export default SimpleMap