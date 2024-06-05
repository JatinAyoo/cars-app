import React, { useState, useEffect } from 'react';
import { TextField, Paper, Typography } from '@mui/material';

const SearchBar = ({ searchQuery, setSearchQuery, carData }) => {
  // State to store autocomplete suggestions
  const [suggestions, setSuggestions] = useState([]); 

  // State to store matched prefix of suggestion
  const [matchedPrefix, setMatchedPrefix] = useState(''); 

  // Function to handle input change in the search field
  const handleInputChange = (event) => {
    const input = event.target.value.toLowerCase();
    setSearchQuery(input);
    if (input === '') {
      // Clear suggestions if input is empty
      setSuggestions([]);
      return;
    }
    // Generate autocomplete suggestions based on carData
    const autocompleteSuggestions = carData
      .flatMap((car) => [car.car.toLowerCase(), car.car_model.toLowerCase(), car.car_color.toLowerCase(), car.car_model_year.toString()])
      .filter((word) => word.startsWith(input));
    // Find the first suggestion that matches the input prefix
    const matched = autocompleteSuggestions.find((suggestion) => suggestion.startsWith(input));
    if (matched) {
      setMatchedPrefix(matched.substring(0, input.length)); // Set the matched prefix
    } else {
      setMatchedPrefix(''); // Reset the matched prefix
    }
    setSuggestions(autocompleteSuggestions); // Set autocomplete suggestions
  };

  // Function to handle click on a suggestion
  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion); // Set search query to clicked suggestion
    setSuggestions([]); // Clear suggestions
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* Search input field */}
      <TextField
        label="Search"
        variant="outlined"
        value={searchQuery}
        onChange={handleInputChange}
        fullWidth
      />
      {/* Autocomplete suggestions */}
      {suggestions.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            zIndex: 10,
            marginTop: '8px',
            left: 0,
            right: 0,
            padding: '8px',
            backgroundColor: 'white',
            boxShadow: '0px 3px 5px rgba(0,0,0,0.1)',
          }}
        >
          {/* Render each suggestion */}
          <div
            onClick={() => handleSuggestionClick(suggestions[0])}
            sx={{
              padding: '8px',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: '#f0f0f0',
              },
            }}
          >
            <Typography>
              {matchedPrefix}
              <span style={{ color: 'grey' }}>{suggestions[0].substring(matchedPrefix.length)}</span>
            </Typography>
          </div>
        </Paper>
      )}
    </div>
  );
};

export default SearchBar;
