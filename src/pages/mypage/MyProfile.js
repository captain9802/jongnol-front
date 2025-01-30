import { Avatar, Box, Paper, Typography, Button } from '@mui/material';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState } from 'react';
import '../../styles/mypage/Mypage_Profile.scss';

const MyProfile = () => {

  const [profileImage, setProfileImage] = useState("profile-image-url");

  const handleImageClick = (image) => {
    setProfileImage(image);
  };

  const images = [
    "images/profile_image/1.gif",
    "images/profile_image/2.png",
    "images/profile_image/3.gif",
    "images/profile_image/4.png",
    "images/profile_image/5.gif",
    "images/profile_image/6.gif",
    "images/profile_image/7.png",
    "images/profile_image/8.gif",
    "images/profile_image/9.png",
    "images/profile_image/10.gif",
    "images/profile_image/11.png",
    "images/profile_image/12.gif",
    "images/profile_image/13.png",
    "images/profile_image/14.gif",
    "images/profile_image/15.png",
    "images/profile_image/16.gif",
    "images/profile_image/17.png",
    "images/profile_image/18.gif",
    "images/profile_image/19.png",
    "images/profile_image/20.gif",
    "images/profile_image/21.png",
    "images/profile_image/22.gif",
    "images/profile_image/23.png",
    "images/profile_image/24.gif",
    "images/profile_image/25.png",
    "images/profile_image/26.png",
    "images/profile_image/27.png",
    "images/profile_image/28.gif",
    "images/profile_image/29.png",
    "images/profile_image/30.gif"
  ];

  return (
    <Box className="mypage">
      <Paper className='mypage_info'>
        <Box className='mypage_profile'>
          <Avatar src={profileImage} className='mypage_profile'/>
          <Box className='mypage_icon-container'>
            <FolderOpenIcon className='mypage_folder-icon' />
          </Box>
        </Box>
          <Typography variant='BT' className="mypage_profile_name">김삿갓
          <EditIcon className="mypage_profile_name_edit"/>
          </Typography>
          <Box className="mypage_info_password-button">
           <Button variant="contained" size="small" color="primary">비밀번호 변경</Button>
          </Box>
          <Box className="mypage_info_update-button">
           <Button variant="contained" size="small" color="primary">업데이트</Button>
          </Box>
          <Box className="mypage_info_image">
            {images.map((images, index) => (
            <Box key={index} className="mypage_info_image-list" onClick={() => handleImageClick(images)}>
                <img src={images} alt="Icon" className="mypage_info_image-box" />
            </Box>
          ))}
          </Box>
      </Paper>
      <Box className="mypage_delete-button">
          <Button variant="contained" size="sizeLarge " color="primary" sx={{backgroundColor: '#B3261E'}}>회원탈퇴</Button>
      </Box>
    </Box>
  )
}

export default MyProfile;
