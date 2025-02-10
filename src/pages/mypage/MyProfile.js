import { Box, Paper, Typography, Button, TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import React, { useState, useEffect, useCallback } from 'react';
import '../../styles/mypage/Mypage_Profile.scss';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, logout, updateUserProfile } from '../../apis/userApi';
import ProfileImg from '../../components/profileImg';
import WarningAlert from '../../components/alert/warningAlert';
import OkAlert from '../../components/alert/okAlert';
import ErrorAlert from '../../components/alert/errorAlert';
import { useNavigate } from 'react-router-dom';
import SubmitAlert from '../../components/alert/submitAlert';

const MyProfile = () => {
  const dispatch = useDispatch();
  const { isLogin, userNickName, userProfileImg } = useSelector((state) => state.user);
  const {warningAlert} = WarningAlert();
  const {okAlert} = OkAlert();
  const {errorAlert} = ErrorAlert();
  const {submitAlert} = SubmitAlert();
  const navi = useNavigate();

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
      okAlert({title:"닉네임을 입력해주세요!"});
      return;
    }

    dispatch(updateUserProfile(form))
      .then((result) => {
        if (result.type === 'user/updateprofile/fulfilled') {
          setIsEditing(false);
          okAlert({title:"변경이 완료되었습니다."});
        } else {
          warningAlert({title:"중복 닉네임입니다. 다른 닉네임을 사용해주세요."});
          document.querySelector("#nickname").focus();
        }
      })
      .catch((error) => {
        errorAlert();
      });
  }, [dispatch, nickname, form]);

  useEffect(() => {
    if (isLogin) {
      const storedNickName = sessionStorage.getItem("UserNickName");
      const storedProfileImg = sessionStorage.getItem("UserProfile_Img");

      if (storedNickName && storedProfileImg) {
        setNickname(storedNickName);
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

  const handleDeleteUser= () => {
      submitAlert({
        title: `정말 회원 탈퇴를 진행하시겠습니까?`
      }).then(result => {
        if (result.isConfirmed) {
          dispatch(deleteUser())
            .then((response) => {
              if (response?.meta?.requestStatus === 'fulfilled') {
                okAlert({ title: "회원탈퇴가 완료되었습니다." });
                dispatch(logout())
                navi("/");
              } else {
                errorAlert();
              }
            })
            .catch((error) => {
              if (error) {
                errorAlert();
              }
            });
        }
      });
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
          onClick={handleDeleteUser}
        >
          회원탈퇴
        </Button>
      </Box>
    </Box>
  );
};

export default MyProfile;
