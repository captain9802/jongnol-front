import React, { useState, useEffect, useCallback } from 'react';
import { Box, TextField, IconButton, Menu, MenuItem, Grid2 } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Card from '../../components/card';
import '../../styles/home/Home.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getQuiz } from '../../apis/quizApi';
import { useLocation } from 'react-router-dom';
import InQuiz from '../../components/inquiz';
import { motion } from 'framer-motion';

const Home = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quiz.quizzes);
  const hasMore = useSelector((state) => state.quiz.hasMore);
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState(location.state?.searchKeyword || '');
  const [searchCondition, setSearchCondition] = useState(location.state?.searchCondition || "최신순");
  const [prevSearchKeyword, setPrevSearchKeyword] = useState("");
  const [offset, setOffset] = useState(0);
  const [limit] = useState(28);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);
  let debounceTimeout = null;

  useEffect(() => {
    console.log("1번번")
    console.log("hasmore :" + hasMore);
    console.log("searchKeyword :" + searchKeyword);
    console.log("searchCondition :" + searchCondition);
    console.log("prevSearchKeyword :" + prevSearchKeyword);

    console.log("offset :" + offset);
    console.log("limit :" + limit);
    console.log("quizzes :" + quizzes);

    if (!hasMore) return;
      const keywordToUse = (searchKeyword || '').trim() === '' ? 'all' : searchKeyword;
      dispatch(getQuiz({ searchCondition: 'title', searchKeyword: keywordToUse, offset, limit }));
      
  }, [dispatch, searchCondition, offset]);

  const handleScroll = useCallback(() => {

    if (!hasMore) return;

    const scrollPosition = window.scrollY + window.innerHeight;
    const windowHeight = document.documentElement.scrollHeight;

    if (scrollPosition >= windowHeight - 600) {
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
  
      debounceTimeout = setTimeout(() => {
        setOffset((prevOffset) => prevOffset + limit);
      }, 100);
    }    
  }, [hasMore, limit]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
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
    console.log("searchKeyword : " + searchKeyword);
    if (event.key === 'Enter') {
      if (searchKeyword === prevSearchKeyword) {
        alert("동일한 검색어입니다.");
        return;
    }
      const keyword = searchKeyword.trim() === '' ? 'all' : searchKeyword;
      setPrevSearchKeyword(keyword);
      setOffset(0);
      dispatch(getQuiz({ searchCondition: 'title', searchKeyword: keyword, offset : 0, limit}));
    }
  };

  const handleCardClick = (quiz) => {
    console.log("??");
    setSelectedQuiz(quiz);
    setQuestionCount(quiz.questionsCount);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleStartQuiz = (questionCount) => {
    console.log(`퀴즈 시작 - 문제 수: ${questionCount}`);
    setDialogOpen(false);
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)', 
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
      transition: { 
        delay: i * 0.05, 
        duration: 0.5,
      },
    }),
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
          <Grid2 item key={index} onClick={() => handleCardClick(card)}>
             <motion.div
             className="home__grid-item"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={cardVariants}
              onAnimationComplete={() => console.log(card.id)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.1 }}
            >
            <Card
              className="home__gird-item-card"
              image={card.thumbnail}
              title={card.title}
              description={card.description}
            />
            </motion.div>
          </Grid2>
        ))}
      </Grid2>
      {selectedQuiz && (
        <InQuiz
          open={dialogOpen}
          onClose={handleCloseDialog}
          onStart={handleStartQuiz}
          quizData={selectedQuiz}
          questionCount={questionCount}
        />
      )}
    </Box>
  );
};

export default Home;
