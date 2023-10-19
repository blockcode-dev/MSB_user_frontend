import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { Nav } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function CardComponent(props) {

    const router = useRouter();

    const handleRedirect = () => {
        const path = "/blogdetail/blog";
        router.push(path);
    };
    useEffect(() => {

    }, [])
    return (
        <Card style={{ margin: "0px 20px" }}>
            <Image variant="top" src={props.image} width={100} height={100} style={{ width: "auto", height: "225px" }} />
            <Card.Body>
                <Card.Title >{props.title}</Card.Title>
                <Card.Text>
                    {props.text}
                </Card.Text>
                <Button className='button_theme' onClick={handleRedirect}>Read More</Button>
            </Card.Body>
        </Card>
    );
}

export default CardComponent;