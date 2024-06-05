import React from 'react';
import CarList from './components/CarList';
import Navbar from './components/Navbar';
import { Container, Typography } from '@mui/material';
import './App.css';

function App() {
  return (
    <div>
      <Navbar />
      <Container className="container">
        <Typography  variant="h4" align="center" gutterBottom>
          Get Your Favourite Cars Here 
        </Typography>
        <CarList />
      </Container>
    </div>
  );
}

export default App;
