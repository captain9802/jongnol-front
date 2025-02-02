import { Box, Tabs, Tab, Typography} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import MyProfile from './MyProfile';
import MyQuiz from './MyQuiz';
import '../../styles/mypage/Mypage.scss';

const MyPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const getTitle = () => {
    switch (tabIndex) {
      case 0:
        return "회원정보";
      case 1:
        return isSmallScreen ? "나의 퀴즈" : "내가 등록한 퀴즈";
      default:
        return "회원정보";
    }
  };

  return (
    <Box className="mypage_tabs">
      
      <Tabs value={tabIndex} onChange={handleTabChange}
        className="mypage_tabs-box"
        TabIndicatorProps={{
          children: <span className="MuiTabs-indicatorSpan" />,
        }}>
        <Tab className={`${tabIndex === 0  ? 'mypage_tabs-box--selected' : ''}`} label="회원정보" />
        <Tab className={`${tabIndex === 1  ? 'mypage_tabs-box--selected' : ''}`} label={isSmallScreen ? "나의 퀴즈" : "내가 등록한 퀴즈"}/>
      </Tabs>
      <Box className='mypage_title'>
      <Typography variant="VBT">{getTitle()}</Typography>
      </Box>
      {tabIndex === 0 && <MyProfile />}
      {tabIndex === 1 && <MyQuiz />}
    </Box>
  );
};

export default MyPage;
