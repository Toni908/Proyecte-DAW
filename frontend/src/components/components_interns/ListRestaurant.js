import React, {Component} from "react";
import CardRestaurant from "./CardRestaurant";
import "./ListRestaurants.css"
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

        this.handleResize = this.handleResize.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleResize);
        window.addEventListener('resize', this.handleResize);
    }

    componentWillUnmount() {
        window.removeEventListener("scroll", this.handleResize);
        window.removeEventListener('resize', this.handleResize);
    }

    handleResize() {
        if (window.innerWidth<3000 && window.innerWidth>1500) {
            this.setState({quantity: 4})
        }
        if (window.innerWidth<1500 && window.innerWidth>900) {
            this.setState({quantity: 2})
        }
        if (window.innerWidth<900 && window.innerWidth>0) {
            this.setState({quantity: 1})
        }
        if (this.props.restaurants.length<this.state.quantity) {
            desappearRightArrow(this.state.idList);
        }
    }

    render() {
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

        let restaurantes = Object.values(this.props.restaurants)

        return(
            <section className={"position-relative"}>
                <h3 className={"pt-3 mt-5 ps-1 title-principal"}>{this.props.title}</h3>
                {restaurantes.length>this.state.quantity &&
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

                    {restaurantes.map(function(item, key) {
                        return (
                            <CardRestaurant className={"myCarusel border-0 mb-xxl-0 mb-4 OxigenFont"} key={key} restaurant={item} localidad={item.localidad}/>
                        )
                    })}
                </Carousel>}
                {restaurantes.length<=this.state.quantity &&
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

                    {restaurantes.map(function(item, key) {
                        return (
                            <CardRestaurant className={"myCarusel border-0 mb-xxl-0 mb-4 OxigenFont"} key={key} restaurant={item} localidad={item.localidad}/>
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