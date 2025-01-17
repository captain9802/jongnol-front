import React, { useState,useEffect } from 'react';
import '../styles/quiz/QuizNavigator.scss';

const QuizNavigator = ({ currentQuiz , onQuizChange }) => {
  const [quizzes, setQuizzes] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    if (currentQuiz > quizzes.length) {
      handleAddQuiz();
    } 
  }, [currentQuiz, quizzes.length, onQuizChange]);


  const handleQuizChange = (quizNumber) => {
    if (onQuizChange) {
      onQuizChange(quizNumber);
    }
  };

  const handleAddQuiz = () => {
    setQuizzes((prevQuizzes) => {
      const newQuizzes = [...prevQuizzes, prevQuizzes.length + 1];
      handleQuizChange(newQuizzes.length);
      return newQuizzes;
    });
  };

  const handleRemoveQuiz = () => {
    if (quizzes.length > 1) {
      setQuizzes((prevQuizzes) => {
        const newQuizzes = prevQuizzes.slice(0, -1);
        if (currentQuiz === prevQuizzes.length) {
          handleQuizChange(currentQuiz - 1);
        }
        return newQuizzes;
      });
    }
  };

  return (
    <div className="quiz-navigator">
      <div className="quiz-navigator__buttons">
      <button className="quiz-navigator__button quiz-navigator__button--remove" onClick={handleRemoveQuiz}>
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
