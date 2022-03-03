import React, {Component} from "react";
import {Accordion} from "react-bootstrap";
import axios from "axios";
import schedule from "./utilities/schedule.js";
import "./HorarioRestaurant.css";

class HorarioRestaurant extends Component {
    _isMounted = false;

    constructor() {
        super();

        this.state = {
            horario: [],
            isLoading: false,
            error: null
        };
    }

    componentDidMount() {
        this._isMounted = true;

        this.setState({ isLoading: true });
        let ip = process.env.REACT_APP_API_URL;
        axios.get(ip+"/horario/"+this.props.restaurant.id_restaurante)
            .then(result => {if (this._isMounted) {this.setState({
                horario: result.data,
                isLoading: false
            })}})
            .catch(error => this.setState({
                error,
                isLoading: false
            }));
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        const {horario, isLoading, error} = this.state;

        if (error) {
            return <p>{error.message}</p>;
        }

        let header = schedule.textHeader(horario);
        let body = schedule.isTodayOpen(horario);

        if (isLoading) {
            if (this.props.isSimple) {
                if (!this.props.onlyHeader) {
                    return (
                        <section className={"shadow-box p-4 bg-white"}>
                            <div className={"d-flex flex-column gap-2"}>
                                <div className={"d-flex flex-row justify-content-center"}>
                                   <div className={"py-1"}>Loading...<br/></div>
                                </div>
                            </div>
                            <hr/>
                            <div className={"d-flex flex-row justify-content-center bg-white"}>
                                <div className={"d-flex flex-column"}>
                                    {body.map(function (item, key) {
                                        return (<div className={"py-1"} key={key}><br/></div>)
                                    })}
                                </div>
                            </div>
                        </section>
                    )
                }
            }
            return (<p>Loading...</p>)
        }

        if (this.props.isSimple) {
            if (this.props.onlyHeader) {
                return (
                    <section className={"bg-white"}>
                        <div className={"d-flex flex-column gap-2"}>
                            <div className={"text-dark fw-bold d-flex flex-row justify-content-center"}>
                                {header}
                            </div>
                        </div>
                    </section>
                )
            } else {
                return (
                    <section className={"shadow-box p-4 bg-white"}>
                        <div className={"d-flex flex-column gap-2"}>
                            <div className={"d-flex flex-row justify-content-center"}>
                                {header}
                            </div>
                        </div>
                        <hr/>
                        <div className={"d-flex flex-row justify-content-center bg-white"}>
                            <div className={"d-flex flex-column"}>
                                {body.map(function (item, key) {
                                    return (<div key={key}>{item}</div>)
                                })}
                            </div>
                        </div>
                    </section>
                )
            }
        } else {
            if (this.props.onlyHeader) {
                return (
                    <section className={"bg-white"}>
                        <div className={"d-flex flex-column gap-2"}>
                            {body.map(function (item, key) {
                                return (<div key={key} className={"text-black"}>{item}</div>)
                            })}
                        </div>
                    </section>
                )
            } else {
                return (
                    <Accordion className={"bg-white"}>
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>{header}</Accordion.Header>
                            <Accordion.Body>
                                {body.map(function (item, key) {
                                    return (<div key={key} className={"text-black"}>{item}</div>)
                                })}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                )
            }
        }
    }
}

export default HorarioRestaurant