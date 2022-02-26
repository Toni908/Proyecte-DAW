import React, { Component } from 'react';
import CardRestaurant from "./CardRestaurant";
import "./list_restaurants.css"
import $ from 'jquery'

class Resultados extends Component {
    constructor(props) {
      super(props);

      this.state = {
        restaurants: this.props.restaurants,
      }

    this.isResponsive = this.isResponsive.bind(this);
    }
    componentDidMount(){
      let ip = process.env.REACT_APP_API_URL;
      this.setState({ isLoading: true });

      const request1 = axios.get(ip+"/restaurants");
      const request2 = axios.get(ip+"/economic");
      const request3 = axios.get(ip+"/capitales");

      axios.all([request1, request2,request3]).then(axios.spread((...responses) => this.setState({
          BestRestaurants: responses[0].data,
          EconomicRestaurants: responses[1].data,
          CapitalesRestaurants: responses[2].data,
          isLoading: false
      }))).catch(error => this.setState({
          error: error,
      }))
    }

  render() {
    return (
        {restaurants.map(function(item, key) {
          return (
            <CardRestaurant key={key} restaurant={item} localidad={item.localidad}/>
          )
        })}
    );
  }
}

export default Resultados