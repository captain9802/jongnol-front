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

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      navi('/login');
    }
  }, [isLogin, navi]);

  const deleteData = () => {
    if (currentQuiz === 1) {
      alert('1번 퀴즈는 삭제할 수 없습니다.');
      return;
    }
  
    const newQuizData = JSON.parse(localStorage.getItem('newquiz')) || { questions: [] };
  
    if (window.confirm((`현재 작성 중인 ${currentQuiz}번 퀴즈가 삭제됩니다. 괜찮으시겠습니까?`))) {
      if (currentQuiz !== newQuizData.questions.length) {
        for (let i = currentQuiz; i < newQuizData.questions.length; i++) {
          newQuizData.questions[i].quizNumber -= 1;
        }
      }
    
      newQuizData.questions.splice(currentQuiz - 1, 1);
    
      localStorage.setItem('newquiz', JSON.stringify(newQuizData));
    
      setQuizzes((prevQuizzes) => {
        const newQuizzes = prevQuizzes.slice(0, -1);
    
        if (currentQuiz === prevQuizzes.length) {
          handleQuizChange(currentQuiz - 1);
        }
    
        return newQuizzes;
      });
    
      alert('퀴즈가 삭제되었습니다.');
      } else {
        alert('취소되었습니다.')
      }
  };
  
  

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
        quizzes={quizzes}
        setQuizzes={setQuizzes}
        deleteData={deleteData}
      />
      <QuizForm
        currentQuiz={currentQuiz}
        onQuizChange={handleQuizChange}
        setQuizzes={setQuizzes}
        deleteData={deleteData}
        quizzes={quizzes}
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
            className="creatquiz__submitbutton"
            color="inherit"
            variant="contained"
            size="small"
          >
            퀴즈 등록하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Creatquiz;
