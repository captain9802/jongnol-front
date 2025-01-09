import React, { useCallback } from 'react';
import { Box, Button  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../apis/userApi';
import '../styles/header/Header.scss'

const Header = () => {
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

  return (
    <Box className="header">
      <img
        src='logo/6.png'
        alt='logo'
        className="header__logo"
        onClick={() => navi('/')}
      />
      <Box className="header__buttons">
        {isLogin ? (
          <>
          <Button
            className="header__buttons__button"
            color='inherit'
            variant="contained"
            size="small"
            onClick={handleLogout}
          >
            로그아웃
          </Button>
           <Button
           className="header__buttons__button"
           color='inherit'
           variant="contained"
           size="small"
           onClick={quizCreat}
         >
           퀴즈 등록
         </Button>
         </>
        ) : (
          <>
            <Button
              className="header__buttons__button"
              color='inherit'
              variant="contained"
              size="small"
              onClick={() => navi('/join')}
            >
              회원가입
            </Button>
            <Button
              className="header__buttons__button"
              color='inherit'
              variant="contained"
              size="small"
              onClick={() => navi('/login')}
            >
              로그인
            </Button>
          </>
        )}
      </Box>
    </Box>
  );
};

export default Header;
