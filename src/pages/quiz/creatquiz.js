import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Tabs, Tab, Box, Typography, Paper, TextField, Button } from '@mui/material';
import '../../styles/quiz/CreateQuiz.scss';
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const Creatquiz = () => {
  const navi = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);

  const [value, setValue] = useState(0);
  const [title, setTitle] = useState('');
  const [answers, setAnswers] = useState(['']); // 답안 텍스트 필드를 배열로 관리

  useEffect(() => {
    if (!isLogin) {
      alert('로그인이 필요합니다.');
      navi('/login');
    }
  }, [isLogin, navi]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // 답안 추가 함수
  const handleAddAnswer = () => {
    setAnswers([...answers, '']); // 답안 배열에 새로운 항목 추가
  };

  // 답안 제거 함수
  const handleRemoveAnswer = (index) => {
    if (answers.length > 1) {
      const newAnswers = answers.filter((_, i) => i !== index); // 해당 인덱스의 답안 제거
      setAnswers(newAnswers);
    }
  };

  return (
    <Box className="creatquiz">
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

      <Box sx={{ width: '800px', margin: 'auto', marginTop: '20px' }}>
        {value === 0 && (
          <Box className="creatquiz__content">
            <Typography variant="BT" className="creatquiz__header">
              객관식 문제
            </Typography>
            <Paper className="creatquiz__quizimage">
              <AddIcon className="creatquiz__icon" />
            </Paper>
            <Typography variant="BT" className="creatquiz__header">
              문제 제목
            </Typography>
            <TextField
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="문제 제목을 입력해주세요. (최대 200자)"
              multiline
              fullWidth
              inputProps={{
                maxLength: 200,
              }}
              sx={{
                backgroundColor: 'white',
                height: '116px',
                borderRadius: '4px',
                boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
                '& .css-1s7hm3h-MuiInputBase-root-MuiOutlinedInput-root': {
                  padding: '12px',
                },
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    border: 'none', // 아웃라인 제거
                  },
                },
              }}
            />
            <Typography variant="BT" className="creatquiz__header">
              객관식 답안
            </Typography>
            {answers.map((answer, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  placeContent: 'space-between',
                  gap: '10px',
                  marginBottom: '10px',
                }}
              >
                <TextField
                  value={answer}
                  onChange={(e) => {
                    const newAnswers = [...answers];
                    newAnswers[index] = e.target.value; // 특정 답안을 업데이트
                    setAnswers(newAnswers);
                  }}
                  placeholder="객관식 보기 및 답안을 작성해주세요. (최대 50자)"
                  inputProps={{
                    maxLength: 50,
                  }}
                  sx={{
                    backgroundColor: 'white',
                    height: '47px',
                    width: '100%',
                    borderRadius: '4px',
                    boxShadow: '1px 1px 4px rgba(0, 0, 0, 0.2)',
                    '& .css-16wblaj-MuiInputBase-input-MuiOutlinedInput-input': {
                      padding: '12px',
                    },
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: 'none', // 아웃라인 제거
                      },
                    },
                  }}
                />
                {answers.length > 1 && (
                  <RemoveCircleOutlineIcon
                    sx={{ width: '30px', height: '30px', cursor: 'pointer' }}
                    onClick={() => handleRemoveAnswer(index)} // 마이너스 버튼 클릭 시 답안 제거
                  />
                )}
              </Box>
            ))}
            <Paper sx={{ height: '47px', display: 'flex', justifyContent: 'center' }}>
              <AddCircleOutlineIcon
                sx={{ width: '30px', height: '30px', padding: '8px', cursor: 'pointer' }}
                onClick={handleAddAnswer} // 플러스 버튼 클릭 시 답안 추가
              />
            </Paper>
          </Box>
        )}
        {value === 1 && (
          <Box className="creatquiz__content">
            <Typography variant="BT" className="creatquiz__header">
              주관식 문제
            </Typography>
            {/* 주관식 문제 관련 내용 */}
          </Box>
        )}
        <Box sx={{float:'right', marginTop:'30px', marginBottom:'30px'}}>
          <Button
            className="creatquiz__button"
            color='inherit'
            variant="contained"
            size="small"
          >
            다음 문제
          </Button>
           <Button
           className="creatquiz__button"
           color='inherit'
           variant="contained"
           size="small"
           sx={{marginLeft:'10px'}}
         >
           등록하기
         </Button>
         </Box>
      </Box>
    </Box>
  );
};

export default Creatquiz;
