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
console.log(props,"props")
    return (
        // <Card style={{ margin: "0px 20px" }}>
        //     <Image variant="top" src={props.image} width={100} height={100} style={{ width: "auto", height: "225px" }}  alt=''/>
        //     <Card.Body>
        //         <Card.Title >{props.title}</Card.Title>
        //         <Card.Text>
        //             {props.text}
        //         </Card.Text>
        //     </Card.Body>
        // </Card>
        <div class="card" style={{ margin: "0px 20px" }}>
            <Image variant="top" src={props.image} width={100} height={100} style={{ width: "auto", height: "225px" }} />
            <div class="card-body">
                <h5 class="card-title">{props.title}</h5>
                <p class="card-text">{props.text}</p>
           <Button className='button_theme' onClick={handleRedirect}>Read More</Button> 
            </div>
        </div>
    );
}

export default CardComponent;