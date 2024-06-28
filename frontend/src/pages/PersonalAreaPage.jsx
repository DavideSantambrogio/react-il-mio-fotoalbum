import React, { useEffect, useState } from 'react';
import { Container, Card, CardBody, CardTitle, CardText, Button, Row, Col } from 'reactstrap';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const PersonalAreaPage = () => {
  const { token } = useAuth();
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

  return (
    <Container>
      <h2 className="text-center my-4">Personal Area</h2>
      {error && <p className="text-danger">{error}</p>}
      <Row>
        {photos.map((photo) => (
          <Col key={photo.id} sm="6" md="4" lg="3">
            <Card className="mb-4">
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
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default PersonalAreaPage;
