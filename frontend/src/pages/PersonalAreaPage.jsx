import React from 'react';
import { Container, Button } from 'reactstrap';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const PersonalAreaPage = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to logout:', error);
    }
  };

  return (
    <Container>
      <h2 className="text-center my-4">Personal Area</h2>
      <Button color="danger" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  );
};

export default PersonalAreaPage;
