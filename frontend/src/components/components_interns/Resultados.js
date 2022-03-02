import React, { Component } from 'react';
import CardRestaurant from "./CardRestaurant";
import "./list_restaurants.css"

class Resultados extends Component {
    constructor(props) {
      super(props);

      this.state = {
        restaurants: [],
        quantity: null
      }

    }

    componentDidMount(){
      this.setState({
        restaurants: this.props.restaurants
      });
    }


  render() {
    const { restaurants } = this.props;
        
        console.log(restaurants);
      return (
        <section>
          <div className="container">
          <div className='row'>
            {restaurants!==undefined && 
            <div className="d-flex flex-row flex-wrap">
              {restaurants.map(function(item, key) {
                        return (
                            <CardRestaurant className={"col-3 border-0 mb-2 px-2"} key={key} restaurant={item} localidad={item.localidad}/>
                        )
                    })}
            </div>}
          </div>
          </div>
          
        </section>
      );
    
  }
}

export default Resultados