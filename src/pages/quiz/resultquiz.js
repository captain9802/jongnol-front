import { Box, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';

const Resultquiz = () => {
    const resultquiz = useSelector((state) => state.quiz.resultquiz);  

    useEffect(() => {
        console.log(resultquiz);
    }, [resultquiz]);

  return (
    <Box>
      {Object.entries(resultquiz).map(([questionId, isCorrect]) => (
        <Box key={questionId}>
          <Typography variant='BT'>번호 : {questionId}</Typography>
          <Typography variant='BT'>정답 : {isCorrect ? 'O' : 'X'}</Typography>
        </Box>
      ))}
    </Box>
  )
}

export default Resultquiz;
