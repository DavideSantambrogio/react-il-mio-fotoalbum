import React from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const Welcome = () => {
    return (
        <Row className="mt-5">
            <Col md={7} >
                <div className="ratio ratio-16x9">
                    <img src="/images/welcome-image.jpg" alt="Welcome" className="object-fit-cover border rounded" />
                </div>
            </Col>
            
            <Col md={5} className='d-flex align-items-center'>
                <div className="text-center">
                    <h2>Benvenuto nel mio blog</h2>
                    <h4>qui puoi trovare le mie foto</h4>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus non error labore! Itaque, ex ipsam. Dolorem fugit incidunt doloremque cum quos quae mollitia dolor. Quisquam incidunt minus ea corrupti laboriosam.</p>
                    <Link to="/services" className="btn btn-primary">Lista WIP</Link>
                </div>
            </Col>
        </Row>
    );
};

export default Welcome;
