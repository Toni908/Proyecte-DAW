import React, {Component} from "react";
import {Link} from "react-router-dom";
import NotFound from "../../img/decoracion.webp"
import "./ErrorNotFound.css";
import Translate from "../../locales/Translate";

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
                            <h1 className={"fw-bold title-not-found"}><Translate string={"ops-not-found"}/><br/><Translate string={"ops-not-found-2"}/></h1>
                            <p className={"fw-bold pb-2"}>
                                <Translate string={"text-not-found"}/>
                            </p>
                            <Link to={"/"} className={"bg-primary py-2 px-5 text-white text-decoration-none rounded-pill"}><Translate string={"button-back"}/></Link>
                        </div>
                    </div>
                    <div hidden={true}>{this.props.error.message}</div>
                </div>
            </section>
        )
    }
}

export default ErrorNotFound