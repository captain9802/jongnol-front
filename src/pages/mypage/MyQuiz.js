import { Box, Grid2, Paper } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import '../../styles/mypage/Mypage_MyQuiz.scss';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getMyQuiz } from '../../apis/quizApi';
import Card from '../../components/card';

const MyQuiz = () => {
    const {myquizzes, myquizhasMore} = useSelector((state) => state.quiz);

    const dispatch = useDispatch();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [questionCount, setQuestionCount] = useState(0);
    const [offset, setOffset] = useState(0);
    const [limit] = useState(20);
    let debounceTimeout = null;

    useEffect(() => {
      if(!myquizhasMore) return;
        dispatch(getMyQuiz({offset, limit}));
        console.log("offset : " + offset);
    },[offset])

    const handleScroll = useCallback(() => {
        
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
      }, [limit]);
    
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
          if (debounceTimeout) {
            clearTimeout(debounceTimeout);
          }
        };
      }, [handleScroll]);

    const handleCardClick = (quiz) => {
        setSelectedQuiz(quiz);
        setQuestionCount(quiz.questionsCount);
        setDialogOpen(true);
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
    <Box className="myquiz">
      <Paper className="myquiz_info">
      <Grid2 container spacing={9} className="myquiz_info__grid">
        {myquizzes.map((card, index) => (
          <Grid2 item key={index} onClick={() => handleCardClick(card)}>
             <motion.div
             className="myquiz_info__grid-item"
              initial="hidden"
              animate="visible"
              custom={index}
              variants={cardVariants}
              onAnimationComplete={() => console.log(card.id)}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.1 }}
            >
            <Card
              className="myquiz__gird-item-card"
              image={card.thumbnail}
              title={card.title}
              description={card.description}
            />
            </motion.div>
          </Grid2>
        ))}
      </Grid2>
        </Paper>
    </Box>
  )
}

export default MyQuiz
