import { Box, Tabs, Tab, Typography} from '@mui/material';
import { useMediaQuery } from '@mui/material';
import React, { useState } from 'react';
import MyProfile from './MyProfile';
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
        TabIndicatorProps={{ sx: { backgroundColor: '#F5904B' }}}
        className="mypage_tabs-box">
        <Tab label="회원정보" />
        <Tab label={isSmallScreen ? "나의 퀴즈" : "내가 등록한 퀴즈"} />
      </Tabs>
      <Box className='mypage_title'>
      <Typography variant="VBT">{getTitle()}</Typography>
      </Box>
      {tabIndex === 0 && (
         <MyProfile /> 
      )}
    </Box>
  );
};

export default MyPage;
