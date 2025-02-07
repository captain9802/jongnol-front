import React from 'react';
import Swal from 'sweetalert2';
import '../../styles/alert/SwalAlert.scss';

const OkAlert = () => {
  const okAlert = ({ title }) => {
    return Swal.fire({
      title: title,
      imageUrl: '/alert/confirm.png',
      imageWidth: '20rem',
      imageHeight: '20rem',
      imageAlt: '성공공',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: "확인",
      customClass: {
        confirmButton: 'custom-submit-button',
        image: 'custom-img-button',
        title: 'custom-title-button'
      },
      willOpen: () => {
        document.querySelector('.swal2-container').style.zIndex = '9999';
      }
    });
  };

  return { okAlert };
};

export default OkAlert;
