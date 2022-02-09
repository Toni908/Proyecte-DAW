import React, { Component } from 'react';

import { Button, Nav } from 'react-bootstrap';

import './AboutUs.css';

import decoracion from './img/decoracion.png'

class AboutUs extends Component {
    render() {
        return(
                <div className='AboutUs'>
                <div class="container mx-auto">
                <div class="w-100 row">
                <article class="text-center col-12">
                    <h1 className="aboutTittle text-center mb-4"> Sobre Nosotros </h1>
                    <div class="subtext mx-auto text-center">
                        <span>A life's work of embracing both the creative and the quantitative, developing thriving online businesses and enviable brands.</span>
                    </div>

                    <div class="mt-4 mb-3 separador"></div>

                    <div class="w-100 mb-4">
                        <div class="cen">
                            <Button variant="primary" className="py-2 px-4 color">Contactanos</Button>
                        </div>
                    </div>
                    
                    <div class="container mx-auto">
                        <div class="w-100 mx-auto row text-center">
                            <div class="col-lg-5 col-md-8 col-sm-12 izquierda mx-auto py-5 px-5 text-start">
                                <span class="gray">
                                    Sit amet massa vitae tortor condimentum lacinia quis. Ornare arcu dui vivamus arcu felis bibendum ut. Consectetur 
                                    adipiscing elit duis tristique sollicitudin. Volutpat lacus laoreet non curabitur. Magna fringilla urna porttitor rhoncus. 
                                    Ultricies leo integer malesuada nunc vel risus commodo viverra. Ipsum a arcu cursus vitae congue. Imperdiet dui accumsan sit 
                                    amet nulla facilisi. Tincidunt dui ut ornare lectus sit. Phasellus faucibus scelerisque eleifend donec pretium vulputate 
                                    sapien nec. Eget gravida cum sociis natoque. 
                                </span>
                                    <br></br><br></br>
                                <span>
                                    Image from <a href="https://nicepage.com/html-templates/preview/web-designer-biography-954038" class="gray text-decoration-none">Freepik</a>
                                </span>
                            </div>
                            <div class="col-5 derecha">
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