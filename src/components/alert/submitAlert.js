import React from 'react';
import Swal from 'sweetalert2';
import '../../styles/alert/SwalAlert.scss';

const SubmitAlert = () => {
  const submitAlert = ({ title, text }) => {
    return Swal.fire({
      title: title,
      text: text,
      imageUrl: '/alert/Ask.png',
      imageWidth: '20rem',
      imageHeight: '20rem',
      imageAlt: '퀴즈 제출 확인',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonText: "취소",
      confirmButtonText: "확인",
      reverseButtons: true,
      customClass: {
        cancelButton: 'custom-cancel-button',
        confirmButton: 'custom-submit-button',
        image: 'custom-img-button',
        title: 'custom-title-button'
      },
    });
  };

  return { submitAlert };
};

export default SubmitAlert;
