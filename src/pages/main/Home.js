import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, IconButton, Menu, MenuItem, Grid2 } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '../../components/card';
import '../../styles/home/Home.scss';

const Home = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [cardData, setCardData] = useState([]);
  const [visibleCards, setVisibleCards] = useState(9);

  const generateCardData = (num) => {
    return new Array(num).fill(null).map((_, index) => ({
      image: 'ex.png',
      title: `안녕하세요 ${index + 1}`,
      description: '안녕하세요 여러분~~메롱입니다~',
    }));
  };

  useEffect(() => {
    setCardData(generateCardData(20));
  }, []);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const windowHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= windowHeight - 5) {
      setVisibleCards((prev) => Math.min(prev + 6, cardData.length));
    }
  }, [cardData]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box className="home">
      <Box className="home__logo">
        <img src='logo/4.png' alt='logo' />
      </Box>
      <Box className="home__search-container">
        <TextField
          variant="outlined"
          placeholder="원하는 퀴즈를 입력해주세요."
          sx={{
            flexGrow: 1,
            height: '50px',
          }}
          InputProps={{
            startAdornment: (
              <IconButton sx={{ p: '10px' }}>
                <SearchIcon />
              </IconButton>
            ),
            endAdornment: (
              <IconButton onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
            ),
          }}
        />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>최신순</MenuItem>
          <MenuItem onClick={handleClose}>조회순</MenuItem>
        </Menu>
      </Box>
      <Grid2 container spacing={2} className="home__grid">
        {cardData.slice(0, visibleCards).map((card, index) => (
          <Grid2 item key={index} className="home__grid-item">
            <Card
              image={card.image}
              title={card.title}
              description={card.description}
            />
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default Home;
