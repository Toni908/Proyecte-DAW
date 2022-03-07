import React, {useState} from "react";
import {Modal} from "react-bootstrap";
import {EmailIcon, EmailShareButton} from "react-share";

import Translate from "../../locales/Translate";

import "./ModalShare.css";

function ModalUser(props) {
    const [show, setShow] = useState(false);
    const [copy, setCopy] = useState(false);

    if (props.user!==undefined) {
        return (
            <div className={"modal-80w"}>
                <button className="button-share show-more" onClick={() => setShow(true)}>
                    <Translate string={"contact-manager"}/>
                </button>

                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="modal-80w"
                    aria-labelledby="modalUser"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="modalUser" className={"w-100 text-center pt-3"}>
                            <div className={"fw-bold pb-2 text-capitalize"}><Translate string={"question-manager"}/></div>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <section className={"row px-3"}>
                            <section className={"col-lg-6 col-12 px-2 pb-2"} onClick={() => copyOnClipBoard(props.email)}>
                                <div className={"box_icon text-center d-flex flex-row"} onClick={() => setCopy(true)}>
                                    <i className="ps-2 bi bi-clipboard fs-3"/>
                                    <div className={"ps-4 fw-bold align-self-center"}><Translate string={"copy-email"}/></div>
                                </div>
                            </section>
                            <EmailShareButton
                                url={"Pregunta sobre "+props.restaurant+" correo->"+props.email}
                                className={"col-lg-6 col-12 px-2 pb-2"}>
                                <div className={"box_icon text-center d-flex flex-row"}>
                                    <EmailIcon size={40} round={false} borderRadius={10}/>
                                    <div className={"ps-4 fw-bold align-self-center"}>Email</div>
                                </div>
                            </EmailShareButton>
                            {copy &&
                            <section className={"d-flex flex-row justify-content-center"}>
                                <div className={"w-auto px-3 p-2 border box-copied align-self-center d-flex flex-row justify-content-center"}>
                                    <i className="bi bi-check text-success fs-5"/>
                                    <div className={"align-self-center"}>
                                        <Translate string={"copied-email"}/>
                                    </div>
                                </div>
                            </section>}
                        </section>
                    </Modal.Body>
                </Modal>
            </div>
        );
    } else {
        return(<Translate string={"loading"}/>)
    }
}

function copyOnClipBoard(email) {
    let dummy = document.createElement('input'), text = email;
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);
}

export default ModalUser