import React, { useState } from 'react';
import '../../styles/quiz/QuizNavigator.scss'; // 필요한 스타일 추가

const QuizNavigator = ({ onQuizChange }) => {
  const [quizzes, setQuizzes] = useState([1, 2, 3, 4, 5]);
  const [currentQuiz, setCurrentQuiz] = useState(1);

  // 퀴즈 변경 핸들러
  const handleQuizChange = (quizNumber) => {
    setCurrentQuiz(quizNumber);
    if (onQuizChange) {
      onQuizChange(quizNumber);
    }
  };

  // 다음 퀴즈로 이동
  const handleNextQuiz = () => {
    if (currentQuiz < quizzes.length) {
      handleQuizChange(currentQuiz + 1);
    }
  };

  // 퀴즈 추가
  const handleAddQuiz = () => {
    setQuizzes((prevQuizzes) => [...prevQuizzes, prevQuizzes.length + 1]);
  };

  // 퀴즈 삭제
  const handleRemoveQuiz = () => {
    if (quizzes.length > 1) {
      setQuizzes((prevQuizzes) => prevQuizzes.slice(0, -1));
      if (currentQuiz === quizzes.length) {
        handleQuizChange(currentQuiz - 1);
      }
    }
  };

  return (
    <div className="quiz-navigator">
      <div className="quiz-navigator__buttons">
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
        <button className="quiz-navigator__button quiz-navigator__button--remove" onClick={handleRemoveQuiz}>
          -
        </button>
      </div>
    </div>
  );
};

export default QuizNavigator;
