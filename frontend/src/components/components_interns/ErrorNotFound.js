import React, {Component} from "react";
import {Link} from "react-router-dom";
import NotFound from "../../img/NotFound.png"
import "./ErrorNotFound.css";

class ErrorNotFound extends Component {
    render() {
        return(
            <section className={"w-100 d-flex flex-row justify-content-center pt-lg-5 p-0 mb-3 font-family-not-found"}>
                <div className={"row notfound-width"}>
                    <div className={"col-xl-6 col-12"}>
                        <img src={NotFound} className={"image-notFound"} alt={"NOT FOUND URL"}/>
                    </div>
                    <div className={"col-xl-6 col-12 d-flex justify-content-center align-items-center"}>
                        <div className={"pe-5"}>
                            <h1 className={"fw-bold title-not-found"}>OOPS! PAGE<br/> NOT FOUND.</h1>
                            <p className={"fw-bold pb-2"}>
                                You must have picked the wrong door because I haven`t been able to lay my eve on the page you`ve been searching for.
                            </p>
                            <Link to={"/"} className={"bg-primary py-2 px-5 text-white text-decoration-none rounded-pill"}>BACK TO HOME</Link>
                        </div>
                    </div>
                    <div hidden={true}>{this.props.error.message}</div>
                </div>
            </section>
        )
    }
}

export default ErrorNotFound