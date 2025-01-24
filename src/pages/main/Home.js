import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, IconButton, Menu, MenuItem, Grid2 } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '../../components/card';
import '../../styles/home/Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getQuiz } from '../../apis/quizApi';
import { useLocation } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const hasMore = useSelector((state) => state.quiz.hasMore);
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(location.state?.searchKeyword || '');
  const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || "최신순");
  const [offset, setOffset] = useState(0);
  const [limit] = useState(20);

  useEffect(() => {
    console.log(hasMore);
    if (!hasMore) return;
      const keywordToUse = (searchKeyword || '').trim() === '' ? 'all' : searchKeyword;
      dispatch(getQuiz({ searchCondition: 'title', searchKeyword: keywordToUse, offset, limit }));
  }, [dispatch, searchCondition, offset]);

  const handleScroll = useCallback(() => {
    if (!hasMore) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const windowHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= windowHeight - 5) {
      setOffset((prevOffset) => prevOffset + limit);
    }
  }, [hasMore, limit]);

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
      const keyword = searchKeyword.trim() === '' ? 'all' : searchKeyword;
      dispatch(getQuiz({ searchCondition: 'title', searchKeyword: keyword, offset, limit }));
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
        {quizzes.map((card, index) => (
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
