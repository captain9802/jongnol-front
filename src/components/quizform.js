import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography, Paper, Tabs, Tab, Button } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import '../styles/quiz/QuizForm.scss';
import WarningAlert from './alert/warningAlert';
import OkAlert from './alert/okAlert';
import SubmitAlert from './alert/submitAlert';
import ErrorAlert from './alert/errorAlert';
import { useDispatch } from 'react-redux';
import { deleteImage, uploadImage } from '../apis/quizApi';

const QuizForm = ({ currentQuiz, deleteData , quizzes, handleAddQuiz}) => {
  const [value, setValue] = useState(0);
  const [subtitle, setSubTitle] = useState('');
  const [tanswer, setTanswer] = useState('');
  const [fanswers, setFanswers] = useState(['']);
  const [imageBox, setImageBox] = useState(null);
  const {warningAlert} = WarningAlert();
  const {errorAlert} = ErrorAlert();
  const {okAlert} = OkAlert();
  const {submitAlert} = SubmitAlert();
  const dispatch = useDispatch();


   useEffect(() => {
    const newQuizData = JSON.parse(localStorage.getItem('newquiz')) || { questions: [] };
  
    const existingQuiz = newQuizData.questions.filter(q => q !== null).find(q => q.quizNumber === currentQuiz);
    if (existingQuiz) {
      setValue(existingQuiz.type || 0); 
      setSubTitle(existingQuiz.subtitle || '');  
      setTanswer(existingQuiz.tanswer || ''); 
      setFanswers(existingQuiz.fanswers || ['']);
      setImageBox(existingQuiz.imageBox || null);
    } else {
      setValue(0);
      setSubTitle(''); 
      setTanswer(''); 
      setFanswers(['']); 
      setImageBox(null); 
    }
  }, [currentQuiz, quizzes]); 

  const saveData = async () => {
    let finalImageBox = imageBox;

    if (imageBox) {
        const uploadedUrl = await uploadImageToServer(imageBox);
        if (uploadedUrl) {
            finalImageBox = uploadedUrl;
        }
    }

    const newQuizData = JSON.parse(localStorage.getItem('newquiz')) || { questions: [] };

    if (!subtitle) {
      warningAlert({title:'제목이 비어있습니다. 제목을 입력해주세요.'});
      return;
    }
  
    if (!tanswer) {
      warningAlert({title:'정답칸이 비어있습니다. 정답을 입력해주세요.'});
      return;
    }
  
    if (value === 0 && (!fanswers || fanswers.length === 0 || fanswers.some(f => f.trim() === ""))) {
      warningAlert({title:'오답 선택지가 비어있습니다. 최소한 하나의 오답을 입력해주세요.'});
      return;
    }

    if (value === 1) {
      const combinedTanswer = [tanswer, ...fanswers.filter(answer => answer.trim() !== "")].join(",");
      newQuizData.questions[currentQuiz - 1] = {
        quizNumber: currentQuiz, 
        type: value,              
        subtitle,                
        tanswer: combinedTanswer,                 
        fanswers: [''],                
        imageBox: finalImageBox                 
      };
    
      localStorage.setItem('newquiz', JSON.stringify(newQuizData));
      handleAddQuiz();
      okAlert({title:'문제가 등록되었습니다.'});
      return;
    }
  
    newQuizData.questions[currentQuiz - 1] = {
      quizNumber: currentQuiz, 
      type: value,              
      subtitle,                
      tanswer,                 
      fanswers,                
      imageBox: finalImageBox                 
    };
  
    localStorage.setItem('newquiz', JSON.stringify(newQuizData));
    handleAddQuiz();
    okAlert({title:'문제가 등록되었습니다.'});
    };

  
  const hasInputData = () => {
    return subtitle || tanswer || fanswers.some(answer => answer.trim() !== '') || imageBox;
  };

  const confirmAndClearData = () => {
    if (hasInputData()) {
      return submitAlert({ 
        title: '현재 작성 중인 퀴즈란이 초기화됩니다. 괜찮으시겠습니까?' 
      }).then(result => {
        if (result.isConfirmed) {
          clearInputData();
          return true;
        } else {
          return false;
        }
      });
    }
    return true;
  };
  
  const clearInputData = () => {
    setSubTitle('');
    setTanswer('');
    setFanswers(['']);
    setImageBox(null);
    localStorage.removeItem(`quiz-${currentQuiz}`);
  };

  const handleChangeTab = (event, newValue) => {
    event.preventDefault();
    if (confirmAndClearData()) {
      setValue(newValue);
    }
  };

  const handleAddAnswer = () => {
    if (value === 0) {
     if(fanswers.length < 5) {
      setFanswers([...fanswers, '']);
      } else {
        warningAlert({title:'최대 5개의 보기만 추가할 수 있습니다.'});
        return;
      }
    } else if (value === 1) {
      if(fanswers.length < 4) {
        setFanswers([...fanswers, '']);
      }else {
        warningAlert({title:'최대 4개의 유사 답변을 추가할 수 있습니다.'});
        return;
    }
  }};

  const handleRemoveAnswer = (index) => {
    const newAnswers = fanswers.filter((_, i) => i !== index);
    setFanswers(newAnswers);
  
    localStorage.setItem(
      `quiz-${currentQuiz}`,
      JSON.stringify({
        subtitle,
        tanswer,
        fanswers: newAnswers,
        imageBox,
      })
    );
  };

  const handleImageClickBox = () => {
    document.getElementById('file-input-box').click();
  };

  const handleImageChangeBox = (event) => {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onloadend = () => {
            const img = new Image();
            img.src = reader.result;

            img.onload = () => {
                const maxWidth = 1024;
                const maxHeight = 1024;
                const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');

                canvas.width = img.width * ratio;
                canvas.height = img.height * ratio;

                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                const base64Image = canvas.toDataURL('image/jpeg', 0.7);

                setImageBox(base64Image);
            };
        };

        reader.readAsDataURL(file);
    }
};

