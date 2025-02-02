import { Box, Grid2, Paper } from '@mui/material'
import React, { useEffect, useState } from 'react'
import '../../styles/mypage/Mypage_MyQuiz.scss';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { getQuiz } from '../../apis/quizApi';
import Card from '../../components/card';

const MyQuiz = () => {
    const quizzes = useSelector((state) => state.quiz.quizzes);

    const dispatch = useDispatch();

    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [questionCount, setQuestionCount] = useState(0);

    useEffect(() => {
        dispatch(getQuiz({ searchCondition: 'title', searchKeyword: 'all', offset : 0, limit : 100}));
        console.log(quizzes);
    },[])

    const handleCardClick = (quiz) => {
        console.log("??");
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
        {quizzes.map((card, index) => (
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
