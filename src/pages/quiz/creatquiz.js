import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector , useDispatch } from 'react-redux';
import { Box, Button } from '@mui/material';
import '../../styles/quiz/CreateQuiz.scss';
import QuizNavigator from '../../components/quiznavigator';
import QuizDialog from '../../components/quizdialog';
import QuizForm from '../../components/quizform';
import { sendQuiz } from '../../apis/quizApi';
import WarningAlert from '../../components/alert/warningAlert';
import OkAlert from '../../components/alert/okAlert';
import ErrorAlert from '../../components/alert/errorAlert';
import SubmitAlert from '../../components/alert/submitAlert';

const Creatquiz = () => {
  const navi = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);
  const {warningAlert} = WarningAlert();
  const {okAlert} = OkAlert();
  const {errorAlert} = ErrorAlert();
  const {submitAlert} = SubmitAlert();

  const [currentQuiz, setCurrentQuiz] = useState(0);
  const [quizzes, setQuizzes] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLogin) {
      warningAlert({title:'로그인이 필요합니다.'});
      navi('/login');
    }
  }, [isLogin, navi]);

  const deleteData = () => {
    if (currentQuiz === 1) {
        warningAlert({title:'1번 퀴즈는 삭제할 수 없습니다.'});
        return;
    }

    const newQuizData = JSON.parse(localStorage.getItem('newquiz')) || { questions: [] };

    submitAlert({
        title: `현재 작성 중인 ${currentQuiz}번 퀴즈가 삭제됩니다. 괜찮으시겠습니까?`
    }).then(result => {
        if (result.isConfirmed) {
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

            okAlert({title:'퀴즈가 삭제되었습니다.'});
        } else {
            okAlert({title:'취소되었습니다.'});
        }
    });
};

  
  

  const handleQuizChange = (newQuizNumber) => {
    setCurrentQuiz(newQuizNumber);
  };

  const handleAddQuiz = () => {
    const quizData = JSON.parse(localStorage.getItem('newquiz')) || { questions: [] };
    if (!quizData.questions[currentQuiz - 1] || !quizData.questions[currentQuiz - 1].subtitle) {
      warningAlert({title:'먼저 문제를 등록 후 퀴즈를 추가해주세요.'});
      return;
    }    if (quizzes.length < 50) {
      setQuizzes((prevQuizzes) => {
        const newQuizzes = [...prevQuizzes, prevQuizzes.length + 1];
        handleQuizChange(newQuizzes.length);
        return newQuizzes;
      });
    } else {
      warningAlert({title:'최대 50개의 퀴즈만 추가할 수 있습니다.'});
      handleQuizChange(quizzes.length);
    }
  };

  const handleBackQuiz = () => {
    setCurrentQuiz((prevQuiz) => {
      const nextQuiz = prevQuiz - 1;
      if (nextQuiz < 1) {
        warningAlert({title:"첫 번째 문제입니다."});
        return prevQuiz;
      }
      handleQuizChange(nextQuiz);
      return nextQuiz;
    });
  };

  const handleSubmitQuiz = async () => {
    const quizData = JSON.parse(localStorage.getItem('newquiz'));

    if (!quizData || !quizData.questions.length) {
      warningAlert({title:'등록할 퀴즈가 없습니다.'});
      return;
    }
    submitAlert({
      title: '퀴즈를 등록하시겠습니까?'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(sendQuiz(quizData)).unwrap();
          okAlert({title:"퀴즈가 등록되었습니다."});
          navi("/search");
        } catch (error) {
          errorAlert();
        }
      } else {
        okAlert({title:'등록이 취소되었습니다.'});
      }
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
        handleAddQuiz={handleAddQuiz}
      />
      <QuizForm
        currentQuiz={currentQuiz}
        onQuizChange={handleQuizChange}
        deleteData={deleteData}
        quizzes={quizzes}
        handleAddQuiz={handleAddQuiz}
      />
      <Box className="creatquiz__buttonbox">
        <Box className="creatquiz__buttons">
          <Button
            className="creatquiz__button"
            color="primary"
            variant="contained"
            size="small"
            onClick={handleBackQuiz}
          >
            이전 문제
          </Button>
          <Button
            className="creatquiz__button"
            color="primary"
            variant="contained"
            size="small"
            onClick={handleAddQuiz}
          >
            다음 문제
          </Button>
          <Button
            className="creatquiz__submitbutton"
            color="primary"
            variant="contained"
            size="small"
            onClick={handleSubmitQuiz}
          >
            퀴즈 등록하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Creatquiz;
