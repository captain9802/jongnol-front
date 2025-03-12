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
        <Typography variant="PCT" className='card__content__title'>{title}</Typography>
        <Typography variant="PCE" className='card__content__description'>{description}</Typography>
      </Box>
    </Paper>
  );
};

export default Card;
