import React, { useCallback, useState } from 'react';
import { Box, Button, Menu, MenuItem, Typography, useMediaQuery  } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../apis/userApi';
import '../styles/header/Header.scss'
import ProfileImg from './profileImg';
import OkAlert from './alert/okAlert';

const Header = ({className}) => {
  const navi = useNavigate();
  const {isLogin, userProfileImg} = useSelector((state) => state.user);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const {okAlert} = OkAlert();
  const handleLogout = useCallback(() => {
    dispatch(logout());
    okAlert({title:'로그아웃 되었습니다.'});
    navi("/login");
  }, [dispatch, navi, okAlert]);

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
      <Box
        className={className === 'headerText' ? 'headerText' : 'headers'}
        sx={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Typography variant="VBT" className='header__logotext' onClick={() => navi('/')}>
          <span style={{ color: '#F5904B' }}>J</span>
          <span style={{ color: 'black' }}>o</span>
          <span style={{ color: 'black' }}>n</span>
          <span style={{ color: 'black' }}>g</span>
          <span style={{ color: '#F5904B' }}>N</span>
          <span style={{ color: 'black' }}>o</span>
          <span style={{ color: '#F5904B' }}>L</span>
        </Typography>
      </Box>
      <Box
        className="header__buttons"
        sx={{
          marginLeft: 'auto',
          display: 'flex',
          gap: '0.825rem',
        }}
      >
        {isLogin ? (
          <>
            {isSmallScreen ? (
              <>
                <Box sx={{ marginRight: '1rem' }}>
                  <ProfileImg number={userProfileImg} onClick={handleProfileClick} />
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
                    sx={{
                      '& .MuiPaper-root': {
                        border: '2px dashed #F5904B',
                      },
                      '& .MuiList-root': {
                        padding: 0,
                      },
                      '& .MuiMenuItem-root': {
                        display: 'flex',
                        justifyContent: 'center',
                        fontSize: '16px',
                        color: '#572973',
                      },
                    }}
                  >
                    <MenuItem onClick={quizCreat}>퀴즈 등록</MenuItem>
                    <MenuItem
                      sx={{ borderBottom: '2px dashed #F5904B', borderTop: '2px dashed #F5904B' }}
                      onClick={mypage}
                    >
                      마이페이지
                    </MenuItem>
                    <MenuItem onClick={handleLogout}>로그아웃</MenuItem>
                  </Menu>
                </Box>
              </>
            ) : (
              <>
                <Button
                  className="header__buttons__button"
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={quizCreat}
                >
                  퀴즈 등록
                </Button>
                <Button
                  className="header__buttons__button_logout"
                  color="primary"
                  variant="contained"
                  size="small"
                  onClick={handleLogout}
                >
                  로그아웃
                </Button>
                <Button
                  className="header__buttons__button"
                  color="primary"
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
            color="primary"
            variant="contained"
            size="small"
            onClick={() => navi('/login')}
            sx={{
              width: '8.75rem !important',
            }}
          >
            로그인 / 회원가입
          </Button>
        )}
      </Box>
    </Box>

  );
};

export default Header;
