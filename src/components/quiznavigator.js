import React, { useState,useEffect } from 'react';
import '../styles/quiz/QuizNavigator.scss';

const QuizNavigator = ({ currentQuiz , onQuizChange , quizzes, setQuizzes, deleteData}) => {

  useEffect(() => {

    if (currentQuiz > quizzes.length) {
      handleAddQuiz();
    }
  }, [currentQuiz]);

  useEffect(() => {
    const storedQuizData = JSON.parse(localStorage.getItem('newquiz')) || { questions: [] };
    console.log(storedQuizData);
    if (storedQuizData.questions.length === 0) {
      setQuizzes([1, 2, 3]);
    } else {
      const quizCount = storedQuizData.questions.length;
      const quizzesFromStorage = Array.from({ length: quizCount }, (_, i) => i + 1);
      setQuizzes(quizzesFromStorage);
    }
    onQuizChange(1);
  }, []);

  const handleQuizChange = (quizNumber) => {
    if (onQuizChange) {
      onQuizChange(quizNumber);
    }
  };

  const handleAddQuiz = () => {
    if (quizzes.length < 50) {
      setQuizzes((prevQuizzes) => {
        const newQuizzes = [...prevQuizzes, prevQuizzes.length + 1];
        handleQuizChange(newQuizzes.length);
        return newQuizzes;
      });
    } else {
      alert('최대 50개의 퀴즈만 추가할 수 있습니다.');
      handleQuizChange(quizzes.length);
    }
  };

  return (
    <div className="quiz-navigator">
      <div className="quiz-navigator__buttons">
      <button className="quiz-navigator__button quiz-navigator__button--remove" onClick={deleteData}>
          -
        </button>
        {quizzes.map((quiz) => (
          <button
          key={quiz}
          className={`quiz-navigator__button ${
            quiz === currentQuiz ? 'quiz-navigator__button--active' : ''
          }`}
          onClick={() => handleQuizChange(quiz)}
        >
          {quiz}
        </button>
        ))}
        <button className="quiz-navigator__button quiz-navigator__button--add" onClick={handleAddQuiz}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuizNavigator;
