import React, {Component} from "react";
import "./list_restaurants.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import $ from 'jquery'
import CardMunicipio from "./CardMunicipio";
import {ButtonGroupSimple} from "./Arrows";

class ListMunicipios extends Component {
    constructor(props) {
        super(props);

        this.state = {
            municipios: this.props.municipios
        }
    }

    render() {
        const { municipios } = this.state;

        const responsive = {
            desktop: {
                breakpoint: { max: 3000, min: 1500 },
                items: 4,
                slidesToSlide: 4,
                partialVisibilityGutter: 15
            },
            tablet: {
                breakpoint: { max: 1500, min: 900 },
                items: 2,
                slidesToSlide: 2,
                partialVisibilityGutter: 15
            },
            mobile: {
                breakpoint: { max: 900, min: 0 },
                items: 1,
                slidesToSlide: 1
            }
        };

        return(
            <section className={"position-relative"}>
                <h4 className={"pt-5 pb-0 m-0 text-color-TYPE-1 HindFont"}>{this.props.title}</h4>
                <Carousel
                    className={"sliderClass"}
                    arrows={false}
                    interval={false}
                    partialVisible={true}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroupSimple yourId={this.props.municipios.length}/>}
                    responsive={responsive}
                    beforeChange={(nextSlide, { totalItems,slidesToShow, currentSlide }) => {
                        changeArrowState(currentSlide,slidesToShow,totalItems,this.props.municipios.length)
                    }}
                    afterChange={(previousSlide, { totalItems,slidesToShow,currentSlide }) => {
                        changeArrowState(currentSlide,slidesToShow,totalItems,this.props.municipios.length)
                    }}
                >

                    {municipios.map(function(municipio, key) {
                        return (
                            <CardMunicipio key={key} municipio={municipio}/>
                        )
                    })}
                </Carousel>
            </section>
        )
    }
}

function changeArrowState(currentSlide, slidesToShow, totalItems, municipio_length) {
    let left = "#left"+municipio_length;
    let right = "#right"+municipio_length;

    if (currentSlide === 0) {
        $(left).hide();
    } else {
        $(left).show();
    }
    if (currentSlide>=totalItems-slidesToShow) {
        $(right).hide();
    } else {
        $(right).show();
    }
}

export default ListMunicipios