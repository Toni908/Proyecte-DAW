import React, { Component } from 'react';
import Translate from "./locales/Translate";

import { Button } from 'react-bootstrap';

import './AboutUs.css';

import decoracion from './img/decoracion.png'

class AboutUs extends Component {
    render() {
        return(
                <div className='AboutUs'>
                <div className="container mx-auto">
                <div className="w-100 row">
                <article className="text-center col-12">
                    <h1 className="aboutTittle text-center mb-4"><Translate string={'sobre_nosotros'}/></h1>
                    <div className="subtext mx-auto text-center">
                        <span><Translate string={'explicacion'}/></span>
                    </div>

                    <div className="mt-4 mb-3 separador"></div>

                    <div className="w-100 mb-4">
                        <div className="cen">
                            <Button variant="primary" className="py-2 px-4 color"><Translate string={'contactanos'}/></Button>
                        </div>
                    </div>
                    
                    <div className="container mx-auto">
                        <div className="w-100 mx-auto row text-center">
                            <div className="col-lg-5 col-md-8 col-sm-12 izquierda mx-auto py-5 px-5 text-start">
                                <span className="gray">
                                    Sit amet massa vitae tortor condimentum lacinia quis. Ornare arcu dui vivamus arcu felis bibendum ut. Consectetur 
                                    adipiscing elit duis tristique sollicitudin. Volutpat lacus laoreet non curabitur. Magna fringilla urna porttitor rhoncus. 
                                    Ultricies leo integer malesuada nunc vel risus commodo viverra. Ipsum a arcu cursus vitae congue. Imperdiet dui accumsan sit 
                                    amet nulla facilisi. Tincidunt dui ut ornare lectus sit. Phasellus faucibus scelerisque eleifend donec pretium vulputate 
                                    sapien nec. Eget gravida cum sociis natoque. 
                                </span>
                                    <br></br><br></br>
                                <span>
                                    Image from <a href="https://nicepage.com/html-templates/preview/web-designer-biography-954038" className="gray text-decoration-none">Freepik</a>
                                </span>
                            </div>
                            <div className="col-5 derecha">
                                <img src={decoracion} alt="Decoration"/>
                            </div>
                        </div>
                    </div>

                </article>
            </div>
            </div>
            </div>
            
        );
    }
}

export default AboutUs;