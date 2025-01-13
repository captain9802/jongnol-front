import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tabs, Tab, Box, Typography, Paper, TextField, Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import '../../styles/quiz/CreateQuiz.scss';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ClearIcon from '@mui/icons-material/Clear'; // x 아이콘 추가
import QuizNavigator from './quiznavigator';

const Creatquiz = () => {
  const navi = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);

  const [value, setValue] = useState(0);
  const [maintitle, setMainTitle] = useState('');
  const [mainex, setMainEx] = useState('');
  const [subtitle, setSubTitle] = useState('');
  const [answers, setAnswers] = useState(['']);
  const [imageDialog, setImageDialog] = useState(null); // Dialog 이미지 상태
  const [imageBox, setImageBox] = useState(null); // Box 이미지 상태
  const [openDialog, setOpenDialog] = useState(true); // Dialog 열기 상태

  useEffect(() => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      navi('/login');
    }
  }, [isLogin, navi]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleAddAnswer = () => {
    setAnswers([...answers, '']);
  };

  const handleRemoveAnswer = (index) => {
    if (answers.length > 1) {
      const newAnswers = answers.filter((_, i) => i !== index);
      setAnswers(newAnswers);
    }
  };

  const handleImageChangeDialog = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageDialog(URL.createObjectURL(file)); // Dialog 이미지 업데이트
    }
  };

  const handleImageChangeBox = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageBox(URL.createObjectURL(file)); // Box 이미지 업데이트
    }
  };

  const handleImageClickDialog = () => {
    document.getElementById('file-input-dialog').click(); // Dialog에서 이미지 파일 선택
  };

  const handleImageClickBox = () => {
    document.getElementById('file-input-box').click(); // Box에서 이미지 파일 선택
  };

  const handleRemoveImageDialog = (event) => {
    event.stopPropagation();
    setImageDialog(null); // Dialog 이미지 삭제
  };

  const handleRemoveImageBox = (event) => {
    event.stopPropagation();
    setImageBox(null); // Box 이미지 삭제
  };

  const handleDialogClose = (event, reason) => {
    if (reason === 'backdropClick') return;
    setOpenDialog(false);
  };

  const handleCancel = () => {
    navi(-1); // 뒤로 가기, 이전 페이지로 이동
  };

  return (
    <Box className="creatquiz">
      {/* Dialog에서의 이미지 삽입 */}
      <Dialog
        className="creatquiz__dialog"
        open={openDialog}
        onClose={handleDialogClose} // dialog 외부 클릭 시 닫히지 않도록 처리
        fullWidth
      >
        <Typography variant='BT'>퀴즈 등록</Typography>
        <DialogContent>
          <Box className="creatquiz__dialogQuiz 1">
            <Typography variant='PCT'>퀴즈 제목</Typography>
            <TextField
              value={maintitle}
              onChange={(e) => setMainTitle(e.target.value)}
              placeholder="퀴즈 제목을 입력해주세요. (최대 30자)"
              multiline
              fullWidth
              inputProps={{
                maxLength: 30,
              }}
            />
          </Box>
          <Box className="creatquiz__dialogQuiz 2">
            <Typography variant='PCT'>퀴즈 설명</Typography>
            <TextField
              value={mainex}
              onChange={(e) => setMainEx(e.target.value)}
              placeholder="퀴즈 설명을 입력해주세요. (최대 100자)"
              multiline
              fullWidth
              inputProps={{
                maxLength: 100,
              }}
              className='creatquiz__dialogQuizEx'
            />
          </Box>
          <Box className="creatquiz__dialogQuiz 3">
            <Typography variant='PCT'>퀴즈 썸네일</Typography>
            <Paper
              className='creatquiz__dialogImage'
              onClick={handleImageClickDialog} // 이미지 클릭 시 파일 선택창 열기
            >
              {imageDialog ? (
                <Box className="creatquiz__imagePreviewContainer">
                  <img
                    src={imageDialog}
                    alt="selected"
                    className="creatquiz__imagePreview"
                  />
                  <ClearIcon
                    className="creatquiz__clearIcon"
                    onClick={handleRemoveImageDialog} // x 아이콘 클릭 시 이미지 삭제
                  />
                </Box>
              ) : (
                <AddIcon className="creatquiz__icon" />
              )}
            </Paper>
            <input
              type="file"
              id="file-input-dialog"
              style={{ display: 'none' }}
              accept="image/*" // 이미지 파일만 선택 가능
              onChange={handleImageChangeDialog} // 이미지 변경 시 처리
            />
          </Box>
        </DialogContent>
        <DialogActions>
         <Button
            onClick={handleCancel}
            sx={{
              backgroundColor: '#C8DEB8',
              '&:hover': {
                backgroundColor: '#C8DEB8', // 호버 시 색상 변경 안 함
              },
            }}
            variant="contained"
            size="small"
          >
            취소하기
          </Button>
          <Button onClick={() => setOpenDialog(false)}
          sx={{backgroundColor: '#C8DEB8', 
            '&:hover': { backgroundColor: '#C8DEB8', // 호버 시 색상 변경 안 함
              },}}
          className="creatquiz__button"
          variant="contained"
          size="small">
            등록하기
          </Button>
        </DialogActions>
      </Dialog>
      <QuizNavigator 
        currentStep={value} // 현재 스텝 전달
        onStepChange={setValue} // 스텝 변경 핸들러 전달
      />
      {/* 객관식 문제 영역에서의 이미지 삽입 */}
      <Tabs
        value={value}
        onChange={handleChange}
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
        {value === 0 && (
          <Box className="creatquiz__content">
            <Typography variant="BT" className="creatquiz__header">
              객관식 문제 (선택)
            </Typography>
            <Paper
              className="creatquiz__quizimage"
              onClick={handleImageClickBox} // 이미지 클릭 시 파일 선택창 열기
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
                    onClick={handleRemoveImageBox} // x 아이콘 클릭 시 이미지 삭제
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
              accept="image/*" // 이미지 파일만 선택 가능
              onChange={handleImageChangeBox} // 이미지 변경 시 처리
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
              inputProps={{
                maxLength: 200,
              }}
              className="creatquiz__inputField"
            />
            <Typography variant="BT" className="creatquiz__header">
              객관식 답안
            </Typography>
            {answers.map((answer, index) => (
              <Box key={index} className="creatquiz__answerBox">
                <TextField
                  value={answer}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = e.target.value;
                    setAnswers(newAnswers);
                  }}
                  placeholder="객관식 보기 및 답안을 작성해주세요. (최대 50자)"
                  inputProps={{
                    maxLength: 50,
                  }}
                  className="creatquiz__answerField"
                />
                {answers.length > 1 && (
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
          </Box>
        )}
        {value === 1 && (
          <Box className="creatquiz__content">
            <Typography variant="BT" className="creatquiz__header">
              주관식 문제
            </Typography>
          </Box>
        )}
        <Box className="creatquiz__formButtonContainer">
          <Button
            className="creatquiz__button"
            color="inherit"
            variant="contained"
            size="small"
          >
            다음 문제
          </Button>
          <Button
            className="creatquiz__button"
            color="inherit"
            variant="contained"
            size="small"
          >
            등록하기
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Creatquiz;
