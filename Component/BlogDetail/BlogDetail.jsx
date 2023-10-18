import React from 'react'
import styles from "./BlogDetail.module.scss"
import { Container } from 'react-bootstrap'
import Pic from "../../public/assets/pic.png"
import Image from 'next/image'
const BlogDetailComponent = () => {
    return (
        <Container className={styles.BlogDetailComponent}>
            <div>
                <h3>Lorem ipsum dolor sit amet consectetur.</h3>
                <h6>Lorem ipsum dolor sit amet consectetur. In eleifend cursus mauris faucibus sit. In eleifend cursus mauris faucibus sit.</h6>
                <Image src={Pic} width={100} height={100} alt='' className={styles.picture}/>
                <p>Lorem ipsum dolor sit amet consectetur. Orci et tincidunt nunc nec tellus dolor erat. Sit egestas tempor vestibulum elementum. Mauris interdum elementum viverra dignissim dictum dictum rhoncus orci ornare. Sed integer bibendum ultricies sit nunc sed mi feugiat.ristique vitae pretium elementum erat iaculis donec fringilla tortor at. Erat morbi odio sit pretium. Ultrices nibh volutpat semper lectus malesuada aenean. Vulputate metus tortor malesuada purus. Commodo volutpat ut aliquam adipiscing consectetur rutrum ultrices non. urpis in nisl donec pulvinar eget vitae. Egestas tristique a consectetur cras sapien nisi neque. Cursus id amet parturient bibendum integer.
                </p>
                <p>
                    Nibh fermentum amet sollicitudin ut consequat vel. Integer quam in maecenas duis volutpat id senectus nulla fames. Purus feugiat adipiscing nunc eu ut. Velit eget quis rhoncus nulla nulla proin venenatis quam cursus. Sed fringilla in dignissim diam felis feugiat. Non tristique amet fringilla lectus mi porttitor sit. Malesuada pretium nec sapien aliquam nisi nibh integer enim. Nulla fringilla sed nunc et dictumst lorem ac lectus. In aliquet sit id amet at sollicitudin sit justo pellentesque. Nunc sed mauris viverra vel aliquam mi varius.
                </p>
                <p>
                    Nibh fermentum amet sollicitudin ut consequat vel. Integer quam in maecenas duis volutpat id senectus nulla fames. Purus feugiat adipiscing nunc eu ut. Velit eget quis rhoncus nulla nulla proin venenatis quam cursus. Sed fringilla in dignissim diam felis feugiat. Non tristique amet fringilla lectus mi porttitor sit. Malesuada pretium nec sapien aliquam nisi nibh integer enim. Nulla fringilla sed nunc et dictumst lorem ac lectus. In aliquet sit id amet at sollicitudin sit justo pellentesque. Nunc sed mauris viverra vel aliquam mi varius.
                </p> <p>
                    Nibh fermentum amet sollicitudin ut consequat vel. Integer quam in maecenas duis volutpat id senectus nulla fames. Purus feugiat adipiscing nunc eu ut. Velit eget quis rhoncus nulla nulla proin venenatis quam cursus. Sed fringilla in dignissim diam felis feugiat. Non tristique amet fringilla lectus mi porttitor sit. Malesuada pretium nec sapien aliquam nisi nibh integer enim. Nulla fringilla sed nunc et dictumst lorem ac lectus. In aliquet sit id amet at sollicitudin sit justo pellentesque. Nunc sed mauris viverra vel aliquam mi varius.
                </p> <p>
                    Nibh fermentum amet sollicitudin ut consequat vel. Integer quam in maecenas duis volutpat id senectus nulla fames. Purus feugiat adipiscing nunc eu ut. Velit eget quis rhoncus nulla nulla proin venenatis quam cursus. Sed fringilla in dignissim diam felis feugiat. Non tristique amet fringilla lectus mi porttitor sit. Malesuada pretium nec sapien aliquam nisi nibh integer enim. Nulla fringilla sed nunc et dictumst lorem ac lectus. In aliquet sit id amet at sollicitudin sit justo pellentesque. Nunc sed mauris viverra vel aliquam mi varius.
                </p> <p>
                    Nibh fermentum amet sollicitudin ut consequat vel. Integer quam in maecenas duis volutpat id senectus nulla fames. Purus feugiat adipiscing nunc eu ut. Velit eget quis rhoncus nulla nulla proin venenatis quam cursus. Sed fringilla in dignissim diam felis feugiat. Non tristique amet fringilla lectus mi porttitor sit. Malesuada pretium nec sapien aliquam nisi nibh integer enim. Nulla fringilla sed nunc et dictumst lorem ac lectus. In aliquet sit id amet at sollicitudin sit justo pellentesque. Nunc sed mauris viverra vel aliquam mi varius.
                </p>
            </div>
        </Container>
    )
}

export default BlogDetailComponent
