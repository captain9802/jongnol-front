import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import '../styles/card/Card.scss';

const Card = ({ image, title, description }) => {
  return (
    <Paper className="card">
      <Box className="card__image-container">
        <img
          src={image}
          alt="description"
          className="card__image"
        />
      </Box>
      <Box className="card__content">
        <Typography variant="PCT">{title}</Typography>
        <Typography variant="PCE">{description}</Typography>
      </Box>
    </Paper>
  );
};

export default Card;
