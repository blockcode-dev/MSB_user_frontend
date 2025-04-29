import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import styles from './CardComponent.module.scss';
import CommonImage from '../../public/assets/msb.png';

function CardComponent(props) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const [show, setShow] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleRedirect = () => {
        setIsLoading(true);
        const path = `/story-detail/${props.path}`;
        router.push(path);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };

    const handleReadStory = (storyProps) => {
        console.log('Reading story props:', storyProps);
        setIsLoading(true);
      
        // Save full item in sessionStorage (to mimic location.state behavior)
        sessionStorage.setItem('storyData', JSON.stringify(storyProps));
      
        router.push('/story-read');
      
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      };
      
      
    const handleCloseModal = () => setShow(false);
    const handleShowModal = () => setShow(true);

    const openBuyNowLink = () => {
        const path = 'https://transactions.sendowl.com/products/78271145/4A5919F0/view';
        window.open(path, '_blank');
        handleCloseModal();
    };

    const imageSrc =
        isClient && props.image === 'https://node.mystorybank.info:4000/images/undefined'
            ? CommonImage
            : props.image;

    return (
        <div className={`${styles.CardComponent} card`} style={{ margin: '0px 20px' }}>
            <Image
                src={imageSrc}
                alt={props.title || 'Story Image'}
                width={100}
                height={100}
                style={{ width: 'auto', height: '135px' }}
            />

            <div className="card-body" style={{ padding: '5px 10px' }}>
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text" style={{ paddingBottom: '20px' }} dangerouslySetInnerHTML={{ __html: (new DOMParser().parseFromString(props.text, 'text/html').body.textContent || "").slice(0, 200) + '...' }}></p>

                {/* <p
                    className="card-text"
                    style={{ paddingBottom: '20px' }}
                    dangerouslySetInnerHTML={{ __html: props.text }}
                ></p> */}

                {isLoading ? (
                    <Button className="button_theme" style={{ margin: '10px 0px' }}>
                        Loading...
                    </Button>
                ) : (
                    <Button
                        className="button_theme"
                        onClick={() => (props?.input ? handleReadStory(props) : handleRedirect())}
                        style={{ margin: '10px 0px' }}
                    >
                        Read More
                    </Button>
                )}

                <Modal
                    show={show}
                    onHide={handleCloseModal}
                    backdrop="static"
                    keyboard={false}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Subscribe for Exclusive Updates</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Join us to get exclusive updates, offers, and access to more stories!
                    </Modal.Body>
                    <Modal.Footer>
                        <div style={{ display: 'flex', margin: '10px 0px' }}>
                            <Button
                                className="button_theme"
                                style={{ margin: '5px', padding: '5px', borderRadius: '10px' }}
                                onClick={handleCloseModal}
                            >
                                Ignore
                            </Button>
                            <Button
                                className="button_theme"
                                style={{ margin: '5px', padding: '5px', borderRadius: '10px' }}
                                onClick={openBuyNowLink}
                            >
                                Buy Now
                            </Button>
                        </div>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default CardComponent;
