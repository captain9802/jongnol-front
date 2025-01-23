import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, IconButton, Menu, MenuItem, Grid2 } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '../../components/card';
import '../../styles/home/Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getQuiz } from '../../apis/quizApi';

const Home = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quiz.quizzes);

  const [anchorEl, setAnchorEl] = useState(null);
  const [visibleCards, setVisibleCards] = useState(9);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchCondition, setSearchCondition] = useState("최신순");

  useEffect(() => {
    dispatch(getQuiz({ searchCondition: 'title', searchKeyword: 'all' }));
  }, [dispatch, searchCondition]);

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const windowHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= windowHeight - 5) {
      setVisibleCards((prev) => Math.min(prev + 6, quizzes.length));
    }
  }, [quizzes]);

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

  const handleSearchKeywordChange = (event) => {
    setSearchKeyword(event.target.value);
  };

  const handleSearchConditionChange = (condition) => {
    setSearchCondition(condition);
    handleClose();
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      dispatch(getQuiz({ searchCondition: 'title', searchKeyword }));
    }
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
          value={searchKeyword}
          onChange={handleSearchKeywordChange}
          onKeyPress={handleKeyPress}
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
          <MenuItem onClick={() => handleSearchConditionChange('최신순')}>최신순</MenuItem>
        </Menu>
      </Box>
      <Grid2 container spacing={2} className="home__grid">
        {quizzes
          .slice(0, visibleCards)
          .map((card, index) => (
            <Grid2 item key={index} className="home__grid-item">
              <Card
                image={card.thumbnail}
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
