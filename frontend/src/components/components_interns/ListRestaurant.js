import React, {Component} from "react";
import CardRestaurant from "./CardRestaurant";
import "./list_restaurants.css"
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {ButtonGroupSimple} from "./Arrows";
import $ from 'jquery'

class ListRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurants: this.props.restaurants
        }
    }


    render() {
        const { restaurants } = this.state;
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

        if (this.props.restaurants.length<responsive.desktop.items) {
            desappearRightArrow(this.props.restaurants.length);
        }

        return(
            <section className={"position-relative"}>
                <h4 className={"pt-5 pb-2"}>{this.props.title}</h4>
                {this.props.restaurants.length>responsive.desktop.items &&
                <Carousel
                    className={"sliderClass"}
                    arrows={false}
                    interval={false}
                    partialVisible={true}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroupSimple yourId={this.props.restaurants.length}/>}
                    responsive={responsive}
                    beforeChange={(nextSlide, { totalItems,slidesToShow, currentSlide }) => {
                        let left = "#left"+this.props.restaurants.length;
                        let right = "#right"+this.props.restaurants.length;

                        if (currentSlide === 0) {
                            $(left).hide();
                        } else {
                            $(+left).show();
                        }

                        if (slidesToShow*currentSlide>totalItems) {
                            $(right).hide();
                        } else {
                            $(right).show();
                        }
                    }}
                    afterChange={(previousSlide, { totalItems,slidesToShow,currentSlide }) => {
                        let left = "#left"+this.props.restaurants.length;
                        let right = "#right"+this.props.restaurants.length;

                        if (currentSlide === 0) {
                            $(left).hide();
                        } else {
                            $(left).show();
                        }

                        if (slidesToShow*currentSlide>totalItems) {
                            $(right).hide();
                        } else {
                            $(right).show();
                        }
                    }}>

                    {restaurants.map(function(item, key) {
                        return (
                            <CardRestaurant key={key} restaurant={item} localidad={item.localidad}/>
                        )
                    })}
                </Carousel>}
                {this.props.restaurants.length<=responsive.desktop.items &&
                <Carousel
                    className={"sliderClass"}
                    arrows={false}
                    partialVisible={true}
                    renderButtonGroupOutside={true}
                    responsive={responsive}
                    beforeChange={(nextSlide, { totalItems,slidesToShow, currentSlide }) => {
                        changeArrowState(currentSlide,slidesToShow,totalItems,this.props.restaurants.length)
                    }}
                    afterChange={(previousSlide, { totalItems,slidesToShow,currentSlide }) => {
                        changeArrowState(currentSlide,slidesToShow,totalItems,this.props.restaurants.length)
                    }}>

                    {restaurants.map(function(item, key) {
                        return (
                            <CardRestaurant key={key} restaurant={item} localidad={item.localidad}/>
                        )
                    })}
                </Carousel>}
            </section>
        )
    }
}

function changeArrowState(currentSlide, slidesToShow, totalItems, restaurant_length) {
    let left = "#left"+restaurant_length;
    let right = "#right"+restaurant_length;

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

function desappearRightArrow(props) {
    let right = "#right"+props;
    $(right).css("display","none");
}

export default ListRestaurant