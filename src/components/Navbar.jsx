import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Car Listing App
        </Typography>
        <Box>
          <Button color="inherit">About Us</Button>
          <Button color="inherit">Contact Us</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
