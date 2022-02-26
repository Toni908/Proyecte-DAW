import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton, LineIcon, LineShareButton, OKIcon, OKShareButton,
    TwitterIcon,
    TwitterShareButton
} from "react-share";
import "./ModalShare.css";

function ModalShare(props) {
    const [show, setShow] = useState(false);
    const [copy, setCopy] = useState(false);

    return (
        <div className={"modal-80w"}>
            <a href="#" className={"button-share"} onClick={() => {setShow(true); setCopy(false)}}>
                <i className="bi bi-box-arrow-up pe-2 text-black"/>Compartir
            </a>

            <Modal
                show={show}
                onHide={() => {setShow(false);setCopy(false)}}
                dialogClassName="modal-80w"
                aria-labelledby="modalShare"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="modalShare">
                        <div className={"ps-2 pt-2"}>Comparte este restaurante con tus amigos y familiares</div>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={"d-flex flex-row py-3 ps-3"}>
                        {props.restaurant.nombre!==undefined && <div className={"pe-2"}>{props.restaurant.nombre}</div>}
                        ·
                        {props.restaurant.localidad!==undefined && <div className={"ps-2"}>{props.restaurant.localidad.nombre_localidad}</div>}
                    </div>
                    {<section className={"row px-3"}>
                        {props.restaurant.id_restaurante !== undefined &&
                            <section className={"col-lg-6 col-12 px-2 pb-2"} onClick={copyOnClipBoard}>
                                <div className={"box_icon text-center d-flex flex-row"} onClick={() => setCopy(true)}>
                                    <i className="ps-2 bi bi-clipboard fs-3"/>
                                    <div className={"ps-4 fw-bold align-self-center"}>Copiar enlace</div>
                                </div>
                            </section>}
                        {props.restaurant.id_restaurante !== undefined &&
                        <EmailShareButton
                            title={props.restaurant.nombre}
                            url={"https://www.mallorcarestaurant.me/restaurant/"+props.restaurant.id_restaurante}
                            className={"col-lg-6 col-12 px-2 pb-2"}>
                            <div className={"box_icon text-center d-flex flex-row"}>
                                <EmailIcon size={40} round={false} borderRadius={10}/>
                                <div className={"ps-4 fw-bold align-self-center"}>Email</div>
                            </div>
                        </EmailShareButton>}
                        {props.restaurant.id_restaurante !== undefined &&
                        <LineShareButton
                            title={props.restaurant.nombre}
                            url={"https://www.mallorcarestaurant.me/restaurant/"+props.restaurant.id_restaurante}
                            className={"col-lg-6 col-12 px-2 pb-2"}>
                            <div className={"box_icon text-center d-flex flex-row"}>
                                <LineIcon size={40} round={false} borderRadius={10}/>
                                <div className={"ps-4 fw-bold align-self-center"}>Line</div>
                            </div>
                        </LineShareButton>}
                        {props.restaurant.id_restaurante !== undefined &&
                        <FacebookShareButton
                            url={"https://www.mallorcarestaurant.me/restaurant/" + props.restaurant.id_restaurante}
                            quote={"Mallorca Restaurant Facebook"}
                            hashtag={["#mallorcarestaurant"]} className={"col-lg-6 col-12 px-2 pb-2"}>
                            <div className={"box_icon text-center d-flex flex-row"}>
                                <FacebookIcon size={40} round={false} borderRadius={10}/>
                                <div className={"ps-4 fw-bold align-self-center"}>Facebook</div>
                            </div>
                        </FacebookShareButton>}
                        {props.restaurant.localidad !== undefined &&
                        <TwitterShareButton
                            title={props.restaurant.nombre}
                            url={"https://www.mallorcarestaurant.me/restaurant/"+props.restaurant.id_restaurante}
                            hashtags={[QuitarSpaceHashTags(props.restaurant.nombre), QuitarSpaceHashTags(props.restaurant.localidad.nombre_localidad)]}
                            className={"col-lg-6 col-12 px-2 pb-2"}>
                            <div className={"box_icon text-center d-flex flex-row"}>
                                <TwitterIcon size={40} round={false} borderRadius={10}/>
                                <div className={"ps-4 fw-bold align-self-center"}>Twitter</div>
                            </div>
                        </TwitterShareButton>}
                        {props.restaurant.id_restaurante !== undefined &&
                        <OKShareButton
                            title={props.restaurant.nombre}
                            url={"https://www.mallorcarestaurant.me/restaurant/"+props.restaurant.id_restaurante}
                            className={"col-lg-6 col-12 px-2 pb-2"}>
                            <div className={"box_icon text-center d-flex flex-row"}>
                                <OKIcon size={40} round={false} borderRadius={10}/>
                                <div className={"ps-4 fw-bold align-self-center"}>OK</div>
                            </div>
                        </OKShareButton>}
                        {copy &&
                        <section className={"d-flex flex-row justify-content-center"}>
                            <div className={"w-auto px-3 p-2 border box-copied align-self-center d-flex flex-row justify-content-center"}>
                                <i className="bi bi-check text-success fs-5"/>
                                <div className={"align-self-center"}>
                                    Enlace copiado
                                </div>
                            </div>
                        </section>}
                    </section>}
                </Modal.Body>
            </Modal>
        </div>
    );
}

function copyOnClipBoard() {
    var dummy = document.createElement('input'), text = window.location.href;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

}

function QuitarSpaceHashTags(nombre) {
    if (nombre!==undefined) {
        let array = nombre.split(" ");
        let name = "";
        for (let i = 0; i < array.length; i++) {
            name += array[i];
        }
        return name;
    }
    return nombre;
}
export default ModalShare