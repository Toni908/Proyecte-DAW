import {Component} from "react";
import "./Loading.css";
import logoEmpty from "../../img/trobalot_empty.png";
import logoDots from "../../img/trobalot_dots_animation_2.png";

class Loading extends Component {
    render() {
        return(
            <section className={"center-fixed"}>
                <img src={logoEmpty} className={"image-front"} alt={"Trobalo"}/>
                <img src={logoDots} className={"animation-dots"} alt={"Trobalo"}/>
            </section>
        )
    }
}

export default Loading;