const uploadImageToServer = async (base64Image) => {
  try {
      const imageUrl = await dispatch(uploadImage(base64Image)).unwrap();
      setImageBox(imageUrl);
      return imageUrl;
  } catch (error) {
      errorAlert();
      return null;
  }
};

  const handleRemoveImageBox = (event) => {
    event.stopPropagation();
    // if (!imageBox) return;
    // dispatch(deleteImage(imageBox))
    //     .unwrap()
    //     .then(() => {
    //         setImageBox(null);
    //     })
    //     .catch((error) => {
    //         errorAlert();
    //     });
    setImageBox(null);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChangeTab}
        variant="fullWidth"
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />,
        }}
        className="creatquiz__tabs"
      >
        <Tab
          label={
            <Typography
              variant={value === 0 ? 'PCT' : 'TE'}
              className={`creatquiz__tab ${value === 0 ? 'creatquiz__tab--selected' : ''}`}
            >
              객관식
            </Typography>
          }
        />
        <Tab
          label={
            <Typography
              variant={value === 1 ? 'PCT' : 'TE'}
              className={`creatquiz__tab ${value === 1 ? 'creatquiz__tab--selected' : ''}`}
            >
              주관식
            </Typography>
          }
        />
      </Tabs>
      <Box className="creatquiz__Box">
        <Box className="creatquiz__content">
          {value === 0 && (
            <>
              <Typography variant="BT" className="creatquiz__header">
                객관식 문제 (선택)
              </Typography>
              <Paper
                className="creatquiz__quizimage"
                onClick={handleImageClickBox}
              >
                {imageBox ? (
                  <Box className="creatquiz__imagePreviewContainer">
                    <img
                      src={imageBox}
                      alt="selected"
                      className="creatquiz__imagePreview"
                    />
                    <ClearIcon
                      className="creatquiz__clearIcon"
                      onClick={handleRemoveImageBox}
                    />
                  </Box>
                ) : (
                  <AddIcon className="creatquiz__icon" />
                )}
              </Paper>
              <input
                type="file"
                id="file-input-box"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChangeBox}
              />
              <Typography variant="BT" className="creatquiz__header">
                문제 제목
              </Typography>
              <TextField
                value={subtitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="문제 제목을 입력해주세요. (최대 200자)"
                multiline
                fullWidth
                inputProps={{ maxLength: 200 }}
                className="creatquiz__inputField"
              />
              <Typography variant="BT" className="creatquiz__header">
                객관식 정답
              </Typography>
              <Box className="creatquiz__answerBox">
                <TextField
                  value={tanswer}
                  onChange={(e) => setTanswer(e.target.value)}
                  placeholder="객관식 정답을 입력해주세요. (최대 50자)"
                  inputProps={{ maxLength: 50 }}
                  className="creatquiz__answerField"
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      padding: '12px',
                    },
                  }}
                />
              </Box>
              <Typography variant="BT" className="creatquiz__header">
                객관식 보기
              </Typography>
              {fanswers.map((answer, index) => (
                <Box key={index} className="creatquiz__answerBox">
                  <TextField
                    value={answer}
                    onChange={(e) => {
                      const newFanswers = [...fanswers];
                      newFanswers[index] = e.target.value;
                      setFanswers(newFanswers);
                    }}
                    placeholder="객관식 보기 및 답안을 작성해주세요. (최대 50자)"
                    inputProps={{ maxLength: 50 }}
                    className="creatquiz__answerField"
                    sx={{
                      '& .MuiOutlinedInput-input': {
                        padding: '12px',
                      },
                    }}
                  />
                  {fanswers.length > 1 && (
                    <RemoveCircleOutlineIcon
                      className="creatquiz__removeIcon"
                      onClick={() => handleRemoveAnswer(index)}
                    />
                  )}
                </Box>
              ))}
              <Paper className="creatquiz__addButton">
                <AddCircleOutlineIcon
                  className="creatquiz__addIcon"
                  onClick={handleAddAnswer}
                />
              </Paper>
            </>
          )}
          {value === 1 && (
            <>
              <Typography variant="BT" className="creatquiz__header">
                주관식 문제 (선택)
              </Typography>
              <Paper
                className="creatquiz__quizimage"
                onClick={handleImageClickBox}
              >
                {imageBox ? (
                  <Box className="creatquiz__imagePreviewContainer">
                    <img
                      src={imageBox}
                      alt="selected"
                      className="creatquiz__imagePreview"
                    />
                    <ClearIcon
                      className="creatquiz__clearIcon"
                      onClick={handleRemoveImageBox}
                    />
                  </Box>
                ) : (
                  <AddIcon className="creatquiz__icon" />
                )}
              </Paper>
              <input
                type="file"
                id="file-input-box"
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleImageChangeBox}
              />
              <Typography variant="BT" className="creatquiz__header">
                문제 제목
              </Typography>
              <TextField
                value={subtitle}
                onChange={(e) => setSubTitle(e.target.value)}
                placeholder="문제 제목을 입력해주세요. (최대 200자)"
                multiline
                fullWidth
                inputProps={{ maxLength: 200 }}
                className="creatquiz__inputField"
              />
              <Typography variant="BT" className="creatquiz__header">
                주관식 정답
              </Typography>
              <Box className="creatquiz__answerBox">
                <TextField
                  value={tanswer}
                  onChange={(e) => setTanswer(e.target.value)}
                  placeholder="주관식 정답을 입력해주세요. (최대 50자)"
                  inputProps={{ maxLength: 50 }}
                  className="creatquiz__answerField"
                  sx={{
                    '& .MuiOutlinedInput-input': {
                      padding: '12px',
                    },
                  }}
                />
              </Box>
              <Typography variant="BT" className="creatquiz__header">
                주관식 유사답안
              </Typography>
              {fanswers.map((answer, index) => (
                <Box key={index} className="creatquiz__answerBox">
                  <TextField
                    value={answer}
                    onChange={(e) => {
                      const newFanswers = [...fanswers];
                      newFanswers[index] = e.target.value;
                      setFanswers(newFanswers);
                    }}
                    placeholder="주관식 유사답안을 입력해주세요. (최대 50자)"
                    inputProps={{ maxLength: 50 }}
                    className="creatquiz__answerField"
                    sx={{
                      '& .MuiOutlinedInput-input': {
                        padding: '12px',
                      },
                    }}
                  />
                  <RemoveCircleOutlineIcon
                    className="creatquiz__removeIcon"
                    onClick={() => handleRemoveAnswer(index)}
                  />
                </Box>
              ))}
              <Paper className="creatquiz__addButton">
                <AddCircleOutlineIcon
                  className="creatquiz__addIcon"
                  onClick={handleAddAnswer}
                />
              </Paper>
            </>
          )}
        </Box>
        <Box className="creatquiz__submit">
          <Button 
          variant="contained"
          className="creatquiz__submitButton"
          onClick={saveData}>
              <Typography variant="PCT" className="creatquiz__header">
                문제 등록하기
              </Typography>
          </Button>
          <Button 
          variant="contained"
          className="creatquiz__deleteButton"
          onClick={deleteData}>
              <Typography variant="PCT" className="creatquiz__header">
                문제 삭제하기
              </Typography>
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default QuizForm;
