import React, { useEffect, useState } from 'react';
import { Box, Typography, Button, TextField } from '@mui/material';
import { useSelector } from 'react-redux';

const SolveQuiz = () => {
  const quiz = useSelector((state) => state.quiz.solvequiz);
  
  const [quizAnswers, setQuizAnswers] = useState(
    quiz.reduce((acc, question) => {
      acc[question.id] = null;
      return acc;
    }, {})
  );
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    console.log(quiz);
    console.log(quiz.length);
  }, [quiz]);

  const handleAnswerSelection = (questionId, answer) => {
    const updatedAnswers = { ...quizAnswers, [questionId]: answer };
    setQuizAnswers(updatedAnswers);
    localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers));

    handleNextQuestion(true);
  };

  const handleNextQuestion = (isAnswered = false) => {
    if (currentQuestionIndex === quiz.length - 1) {
      if (isAnswered) {
        const submit = window.confirm("퀴즈를 제출하시겠습니까?");
        if (submit) {
          handleSubmit();
        }
      }
    } else {
      if (currentQuestionIndex < quiz.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }
  };

  const handleSubmit = () => {
    const unansweredQuestions = quiz.filter(
      (q) => quizAnswers[q.id] === null && q.type !== 1
    );
    if (unansweredQuestions.length > 0) {
      alert(`${unansweredQuestions[0].id}의 정답을 제출해주세요.`);
    } else {
      console.log('정답 제출:', quizAnswers);
    }
  };

  const handleInputChange = (e, questionId) => {
    const updatedAnswers = { ...quizAnswers, [questionId]: e.target.value };
    setQuizAnswers(updatedAnswers);
    localStorage.setItem('quizAnswers', JSON.stringify(updatedAnswers));

    if (e.key === 'Enter') {
      if (currentQuestionIndex === quiz.length - 1) {
        const submit = window.confirm("퀴즈를 제출하시겠습니까?");
        if (submit) {
          handleSubmit();
        }
      } else {
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
    <Box>
      <Box>
        <Box>
          {quiz.map((question, idx) => (
            <Button
              key={question.id}
              onClick={() => setCurrentQuestionIndex(idx)}
            >
              문제 {idx + 1}
            </Button>
          ))}
        </Box>

        <Typography variant="BT">{currentQuestion ? currentQuestion.subtitle : "문제가 없음"}</Typography>

        {currentQuestion.image && (
          <Box>
            <img src={currentQuestion.image} alt="question" />
          </Box>
        )}

        {currentQuestion.type === 0 ? (
          <Box>
            {shuffleArray([
              ...currentQuestion.fanswers,
              currentQuestion.tanswer,
            ]).map((answer, idx) => (
              <Button
                key={idx}
                onClick={() => handleAnswerSelection(currentQuestion.id, answer)}
              >
                {answer}
              </Button>
            ))}
          </Box>
        ) : (
          <Box>
            <TextField
              label="답을 입력하세요"
              value={quizAnswers[currentQuestion.id] || ''}
              onChange={(e) => handleInputChange(e, currentQuestion.id)}
              onKeyDown={(e) => handleInputChange(e, currentQuestion.id)}
            />
          </Box>
        )}

        {currentQuestionIndex === quiz.length - 1 && (
          <Button onClick={handleSubmit}>제출하기기</Button>
        )}
      </Box>
    </Box>
  );
};

export default SolveQuiz;
