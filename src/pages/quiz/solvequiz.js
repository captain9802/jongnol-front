import React, { useEffect, useState } from 'react';
import '../../styles/quiz/SolveQuiz.scss';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { completeQuiz } from '../../apis/quizApi';
import { useNavigate, useParams } from 'react-router-dom';
import SubmitAlert from '../../components/alert/submitAlert';

const SolveQuiz = () => {
  const quiz = useSelector((state) => state.quiz.solvequiz);  
  const { id } = useParams();
  const disPatch = useDispatch();
  const navi = useNavigate();
  const {submitAlert} = SubmitAlert();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => {
    const savedIndex = localStorage.getItem('currentQuestionIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });

  const storedAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || {};
  const [quizAnswers, setQuizAnswers] = useState(storedAnswers);
    
  useEffect(() => {
    if (quiz.length > 0 && quiz.length !== Object.keys(storedAnswers).length) {
      setQuizAnswers(
        quiz.reduce((acc, question) => {
          acc[question.id] = null;
          return acc;
        }, {})
      );
      localStorage.removeItem('quizAnswers');
      setCurrentQuestionIndex(0);
    }
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
  }, [quiz, currentQuestionIndex]);

  const handleAnswerSelection = (questionId, answer) => {
    const updatedAnswers = { ...quizAnswers, [questionId]: answer };
    setQuizAnswers(updatedAnswers);
    localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers));

    handleNextQuestion(true);
  };

  const handleNextQuestion = (isAnswered = false) => {
    if (currentQuestionIndex !== quiz.length) {
      if (isAnswered) {
      if (currentQuestionIndex < quiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
    }
  };

  const handleSubmit = () => {
    const unansweredQuestions = Object.keys(storedAnswers).filter(
      (key) => storedAnswers[key] === null
    );

    if(unansweredQuestions.length > 0 || Object.keys(storedAnswers).length === 0) {
      const question = quiz.find(q => q.id === parseInt(unansweredQuestions, 10));
      const questionNumber = quiz.indexOf(question) + 1;
      if(Object.keys(storedAnswers).length === 0) {
        alert(`1번의 문제 정답을 작성해주세요.`);
        return;
      }
      alert(`${questionNumber}의 문제 정답을 작성해주세요.`);
      return;
    } else {
      submitAlert({
        title: '퀴즈를 제출하시겠습니까?',        
     }).then(result => {
        if (result.isConfirmed) {
          // SubmitAlert('승인이 완료되었습니다.', '화끈하시네요~!', 'success');
           disPatch(completeQuiz(quizAnswers));
           navi(`/resultquiz/${id}`);
        }
     });
    }
  };

  const handleInputChange = (e, questionId) => {
    const updatedAnswers = { ...quizAnswers, [questionId]: e.target.value };
    setQuizAnswers(updatedAnswers);
    localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers));

    if (e.key === 'Enter') {
      if (currentQuestionIndex !== quiz.length - 1) {
        handleNextQuestion();
      }
    }
  };

  const currentQuestion = quiz[currentQuestionIndex];

  const shuffleArray = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  };

  return (
    <Box className="solvequiz">
      <Box className="solvequiz__boxes">
        <Box className="solvequiz__boxes__buttons">
          {quiz.map((question, idx) => (
            <Button
              color='primary'
              variant="contained"
              size="size"
              className={`solvequiz__boxes__button ${
                question === currentQuestion ? 'solvequiz__boxes__button--active' : ''
              }`}
              key={question.id}
              onClick={() => setCurrentQuestionIndex(idx)}
            >
              문제 {idx + 1}
            </Button>
          ))}
        </Box>

        <Typography 
          variant="BT"
          className="solvequiz__boxes__title">{currentQuestion ? `${currentQuestionIndex + 1}. ${currentQuestion.subtitle}` : "문제가 없음"}
        </Typography>
        <Box className={currentQuestion && currentQuestion.type === 0 ? "solvequiz__boxes__content" : "solvequiz__boxes__contents"}>
          {currentQuestion && currentQuestion.imageBox && (
            <Box className="solvequiz__boxes__content__img">
              <img 
                className="solvequiz__boxes__content__img--question"
                src={currentQuestion.imageBox} alt="question" />
            </Box>
          )}

          {currentQuestion && currentQuestion.type === 0 ? (
            <Box className="solvequiz__boxes__content__multi">
              <Box className="solvequiz__boxes__content__multi--box">
              {shuffleArray([
                ...currentQuestion.fanswers,
                currentQuestion.tanswer,
              ]).map((answer, idx) => (
                <Button
                  color='primary'
                  variant="contained"
                  size="size"
                  key={idx}
                  onClick={() => handleAnswerSelection(currentQuestion.id, answer)}
                  className={storedAnswers[currentQuestion.id] === answer ? 'selected' : 'non'}
                >
                  {answer}
                </Button>
              ))}
              </Box>
            </Box>
          ) : currentQuestion ? (
            <Box
              className="solvequiz__boxes__contents__subjective"
            >
              <Box className="solvequiz__boxes__contents__subjective--box">
                <TextField
                  className="solvequiz__boxes__contents__subjective--textfeild"
                  label="답을 입력해주세요."
                  value={storedAnswers[currentQuestion.id] || ''}
                  onChange={(e) => handleInputChange(e, currentQuestion.id)}
                  onKeyDown={(e) => handleInputChange(e, currentQuestion.id)}
                />
              </Box>
            </Box>
          ) : <Box>
            문제를 불러오는 도중 오류가 발생했습니다.
            </Box>}
          </Box>
          <Box className="solvequiz__boxes__submit">
            {currentQuestionIndex === quiz.length - 1 && (
              <Button 
                className="solvequiz__boxes__submit--button"
                variant="contained"
                size="size"
                onClick={handleSubmit}>제출하기</Button>
            )}
          </Box>
      </Box>
    </Box>
  );
};

export default SolveQuiz;
