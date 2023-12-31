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
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleRedirect = () => {
        setIsLoading(true);
        const path = `/story-detail/${props.path}`;
        router.push(path);
        setTimeout(() => {
            // After your logic completes (simulated by setTimeout here), reset isLoading to false
            setIsLoading(false);
            // Add your redirection logic here
        }, 1000);
    };
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isClient, setIsClient] = useState(false);
    useEffect(() => {
      setIsClient(true);
    }, []);
    return (
        <div className={`${styles.CardComponent} card`} style={{ margin: "0px 20px" }} >
            {isClient&& props.image === "https://node.mystorybank.info:4000/images/undefined" ? <Image variant="top" src={CommonImage} width={100} height={100} style={{ width: "auto", height: "135px" }} /> : <Image variant="top" src={props.image} width={100} height={100} style={{ width: "auto", height: "135px" }} />}
            <div class="card-body" style={{ padding: "5px 10px" }}>
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text"
                    style={{ paddingBottom: "20px", }}
                    dangerouslySetInnerHTML={{
                        __html: props.text
                    }}></p>
                {/* <Button className='button_theme' onClick={() => props.paid === "PAID" ? handleShow() : handleRedirect()}>Read More</Button> */}
                {/* <Button className='button_theme' onClick={() => handleRedirect()} style={{margin:"10px 0px"}}>Read More</Button> */}
                { isClient&&isLoading ? (
                    <Button className='button_theme' style={{ margin: "10px 0px" }}>
                        Loading...
                    </Button>
                ) : (
                    <Button className='button_theme' onClick={() => handleRedirect()} style={{ margin: "10px 0px" }}>
                        Read More
                    </Button>
                )}
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
                        <div style={{ display: "flex", margin: "10px 0px" }}>
                            <Button className='button_theme' style={{ margin: "5px", padding: "5px", borderRadius: "10px" }} onClick={handleClose}>
                                Ignore
                            </Button>
                            <Button className='button_theme' style={{ margin: "5px", padding: "5px", borderRadius: "10px" }} onClick={() => {
                                const path = "https://transactions.sendowl.com/products/78271145/4A5919F0/view"
                                // router.push(path)
                                window.open(path, '_blank'); handleCloseModal()
                            }}>Buy Now</Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}
export default CardComponent;