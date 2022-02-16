import React, {Component} from "react";
import CardRestaurant from "./CardRestaurant";
import "./list_restaurants.css"
import $ from 'jquery'

class ListRestaurant extends Component {
    constructor() {
        super();

        this.state = {
            restaurants: []
        }
    }

    jQueryCode = () => {
        $( window ).resize(function() {

        });
    }

    componentDidMount() {
        this.setState({restaurants: inicializeRestaurants(getNumberSize(), this.props.restaurants)});
        this.jQueryCode();
    }

    render() {
        return(
            <section className={"position-relative"}>
                <div className={"arrow-left-position"}>
                    <i className="bi bi-arrow-left-circle-fill"/>
                </div>
                <h4 className={"pt-5 pb-2"}>{this.props.title}</h4>
                <div className={"row m-0 pt-xxl-0 mb-5 px-2 px-lg-0"}>
                    {this.state.restaurants.map(function(item, key) {
                        return (
                            <CardRestaurant key={key} restaurant={item}/>
                        )
                    })}
                </div>
                <div className={"arrow-right-position"}>
                    <i className="bi bi-arrow-right-circle-fill"/>
                </div>
            </section>
        )
    }
}

let visible = [];

function iniclializeVisible(restaurants) {
    restaurants = inicializeRestaurants(getNumberSize(),restaurants);
    for (let i = 0; i < restaurants.length; i++) {
        visible[i] = false;
    }
}

function inicializeRestaurants(length, restaurants) {
    if (length===restaurants.length) {
        return restaurants;
    } else {
        let visible = [];
        for (let i = 0; i < restaurants.length; i++) {
            if (i<length) {
                visible[i] = restaurants[i];
            }
        }
        return visible;
    }
}

function isSmall() {
    return window.innerWidth <= 1400;
}

function getNumberSize() {
    if (isSmall()) {
        return 1;
    } else {
        return 4;
    }
}

export default ListRestaurant