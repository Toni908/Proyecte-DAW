import React, { Component } from 'react';
import CardRestaurant from "./CardRestaurant";
import "./list_restaurants.css"

class Resultados extends Component {
    constructor(props) {
      super(props);

      this.state = {
        restaurants: this.props.restaurants,
        quantity: null
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

    componentDidMount(){
    /*  let ip = process.env.REACT_APP_API_URL;
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
      }))*/
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
    if(this.restaurants === null){
      return (
        <h1>No restaurants</h1>
      )
    }else{
      return (
        <section>
          {restaurants.map(function(item, key) {
            return (
              <CardRestaurant key={key} restaurant={item} localidad={item.localidad}/>
            )
          })}
        </section>
      );
    }
  }
}

export default Resultados