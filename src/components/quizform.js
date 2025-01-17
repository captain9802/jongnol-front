import React, { useState } from 'react';
import { Box, TextField, Typography, Paper, Tabs, Tab } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ClearIcon from '@mui/icons-material/Clear';
import AddIcon from '@mui/icons-material/Add';
import '../styles/quiz/QuizForm.scss';

const QuizForm = ({ currentQuiz, setQuizzes }) => {
  const [value, setValue] = useState(0);
  const [subtitle, setSubTitle] = useState('');
  const [tanswer, setTanswer] = useState('');
  const [fanswers, setFanswers] = useState(['']);
  const [imageBox, setImageBox] = useState(null);

  const hasInputData = () => {
    return subtitle || tanswer || fanswers.some(answer => answer.trim() !== '') || imageBox;
  };

  const confirmAndClearData = () => {
    if (hasInputData()) {
      if (window.confirm('현재 작성 중인 퀴즈란이 초기화됩니다. 괜찮으시겠습니까?')) {
        clearInputData();
        return true;
      } else {
        return false;
      }
    }
    return true;
  };

  const clearInputData = () => {
    setSubTitle('');
    setTanswer('');
    setFanswers(['']);
    setImageBox(null);
  };

  const handleChangeTab = (event, newValue) => {
    if (confirmAndClearData()) {
        setValue(newValue);
        handleTypeChange(newValue);
    }
  };

  const handleTypeChange = (newType) => {
    setQuizzes((prevQuizzes) => ({
      ...prevQuizzes,
      [currentQuiz]: {
        ...prevQuizzes[currentQuiz],
        type: newType,
        correctAnswer: newType === 1 ? [] : "",
        falseAnswers: newType === 0 ? [""] : [],
      },
    }));
  };

  const handleAddAnswer = () => {
    setFanswers([...fanswers, '']);
  };

  const handleRemoveAnswer = (index) => {
    const newAnswers = fanswers.filter((_, i) => i !== index);
    setFanswers(newAnswers);
  };

  const handleImageClickBox = () => {
    document.getElementById('file-input-box').click();
  };

  const handleImageChangeBox = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageBox(URL.createObjectURL(file));
    }
  };

  const handleRemoveImageBox = (event) => {
    event.stopPropagation();
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
                  inputProps={{ maxLength: 30 }}
                  className="creatquiz__answerField"
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
      </Box>
    </>
  );
};

export default QuizForm;
