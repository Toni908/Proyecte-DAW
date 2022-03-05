import React, { Component } from 'react';
import CardRestaurant from "./CardRestaurant";
import "./ListRestaurants.css"

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

    if (restaurants.length!==0) {
        return (
            <section>
                <div className="container">
                    <div className='row'>
                        <div className="d-flex flex-row flex-wrap">
                            {restaurants.map(function(item, key) {
                                return (
                                    <CardRestaurant className={"col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 border-0 mb-2 px-2"} key={key} restaurant={item} localidad={item.localidad}/>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>
        )
    } else {
        return(
            <section className="vh-auto m-auto">
                <div className="container py-5 h-auto">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-xl-10">
                            <div className="card border-radius">
                                <div className="row g-0 m-auto w-100">
                                    <div className="col-md-6 col-lg-7 d-flex align-items-center w-100">
                                        <div className="card-body p-4 p-lg-5 text-black w-100">
                                            <div className="w-100">
                                                <div className="d-flex align-items-center mb-3 pb-1">
                                                    <span className="h1 fw-bold mb-0">No hay resultados</span>
                                                </div>

                                                <h5 className="fw-normal mb-3 pb-3 letter-space"> No hay ningun resultado dados los filtros especificados, intenta buscar otra cosa!</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
  }
}

export default Resultados