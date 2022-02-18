import React, {Component} from "react";
import CardRestaurant from "./CardRestaurant";
import "./list_restaurants.css"
import $ from 'jquery'

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

class ListRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurants: this.props.restaurants
        }
    }

    jQueryCode = () => {
        $( window ).resize(function() {
        });
    }

    render() {
        const { restaurants } = this.state;
        console.log(restaurants)
        const responsive = {
            superLargeDesktop: {
                // the naming can be any, depends on you.
                breakpoint: { max: 4000, min: 3000 },
                items: 5
            },
            desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4
            },
            tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2
            },
            mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1
            }
        };

        return(
            <Carousel
                swipeable={false}
                responsive={responsive}
                autoPlay={this.props.deviceType !== "mobile" ? true : false}
                autoPlaySpeed={1000}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={500}
                containerClass="carousel-container"
                deviceType={this.props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {restaurants.map(function(item, key) {
                    return (
                        <CardRestaurant key={key} restaurant={item}/>
                    )
                })}
            </Carousel>
            // <section className={"position-relative"}>
            //     <h4 className={"pt-5 pb-2"}>{this.props.title}</h4>
            //
            //     <Carousel responsive={responsive}
            //               swipeable={false}
            //               draggable={false}
            //               showDots={true}
            //               ssr={true} // means to render carousel on server-side.
            //               keyBoardControl={true}
            //               customTransition="all .5"
            //               transitionDuration={500}
            //               containerClass="carousel-container"
            //               removeArrowOnDeviceType={["tablet", "mobile"]}
            //               deviceType={this.props.deviceType}
            //               dotListClass="custom-dot-list-style"
            //               itemClass="carousel-item-padding-40-px">
            //         <div className={"row m-0 pt-xxl-0 mb-5 px-2 px-lg-0 d-flex flex-row justify-content-between"}>
            //             {this.state.restaurants.map(function(item, key) {
            //                 return (
            //                     <CardRestaurant key={key} restaurant={item}/>
            //                 )
            //             })}
            //         </div>
            //     </Carousel>
            // </section>
        )
    }
}

export default ListRestaurant