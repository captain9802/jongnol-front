import React, { useCallback } from 'react';
import { Box, Button, Typography  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../apis/userApi';
import '../styles/header/Header.scss'

const Header = ({className}) => {
  const navi = useNavigate();
  const isLogin = useSelector(state => state.user.isLogin);
  const dispatch = useDispatch();

  const handleLogout = useCallback(() => {
    dispatch(logout());
    navi("/login");
  }, [dispatch, navi]);

  const quizCreat = useCallback(() => {
    navi("/quizcreate");
  }, [navi])

  const mypage = useCallback(() => {
    navi("/mypage");
  }, [navi])
  return (
    <Box className="header">
      <Box className={className === 'headerText' ? 'headerText' : 'headers'} onClick={() => navi('/')}>
        <Typography variant="VBT">
          <span style={{ color: '#F5904B' }}>J</span>
          <span style={{ color: 'black' }}>o</span>
          <span style={{ color: 'black' }}>n</span>
          <span style={{ color: 'black' }}>g</span>
          <span style={{ color: '#F5904B' }}>N</span>
          <span style={{ color: 'black' }}>o</span>
          <span style={{ color: '#F5904B' }}>L</span>
        </Typography>
      </Box>
      <Box className="header__buttons">
        {isLogin ? (
          <>
          <Button
           className="header__buttons__button"
           color='primary'
           variant="contained"
           size="small"
           onClick={quizCreat}
         >
           퀴즈 등록
         </Button>
          <Button
            className="header__buttons__button_logout"
            color='primary'
            variant="contained"
            size="small"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
         <Button
           className="header__buttons__button"
           color='primary'
           variant="contained"
           size="small"
           onClick={mypage}
         >
           마이페이지
         </Button>
         </>
        ) : (
          <>
            <Button
              className="header__buttons__button_join"
              color='primary'
              variant="contained"
              size="small"
              onClick={() => navi('/login')}
            >
              로그인 / 회원가입
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
