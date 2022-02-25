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
            restaurants: this.props.restaurants,
            quantity: 4,
            idList: this.props.idList
        }

        this.isResponsive = this.isResponsive.bind(this);
    }
    isResponsive() {
        if (window.innerWidth<1500) {
            this.setState({quantity:1})
        } else {
            this.setState({quantity:4})
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

        if (this.props.restaurants.length<this.state.quantity) {
            desappearRightArrow(this.state.idList);
        }

        return(
            <section className={"position-relative"} onLoad={this.isResponsive}>
                <h4 className={"pt-5 pb-0 m-0 HindFont text-color-TYPE-1"}>{this.props.title}</h4>
                {this.props.restaurants.length>this.state.quantity &&
                <Carousel
                    className={"sliderClass"}
                    arrows={false}
                    interval={false}
                    partialVisible={true}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroupSimple yourId={this.state.idList}/>}
                    responsive={responsive}
                    beforeChange={(nextSlide, { totalItems,slidesToShow, currentSlide }) => {
                        changeArrowState(currentSlide,slidesToShow,totalItems,this.state.idList)
                    }}
                    afterChange={(previousSlide, { totalItems,slidesToShow,currentSlide }) => {
                        changeArrowState(currentSlide,slidesToShow,totalItems,this.state.idList)
                    }}>

                    {restaurants.map(function(item, key) {
                        return (
                            <CardRestaurant key={key} restaurant={item} localidad={item.localidad}/>
                        )
                    })}
                </Carousel>}
                {this.props.restaurants.length<=this.state.quantity &&
                <Carousel
                    className={"sliderClass"}
                    arrows={false}
                    partialVisible={true}
                    renderButtonGroupOutside={true}
                    responsive={responsive}
                    beforeChange={(nextSlide, { totalItems,slidesToShow, currentSlide }) => {
                        changeArrowState(currentSlide,slidesToShow,totalItems,this.state.idList)
                    }}
                    afterChange={(previousSlide, { totalItems,slidesToShow,currentSlide }) => {
                        changeArrowState(currentSlide,slidesToShow,totalItems,this.state.idList)
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