import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardImg, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const RecentPosts = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/photos');
        const data = response.data;

        const sortedPhotos = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const latestPhotos = sortedPhotos.slice(0, 6);

        setPhotos(latestPhotos);
      } catch (error) {
        console.error('Errore nel recupero delle foto:', error);
      }
    };

    fetchPhotos();
  }, []);

  return (
    <div>
      <h3 className="text-center mb-4">Ultimi Post Pubblicati</h3>
      <Row>
        {photos.map(photo => (
          <Col key={photo.id} md={4} className="mb-4">
            <Card>
              <CardImg top width="100%" src={photo.image} alt={photo.title} />
              <CardBody>
                <CardTitle tag="h5">{capitalizeFirstLetter(photo.title)}</CardTitle>
              </CardBody>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="text-center">
        <Link to="/services" className="btn btn-primary">Vai a tutti WIP</Link>
      </div>
      
    </div>
  );
};

export default RecentPosts;
