import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import '../App.css';

const CarItem = ({ car }) => {
  return (
    <Card className="card">
      <CardContent className="card-content">
        <Typography variant="h5">{car.car} {car.car_model}</Typography>
        <Typography color="textSecondary">Color: {car.car_color}</Typography>
        <Typography color="textSecondary">Year: {car.car_model_year}</Typography>
        <Typography color="textSecondary">VIN: {car.car_vin}</Typography>
        <Typography color="textSecondary">Price: {car.price}</Typography>
        <Typography className={car.availability ? 'availability' : 'not-available'}>
          {car.availability ? 'Available' : 'Not Available'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default CarItem;
