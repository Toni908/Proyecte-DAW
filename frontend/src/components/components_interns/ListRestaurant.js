import React, {Component} from "react";
import CardRestaurant from "./CardRestaurant";
import "./list_restaurants.css"
import $ from 'jquery'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {ButtonGroup} from "./Arrows";

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
                breakpoint: { max: 3000, min: 1024 },
                items: 4,
                slidesToSlide: 4
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                slidesToSlide: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                slidesToSlide: 1
            }
        };

        return(
            <section className={"position-relative"}>
                <h4 className={"pt-5 pb-2"}>{this.props.title}</h4>
                <Carousel
                    className={"sliderClass"}
                    arrows={false}
                    interval={false}
                    draggable={true}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup />}
                    responsive={responsive}
                    beforeChange={(nextSlide, { totalItems,slidesToShow, currentSlide, onMove }) => {
                        if (currentSlide === 0) {
                            $("#left").hide();
                        } else {
                            $("#left").show();
                        }

                        if (slidesToShow*currentSlide>totalItems) {
                            $("#right").hide();
                        } else {
                            $("#right").show();
                        }
                    }}
                    afterChange={(previousSlide, { totalItems,slidesToShow,currentSlide, onMove }) => {
                        if (currentSlide === 0) {
                            $("#left").hide();
                        } else {
                            $("#left").show();
                        }
                        if (slidesToShow*currentSlide>totalItems) {
                            $("#right").hide();
                        } else {
                            $("#right").show();
                        }
                    }}
                >
                    {restaurants.map(function(item, key) {
                        return (
                            <CardRestaurant key={key} restaurant={item}/>
                        )
                    })}
                </Carousel>
            </section>
        )
    }
}

export default ListRestaurant