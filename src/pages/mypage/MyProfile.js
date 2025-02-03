import { Box, Paper, Typography, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/mypage/Mypage_Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../apis/userApi';
import ProfileImg from '../../components/profileImg';

const MyProfile = () => {
  const dispatch = useDispatch();
  const { isLogin, userNickName, userProfileImg } = useSelector((state) => state.user);

  const [profileImage, setProfileImage] = useState(userProfileImg);
  const [nickname, setNickname] = useState(userNickName);
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    userNickName: '',
    userProfileImg: ''
  });

  const handleImageClick = (image) => {
    const profileNum = extractNumberFromImagePath(image);
        setProfileImage(profileNum);
  };

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    setForm({
      userNickName: nickname,
      userProfileImg: profileImage 
    });
  }, [nickname, profileImage]);
  const handleUpdateClick = useCallback((e) => {
    e.preventDefault();

    if (!nickname.trim()) {
      alert("닉네임을 입력해주세요!");
      return;
    }

    dispatch(updateUserProfile(form))
      .then((result) => {
        if (result.type === 'user/updateprofile/fulfilled') {
          setIsEditing(false);
          alert("변경이 완료되었습니다.");
        } else {
          alert("중복 닉네임입니다. 다른 닉네임을 사용해주세요.");
          document.querySelector("#nickname").focus();
        }
      })
      .catch((error) => {
        console.log(error)
        alert("업데이트 실패! 다시 시도해 주세요.");
      });
  }, [dispatch, nickname, form]);

  useEffect(() => {
    if (isLogin) {
      const storedNickName = sessionStorage.getItem("UserNickName");
      const storedProfileImg = sessionStorage.getItem("UserProfile_Img");

      if (storedNickName && storedProfileImg) {
        setNickname(storedNickName);
        console.log(storedProfileImg)
        setProfileImage(storedProfileImg);
        };
      }
  }, [isLogin]);

  const images = Array.from({ length: 30 }, (_, index) => {
    const number = index + 1;
    const extension = number % 2 === 0 ? 'gif' : 'png'; 
    return `images/profile_image/${number}.${extension}`;
  });

  const extractNumberFromImagePath = (imagePath) => {
    const match = imagePath.match(/\/(\d+)\.(gif|png)$/);
    if (match) {
      return parseInt(match[1], 10);
    }
    return null;
  };

  return (
    <Box className="mypage">
      <Paper className="mypage_info">
        <Box className="mypage_profile">
          <ProfileImg number={profileImage} width={'150px'} height={'150px'} />
        </Box>
        {isEditing ? (
          <Box className="mypage_profile_name_editfield">
          <TextField
            id='nickname'
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
