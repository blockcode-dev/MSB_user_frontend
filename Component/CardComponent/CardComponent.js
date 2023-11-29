import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import styles from "./CardComponent.module.scss"
import CommonImage from "../../public/assets/msb.png"

import { useState } from 'react';
function CardComponent(props) {
    // console.log(props, "props")
    const router = useRouter();
    const handleRedirect = () => {
        const path = `/blogdetail/${props.path}`;
        router.push(path);
    };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(props.image, "||||")
    return (
        <div className={`${styles.CardComponent} card`} style={{ margin: "0px 20px" }} >
            {props.image === "https://node.mystorybank.info:4000/images/undefined" ? <Image variant="top" src={CommonImage} width={100} height={100} style={{ width: "auto", height: "135px" }} /> : <Image variant="top" src={props.image} width={100} height={100} style={{ width: "auto", height: "135px" }} />}

            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text"
                    style={{ paddingBottom: "20px" }}
                    dangerouslySetInnerHTML={{
                        __html: props.text
                    }}></p>
                <Button className='button_theme' onClick={() => props.paid === "PAID" ? handleShow() : handleRedirect()}>Read More</Button>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                    // size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Subscribe for Exclusive Updates</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Join us to get exclusive updates, offers, and access to more stories!</Modal.Body>
                    <Modal.Footer>
                        <div style={{ display: "flex" }}>
                            <Button className='button_theme' style={{ margin: "5px", padding: "5px", borderRadius: "10px" }} onClick={handleClose}>
                                Ignore
                            </Button>
                            <Button className='button_theme' style={{ margin: "5px", padding: "5px", borderRadius: "10px" }} onClick={() => {
                                const path = "https://transactions.sendowl.com/products/78271145/4A5919F0/view"
                                router.push(path)
                            }}>Buy Now</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
export default CardComponent;