import { Avatar } from '@mui/material';
import React, { useEffect } from 'react';

const ProfileImg = ({ number,width,height,onClick }) => {
  const extension = number % 2 === 0 ? 'gif' : 'png';
  const imagePath = `/images/profile_image/${number}.${extension}`;

  return (
    <Avatar src={imagePath} alt={`Profile ${number}`} sx={{ width: {width}, height: {height}}} onClick={onClick}
    />
  );
};

export default ProfileImg;
