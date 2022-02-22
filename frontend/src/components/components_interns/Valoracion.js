import {Component} from "react";
import { FaStar } from 'react-icons/fa';

class Valoracion extends Component {

    constructor() {

        super();

        this.state={
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            puntuacion: 0
        }   

    }

    starClick(num){
        for(let x = 1 ; x <= 5 ; x++){
            if(x <= num){
                if(x === 1){
                    this.setState({s1: true});
                }else if(x === 2){
                    this.setState({s2: true});
                }else if(x === 3){
                    this.setState({s3: true});                   
                }else if(x === 4){
                    this.setState({s4: true});
                }else if(x === 5){
                    this.setState({s5: true});
                }
            }else{
                if(x === 2){
                    this.setState({s2: false});
                }else if(x === 3){
                    this.setState({s3: false});                   
                }else if(x === 4){
                    this.setState({s4: false});
                }else if(x === 5){
                    this.setState({s5: false});
                }
            }
        }
        this.setState({puntuacion: num});
    }

    render(props) {
        return (
            <div className="form-outline mb-4">
                <FaStar onClick={() => this.starClick(1)} color={this.state.s1 === true ? 'orange' : 'black'} size='30'/>
                <FaStar onClick={() => this.starClick(2)} color={this.state.s2 === true ? 'orange' : 'black'} size='30'/>
                <FaStar onClick={() => this.starClick(3)} color={this.state.s3 === true ? 'orange' : 'black'} size='30'/>
                <FaStar onClick={() => this.starClick(4)} color={this.state.s4 === true ? 'orange' : 'black'} size='30'/>
                <FaStar onClick={() => this.starClick(5)} color={this.state.s5 === true ? 'orange' : 'black'} size='30'/>
            </div>
        );
    }
}

export default Valoracion