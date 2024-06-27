import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Card, CardImg, CardBody, CardTitle } from 'reactstrap';
import axios from 'axios';

const TopCategories = () => {
  const [topCategories, setTopCategories] = useState([]);
  const [photosByCategory, setPhotosByCategory] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetching categories
        const categoriesResponse = await axios.get('http://localhost:3000/api/categories');
        const categories = categoriesResponse.data;

        // Fetching photos
        const photosResponse = await axios.get('http://localhost:3000/api/photos');
        const photos = photosResponse.data;

        // Group photos by category
        const categorizedPhotos = {};
        photos.forEach(photo => {
          if (!categorizedPhotos[photo.categoryId]) {
            categorizedPhotos[photo.categoryId] = [];
          }
          categorizedPhotos[photo.categoryId].push(photo);
        });

        // Set state for photosByCategory
        setPhotosByCategory(categorizedPhotos);

        // Sort categories by number of photos in descending order
        const sortedCategories = categories.sort((a, b) => {
          const photosA = categorizedPhotos[a.id] ? categorizedPhotos[a.id].length : 0;
          const photosB = categorizedPhotos[b.id] ? categorizedPhotos[b.id].length : 0;
          return photosB - photosA;
        });

        // Take top 3 categories
        const topThreeCategories = sortedCategories.slice(0, 3);

        // Set state for topCategories
        setTopCategories(topThreeCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <h3 className='text-center'>Top Categories LINK WIP</h3>
      <Link to="/">
        <Row>
          {topCategories.map(category => (
            <Col key={category.id} md={4}>
              <Card className="mb-3 ">
                {photosByCategory[category.id] && photosByCategory[category.id].length > 0 && (
                    <div className='ratio ratio-16x9'>
                        <CardImg className='object-fit-cover' top width="100%" src={photosByCategory[category.id][0].image} alt={photosByCategory[category.id][0].title} />
                    </div>
                  
                )}
                <CardBody>
                  <CardTitle className='text-center' tag="h5">{category.name}</CardTitle>
                </CardBody>
              </Card>
            </Col>
          ))}
        </Row>
      </Link>
    </>
  );
};

export default TopCategories;
