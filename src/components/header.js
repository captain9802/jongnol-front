import React, { useCallback, useEffect, useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography, useMediaQuery  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../apis/userApi';
import '../styles/header/Header.scss'
import ProfileImg from './profileImg';
import Swal from 'sweetalert2';

const Header = ({className}) => {
  const navi = useNavigate();
  const {isLogin, userProfileImg} = useSelector((state) => state.user);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [userImg, setUserImg] = useState(userProfileImg);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    Swal.fire({
      text:'로그아웃 되었습니다.',
      icon:'success',
      confirmButtonText:'오케이'
    })
    navi("/login");
  }, [dispatch, navi]);

  const quizCreat = useCallback(() => {
    navi("/quizcreate");
  }, [navi])

  const mypage = useCallback(() => {
    navi("/mypage");
  }, [navi])

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
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
          {isSmallScreen ? (
            <>
            <Box sx={{marginRight: '1rem'}}>
              <ProfileImg number={userImg} onClick={handleProfileClick}/>
              <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleCloseMenu}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  className='header__buttons__menu'
                >
                  <MenuItem onClick={quizCreat}>퀴즈 등록</MenuItem>
                  <MenuItem sx={{borderBottom:"2px dashed #F5904B", borderTop:"2px dashed #F5904B"}} onClick={mypage}>마이페이지</MenuItem>
                  <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                </Menu>
                </Box>
            </>
          ) : (
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
          )}
        </>
        ) : (
          <Button
            className="header__buttons__button_join"
            color='primary'
            variant="contained"
            size="small"
            onClick={() => navi('/login')}
          >
            로그인 / 회원가입
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Header;
