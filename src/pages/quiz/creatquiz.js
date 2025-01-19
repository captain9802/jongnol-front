import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Box, Button } from '@mui/material';
import '../../styles/quiz/CreateQuiz.scss';
import QuizNavigator from '../../components/quiznavigator';
import QuizDialog from '../../components/quizdialog';
import QuizForm from '../../components/quizform';

const Creatquiz = () => {
  const navi = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);

  const [currentQuiz, setCurrentQuiz] = useState(1);
  const [quizzes, setQuizzes] = useState({});

  useEffect(() => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      navi('/login');
    }
  }, [isLogin, navi]);

  const handleQuizChange = (newQuizNumber) => {
    setCurrentQuiz(newQuizNumber);
  };

  const handleNextQuiz = () => {
    setCurrentQuiz((prevQuiz) => {
      const nextQuiz = prevQuiz + 1;
      handleQuizChange(nextQuiz);
      return nextQuiz;
    });
  };

  const handleBackQuiz = () => {
    setCurrentQuiz((prevQuiz) => {
      const nextQuiz = prevQuiz - 1;
      if (nextQuiz < 1) {
        alert("첫 번째 문제입니다.");
        return prevQuiz;
      }
      handleQuizChange(nextQuiz);
      return nextQuiz;
    });
  };

  return (
    <Box className="creatquiz">
      <QuizDialog />
      <QuizNavigator 
        currentQuiz={currentQuiz}
        onQuizChange={handleQuizChange}
      />
      <QuizForm
        currentQuiz={currentQuiz}
        quizzes={quizzes}
        setQuizzes={setQuizzes}  // quizzes와 setQuizzes를 전달
      />
      <Box className="creatquiz__buttonbox">
        <Box className="creatquiz__buttons">
          <Button
            className="creatquiz__button"
            color="inherit"
            variant="contained"
            size="small"
            onClick={handleBackQuiz}
          >
            이전 문제
          </Button>
          <Button
            className="creatquiz__button"
            color="inherit"
            variant="contained"
            size="small"
            onClick={handleNextQuiz}
          >
            다음 문제
          </Button>
          <Button
            className="creatquiz__button"
            color="inherit"
            variant="contained"
            size="small"
          >
            등록하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Creatquiz;
