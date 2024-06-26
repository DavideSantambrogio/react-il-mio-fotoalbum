import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardTitle, CardText, Button, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ReceivedEmails from '../components/ReceivedEmails';

const PersonalAreaPage = () => {
    const { token, logout } = useAuth();
    const navigate = useNavigate();
    const [photos, setPhotos] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotos = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/photos', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setPhotos(response.data);
            } catch (error) {
                setError('Failed to fetch photos.');
            }
        };

        fetchPhotos();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/api/photos/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setPhotos(photos.filter(photo => photo.id !== id));
        } catch (error) {
            setError('Failed to delete photo.');
        }
    };

    const handleUpdate = (id) => {
        // Implement update logic here
    };

    const handleLogout = () => {
        logout(); // Esegui il logout utilizzando il metodo dal contesto
        navigate('/'); // Reindirizza alla pagina principale dopo il logout
    };

    return (
        <Container>
            <h2 className="text-center my-4">Personal Area</h2>
            {error && <p className="text-danger">{error}</p>}
            <Row>
                <Col md={4}>

                </Col>

                <Col md={4}>
                    {photos.map((photo) => (
                        <Card key={photo.id} className="mb-4">
                            <CardBody>
                                <CardTitle tag="h5">{photo.title}</CardTitle>
                                <img src={photo.image} alt={photo.title} className="img-fluid" />
                                <CardText>{photo.description}</CardText>
                                <CardText><small>Created At: {new Date(photo.createdAt).toLocaleString()}</small></CardText>
                                <CardText><small>Updated At: {new Date(photo.updatedAt).toLocaleString()}</small></CardText>
                                <Button color="danger" onClick={() => handleDelete(photo.id)}>Delete</Button>
                                <Button color="warning" className="ml-2" onClick={() => handleUpdate(photo.id)}>Update</Button>
                            </CardBody>
                        </Card>
                    ))}
                </Col>

                <Col md={4}>
                    <ReceivedEmails/>
                    <Button color="secondary" onClick={handleLogout} className="mt-4">Logout</Button>
                </Col>

            </Row>
        </Container>
    );
};

export default PersonalAreaPage;
