import React, { Component } from 'react';
import { FaStar } from 'react-icons/fa';
import axios from "axios";

// import Valoracion from './components/components_interns/Valoracion';
import './CommentMaker.css';
class CommentMaker extends Component {

    constructor() {

        super();

        this.state={
            comentario: "",
            puntuacioComida: 0,
            puntuacioServicio: 0,
            puntuacioSitio: 0,
            c1: false,
            c2: false,
            c3: false,
            c4: false,
            c5: false,
            s1: false,
            s2: false,
            s3: false,
            s4: false,
            s5: false,
            si1: false,
            si2: false,
            si3: false,
            si4: false,
            si5: false,
        }   

        this.comment = this.comment.bind(this);

    }

    componentDidMount(){
        
    }

    puntuacion(e, num){
        console.log(e);
    }

    starClickC(num){
        for(let x = 1 ; x <= 5 ; x++){
            if(x <= num){
                if(x === 1){
                    this.setState({c1: true});
                }else if(x === 2){
                    this.setState({c2: true});
                }else if(x === 3){
                    this.setState({c3: true});                   
                }else if(x === 4){
                    this.setState({c4: true});
                }else if(x === 5){
                    this.setState({c5: true});
                }
            }else{
                if(x === 2){
                    this.setState({c2: false});
                }else if(x === 3){
                    this.setState({c3: false});                   
                }else if(x === 4){
                    this.setState({c4: false});
                }else if(x === 5){
                    this.setState({c5: false});
                }
            }
        }
        this.setState({puntuacioComida: num});
    }

    starClickS(num){
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
        this.setState({puntuacioServicio: num});
    }

    starClickSi(num){
        for(let x = 1 ; x <= 5 ; x++){
            if(x <= num){
                if(x === 1){
                    this.setState({si1: true});
                }else if(x === 2){
                    this.setState({si2: true});
                }else if(x === 3){
                    this.setState({si3: true});                   
                }else if(x === 4){
                    this.setState({si4: true});
                }else if(x === 5){
                    this.setState({si5: true});
                }
            }else{
                if(x === 2){
                    this.setState({si2: false});
                }else if(x === 3){
                    this.setState({si3: false});                   
                }else if(x === 4){
                    this.setState({si4: false});
                }else if(x === 5){
                    this.setState({si5: false});
                }
            }
        }
        this.setState({puntuacioSitio: num});
    }

    enviar(){
        axios.create('/createcomment', {
            comentario: this.state.comentario,
            puntuacioComida: this.state.puntuacioComida,
            puntuacioServicio: this.state.puntuacioServicio,
            puntuacioSitio: this.state.puntuacioSitio
        }).then((result) => {
            
        }).catch((err) => {
            
        });
    }

    comment(etc){
        const val = etc.target.value;
        this.setState({
          comentario: val
        });
    }

    render() {

        return(
            <section className="vh-auto m-auto">
                    <div className="container py-5 h-auto">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col col-xl-10">
                                <div className="card border-radius">
                                    <div className="row g-0 m-auto w-100">
                                        <div className="col-md-6 col-lg-7 d-flex align-items-center w-100">
                                            <div className="card-body p-4 p-lg-5 text-black w-100">
                                                <div className="w-100">
                                                    <div className="d-flex align-items-center mb-3 pb-1">
                                                        <span className="h1 fw-bold mb-0">Trobalo</span>
                                                    </div>

                                                    <h5 className="fw-normal mb-3 pb-3 letter-space"> Que es lo que opinas del restaurante?</h5>

                                                    <div className="form-outline mb-4">
                                                        <textarea name="correo" className="form-control form-control-lg" onChange={this.comment}/>
                                                        <label className="form-label" htmlFor="form2Example17">Comentario</label>
                                                    </div>

                                                    <h6 className="letter-space"> Que valoracion le das a la Comida?</h6>

                                                    <div className="form-outline mb-4">
                                                        <FaStar onClick={() => this.starClickC(1)} color={this.state.c1 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickC(2)} color={this.state.c2 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickC(3)} color={this.state.c3 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickC(4)} color={this.state.c4 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickC(5)} color={this.state.c5 === true ? 'orange' : 'black'} size='30'/>
                                                    </div>

                                                    <h6 className="letter-space"> Que valoracion le das al Servicio?</h6>

                                                    <div className="form-outline mb-4">
                                                        <FaStar onClick={() => this.starClickS(1)} color={this.state.s1 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickS(2)} color={this.state.s2 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickS(3)} color={this.state.s3 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickS(4)} color={this.state.s4 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickS(5)} color={this.state.s5 === true ? 'orange' : 'black'} size='30'/>
                                                    </div>

                                                    <h6 className="letter-space"> Que valoracion le das al Sitio?</h6>

                                                    <div className="form-outline mb-4">
                                                        <FaStar onClick={() => this.starClickSi(1)} color={this.state.si1 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickSi(2)} color={this.state.si2 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickSi(3)} color={this.state.si3 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickSi(4)} color={this.state.si4 === true ? 'orange' : 'black'} size='30'/>
                                                        <FaStar onClick={() => this.starClickSi(5)} color={this.state.si5 === true ? 'orange' : 'black'} size='30'/>
                                                    </div>

                                                    <div className="pt-1 mb-4">
                                                        <button className="btn btn-dark btn-lg btn-block" type="button" onClick={() => this.enviar()}>Enviar Reseña</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
        )
    }
}

export default CommentMaker;