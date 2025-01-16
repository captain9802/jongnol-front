import React, { useState,useEffect } from 'react';
import '../../styles/quiz/QuizNavigator.scss'; // 필요한 스타일 추가

const QuizNavigator = ({ currentQuiz , onQuizChange }) => {
  const [quizzes, setQuizzes] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    if (currentQuiz > quizzes.length) {
      handleAddQuiz();
    } 
  }, [currentQuiz, quizzes.length, onQuizChange]);


  // 퀴즈 변경 핸들러
  const handleQuizChange = (quizNumber) => {
    if (onQuizChange) {
      onQuizChange(quizNumber); // 부모 컴포넌트로 퀴즈 번호 변경 전달
    }
  };

  // 퀴즈 추가
  const handleAddQuiz = () => {
    setQuizzes((prevQuizzes) => {
      const newQuizzes = [...prevQuizzes, prevQuizzes.length + 1];
      // 새로 추가된 퀴즈로 이동
      handleQuizChange(newQuizzes.length); // 새로운 퀴즈 번호로 이동
      return newQuizzes;
    });
  };

  // 퀴즈 삭제
  const handleRemoveQuiz = () => {
    if (quizzes.length > 1) {
      setQuizzes((prevQuizzes) => {
        const newQuizzes = prevQuizzes.slice(0, -1);
        // 현재 퀴즈가 마지막 퀴즈라면, 이전 퀴즈로 이동
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
