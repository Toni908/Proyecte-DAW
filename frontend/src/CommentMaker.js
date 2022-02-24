import React, { Component } from 'react';
import axios from "axios";

import Valoracion from './components/components_interns/Valoracion';
import './CommentMaker.css';
class CommentMaker extends Component {

    constructor(props) {

        super(props);

        this.state={
            enviado: false,
            comentario: "",
            puntuacioComida: 0,
            puntuacioServicio: 0,
            puntuacioSitio: 0,
        }   

        this.comment = this.comment.bind(this);
        this.changeC = this.changeC.bind(this);
        this.changeS = this.changeS.bind(this);
        this.changeSi = this.changeSi.bind(this);

    }

    

    puntuacion(e, num){
        console.log(e);
    }

    enviar(){
        if(this.state.comentario === ""){
            alert("Tienes que opinar algo!");
        }else if(this.state.puntuacioComida === 0 || this.state.puntuacioServicio === 0 || this.state.puntuacioSitio === 0){
            alert("Recuerda rellenar la valoracion!");
        }else{
        var ip = process.env.REACT_APP_API_URL;
        var url = window.location.href;
        var l = url.split('/');
        var d = l.length-1;
        var id = l[d];
        axios.post( ip + '/createcomment', {
            comentario: this.state.comentario,
            puntuacioComida: this.state.puntuacioComida,
            puntuacioServicio: this.state.puntuacioServicio,
            puntuacioSitio: this.state.puntuacioSitio,
            id: id
        }).then((result) => {
            if(result.data === 1){
                this.setState({enviado:true});
            }else{
                alert("Algo a ido mal y tu comentario no a podido guardarse! Intentelo de nuevo mas tarde por favor.");
            }
        }).catch((err) => {
            alert("A sucedido un error, porfavor intentelo mas tarde");
        });
        }
    }

    comment(etc){
        const val = etc.target.value;
        this.setState({
          comentario: val
        });
    }

    changeC(value){
        this.setState({puntuacioComida: value});
    }
    changeS(value){
        this.setState({puntuacioServicio: value});
    }
    changeSi(value){
        this.setState({puntuacioSitio: value});
    }

    render() {

        if(!this.state.enviado){
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
                                                        <textarea name="correo" className="form-control form-control-lg" rows="10" onChange={this.comment}/>
                                                        <label className="form-label" htmlFor="form2Example17">Comentario</label>
                                                    </div>

                                                    <h6 className="letter-space"> Que valoracion le das a la Comida?</h6>

                                                        <Valoracion ifClicked={this.changeC}/>

                                                    <h6 className="letter-space"> Que valoracion le das al Servicio?</h6>

                                                        <Valoracion ifClicked={this.changeS}/>

                                                    <h6 className="letter-space"> Que valoracion le das al Sitio?</h6>

                                                        <Valoracion ifClicked={this.changeSi}/>

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
    }else{
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
                                                        <span className="h1 fw-bold mb-0">Gracias por tu comentario</span>
                                                    </div>

                                                    <h5 className="fw-normal mb-3 pb-3 letter-space"> Tu comentario a sido aplicado. Esperamos que haya sido una experiencia inolvidable!</h5>
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
}

export default CommentMaker;