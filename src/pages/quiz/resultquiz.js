import { Box, Button, Paper, Typography, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate, useParams } from 'react-router-dom';
import '../../styles/quiz/ResultQuiz.scss';

const Resultquiz = () => {
    const resultquiz = useSelector((state) => state.quiz.resultquiz);
    const quizAnswers = JSON.parse(localStorage.getItem('quizAnswers')) || {};  
    const quiz = useSelector((state) => state.quiz.solvequiz);  
    const isSmallScreen = useMediaQuery('(max-width:600px)');

    const navi = useNavigate();
    const { id } = useParams();
    
    const [isAnimationComplete, setIsAnimationComplete] = useState(false);
    const [showCorrect, setShowCorrect] = useState(null);

    const correctCount = Object.values(resultquiz).filter(isCorrect => isCorrect === true).length;
    const totalQuestions = Object.keys(resultquiz).length;
    const percentage = (correctCount / totalQuestions) * 100;

    const [count, setCount] = useState(0);

    useEffect(() => {
        let timer;
        if (count < percentage) {
            timer = setTimeout(() => setCount((prev) => prev + 1), 22);
        }
        return () => clearTimeout(timer);
    }, [count, percentage]);

    const gohome = () => {
      localStorage.removeItem('quizAnswers');
      localStorage.removeItem('resultquiz');
        navi("/search");
    };

    const restartQuiz = () => {
        localStorage.removeItem('quizAnswers');
        localStorage.removeItem('resultquiz');
        navi(`/solvequiz/${id}`);
    };

    const tanswerList = [];
    const fanswerList = [];

    quiz.forEach(({ id, subtitle, imageBox, tanswer, fanswers }) => {
        if (resultquiz[id]) {
            tanswerList.push({ id, subtitle, imageBox, tanswer, fanswers });
        } else {
            fanswerList.push({ id, subtitle, imageBox, tanswer, fanswers, userAnswer: quizAnswers[id] });
        }
    });

    return (
        <Box className="resultquiz">
            <Box className="resultquiz__score">
                <motion.div
                    initial={{ opacity: 0, y: 100 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    onAnimationComplete={() => setIsAnimationComplete(true)}
                >
                    <CircularProgressbar
                        value={isAnimationComplete ? percentage : 0}
                        text={`${Math.round(count)}점`}
                        styles={buildStyles({
                            strokeLinecap: 'round',
                            pathColor: '#F5904B',
                            textColor: '#000',
                            trailColor: '#d6d6d6',
                        })}
                    />
                </motion.div>
            </Box>
            <Box className="resultquiz__button">
                <Button color='primary' size={isSmallScreen ? 'small' : 'large'} variant='contained' onClick={gohome}  className="resultquiz__button_1">다른 퀴즈 풀러가기</Button>
                <Button color='primary' size={isSmallScreen ? 'small' : 'large'} variant='contained' onClick={restartQuiz} className="resultquiz__button_1">다시 풀어보기</Button>
            </Box>
            <Box className="resultquiz__button">
                <Button color='secondary' size={isSmallScreen ? 'small' : 'large'} variant='contained' onClick={() => setShowCorrect(false)} className="resultquiz__button_1">오답 문제 보기</Button>
                <Button color='third' size={isSmallScreen ? 'small' : 'large'} variant='contained' onClick={() => setShowCorrect(true)} className="resultquiz__button_1">정답 문제 보기</Button>
            </Box>

            {showCorrect === false && (
                <Box className="resultquiz__list">
                    {fanswerList.map(({ id, subtitle, imageBox, tanswer, userAnswer }) => (
                      <Paper className="resultquiz__paper">
                        <Box key={id} className="resultquiz__item">
                            <Typography variant="BT">문제: {subtitle}</Typography>
                            {imageBox && <img src={imageBox} alt="퀴즈 이미지" className="quiz-image" />}
                            <Typography variant="BBT" className="correct">정답: {tanswer}</Typography>
                            <Typography variant="BBT" className="wrong">선택한 정답: {userAnswer}</Typography>
                        </Box>
                      </Paper>
                    ))}
                </Box>
            )}

            {showCorrect === true && (
                <Box className="resultquiz__list">
                    {tanswerList.map(({ id, subtitle, imageBox, tanswer }) => (
                      <Paper className="resultquiz__paper">
                        <Box key={id} className="resultquiz__item">
                            <Typography variant="BT">문제: {subtitle}</Typography>
                            {imageBox && <img src={imageBox} alt="퀴즈 이미지" className="quiz-image" />}
                            <Typography variant="BBT" className="correct">정답: {tanswer}</Typography>
                        </Box>
                      </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default Resultquiz;
