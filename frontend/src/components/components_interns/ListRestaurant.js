import React, {Component} from "react";
import CardRestaurant from "./CardRestaurant";
import $ from 'jquery'

class ListRestaurant extends Component {
    constructor() {
        super();

        this.state = {
            title: this.props.title,
            restaurants: this.props.restaurants
        }
    }

    render() {
        return(
            <section>
                <h4 className={"pt-5 pb-2"}>{this.state.title}</h4>
                <div className={"carrusel1 row w-100 m-0 pt-xxl-0 mb-5 px-2 px-lg-0"}>
                    {this.props.restaurants.map(function(item, key) {
                        return (
                            <article key={key} className={"w-25 p-0"}>
                                <CardRestaurant restaurant={item}/>
                            </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}

export default ListRestaurant