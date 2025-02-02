import { Avatar, Box, Paper, Typography, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/mypage/Mypage_Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../apis/userApi';

const MyProfile = () => {
  const dispatch = useDispatch();

  const { isLogin, userNickName, userProfileImg } = useSelector((state) => state.user);

  const [profileImage, setProfileImage] = useState(userProfileImg || "profile-image-url");
  const [nickname, setNickname] = useState(userNickName);
  const [isEditing, setIsEditing] = useState(false);

  const handleImageClick = (image) => {
        setProfileImage(image);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleUpdateClick = useCallback((e) => {
    e.preventDefault();

    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요!");
      return;
    }

    console.log(profileImage);

    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("profileImage", profileImage);

    dispatch(updateUserProfile(formData))
      .then((result) => {
        if (result.type === 'user/updateUserProfile/fulfilled') {
          setIsEditing(false);
          alert("변경이 완료되었습니다.");
        } else {
          alert("업데이트 실패!");
        }
      })
      .catch((error) => {
        console.error("프로필 업데이트 실패:", error);
        alert("업데이트 실패! 다시 시도해 주세요.");
      });
  }, [dispatch, nickname]);

  useEffect(() => {
    if (isLogin) {
      const storedNickName = sessionStorage.getItem("UserNickName");
      const storedProfileImg = sessionStorage.getItem("UserProfile_Img");

      if (storedNickName && storedProfileImg) {
        setNickname(storedNickName);
        setProfileImage(storedProfileImg)
        };
      }
  }, [isLogin]);

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
      <Paper className="mypage_info">
        <Box className="mypage_profile">
          <Avatar src={profileImage} className="mypage_profile" />
        </Box>
        {isEditing ? (
          <Box className="mypage_profile_name_editfield">
          <TextField
            value={nickname}
            onChange={handleNicknameChange}
            variant="outlined"
            size="small"
            className="mypage_profile_name_editfield--textfield"
          />
          </Box>
        ) : (
          <Typography variant="BT" className="mypage_profile_name">
            {nickname}
            <EditIcon className="mypage_profile_name_edit" onClick={handleEditClick} />
          </Typography>
        )}
        <Box className="mypage_info_update-button">
          <Button variant="contained" size="small" color="primary" onClick={handleUpdateClick}>
            업데이트
          </Button>
        </Box>
        <Box className="mypage_info_image">
          {images.map((image, index) => (
            <Box key={index} className="mypage_info_image-list" onClick={() => handleImageClick(image)}>
              <img src={image} alt="Icon" className="mypage_info_image-box" />
            </Box>
          ))}
        </Box>
      </Paper>
      <Box className="mypage_delete-button">
        <Button
          variant="contained"
          size="sizeLarge"
          color="primary"
          sx={{ backgroundColor: '#B3261E' }}
        >
          회원탈퇴
        </Button>
      </Box>
    </Box>
  );
};

export default MyProfile;
