import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import axios from "axios";
import Loading from "../components_interns/Loading";

class Restaurant extends Component {
    constructor() {
        super();

        this.state = {
            restaurant: [],
            isLoading: false,
            error: null,
        };
    }

    componentDidMount() {
        this.setState({ isLoading: true });
        let url = window.location.href;
        let l = url.split('/');
        let d = l.length-1;
        let id = l[d];
        let ip = process.env.REACT_APP_API_URL;
        axios.get(ip+"/restaurant/"+id)
            .then(result => this.setState({
                restaurant: result.data,
                isLoading: false
            }))
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
    }

    render() {
        const {restaurant, isLoading, error } = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }
        if (isLoading) {
            return <Loading />;
        }

        return(
          <section>
              <div>
                  <p>{restaurant.nombre}</p>
              </div>
          </section>
        );
    }
}

export default Restaurant