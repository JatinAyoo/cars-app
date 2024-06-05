import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CarItem from './CarItem';
import SearchBar from './SearchBar';

import { Container, Grid, Pagination, Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
import '../App.css';

const CarList = () => {
  // States for managing cars, search query, pagination, sorting, and availability filter
  const [cars, setCars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState('');
  const [sortDirection, setSortDirection] = useState('asc');
  const [showAvailable, setShowAvailable] = useState(false);
  const carsPerPage = 30;

  // Fetch cars data from the API
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "https://myfakeapi.com/api/cars/",
          {
            token: "dummy", 
          },
          {
            "Content-Type": "application/json",
          }
        );
        const limitedCars = response.data.cars.slice(0, 300); // Get the first 300 cars
        setCars(limitedCars);
      } catch (error) {
        console.error("Error fetching the cars data:", error);
      }
      setSortOption("none");
    };

    fetchCars();
  }, []);

  // Handler for changing the sort option
  const handleSortChange = (event) => {
    setSortOption(event.target.value);
    setSortDirection('asc'); // Reset sort direction when changing the sort option
    sortCars(event.target.value, 'asc');
  };

  // Handler for toggling the sort direction
  const handleSortDirectionToggle = () => {
    const newDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    setSortDirection(newDirection);
    sortCars(sortOption, newDirection);
  };

  // Function to sort the cars based on the selected option and direction
  const sortCars = (option, direction) => {
    let sortedCars = [...cars];
    if (option === 'price') {
      sortedCars.sort((a, b) => {
        const priceA = parseFloat(a.price.replace('$', ''));
        const priceB = parseFloat(b.price.replace('$', ''));
        return direction === 'asc' ? priceA - priceB : priceB - priceA;
      });
    } else if (option === 'year') {
      sortedCars.sort((a, b) => {
        return direction === 'asc' ? a.car_model_year - b.car_model_year : b.car_model_year - a.car_model_year;
      });
    }
    setCars(sortedCars);
  };

  // Handler for toggling the availability filter
  const handleShowAvailableToggle = () => {
    setShowAvailable(!showAvailable);
  };

  // Filter and paginate the cars based on search query and availability
  const filteredCars = cars.filter(car =>
    (car.car.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.car_model.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.car_color.toLowerCase().includes(searchQuery.toLowerCase()) ||
    car.car_model_year.toString().includes(searchQuery)) &&
    (!showAvailable || car.availability)
  );

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = filteredCars.slice(indexOfFirstCar, indexOfLastCar);

  // Handler for changing the page
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Container>
      {/* Search bar component */}
      <Box sx={{ textAlign: 'center', margin: '20px 0' }}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} carData={cars} />
      </Box>
      {/* Sort and filter controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <Box>
          <FormControl variant="outlined">
            <InputLabel>Sort By</InputLabel>
            <Select value={sortOption} onChange={handleSortChange} label="Sort By">
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="price">Price</MenuItem>
              <MenuItem value="year">Year</MenuItem>
            </Select>
          </FormControl>
          {/* Display sort direction toggle only if an option other than 'None' is selected */}
          {sortOption !== 'none' && (
            <Button
              variant="outlined"
              className="sort-button"
              onClick={handleSortDirectionToggle}
            >
              {sortDirection === 'asc' ? 'Ascending' : 'Descending'}
            </Button>
          )}
        </Box>
        <Button variant="contained" onClick={handleShowAvailableToggle}>
        {showAvailable ? 'Show All Cars' : 'Show Available Cars'}
        </Button>
      </Box>
      <Grid container spacing={2}>
        {currentCars.map(car => (
          <Grid item xs={12} sm={6} md={4} key={car.id}>
            <CarItem car={car} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
        <Pagination
          count={Math.ceil(filteredCars.length / carsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </Container>
   
  );
};

export default CarList;