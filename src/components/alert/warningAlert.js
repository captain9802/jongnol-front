import React from 'react';
import Swal from 'sweetalert2';
import '../../styles/alert/SwalAlert.scss';

const WarningAlert = () => {
  const warningAlert = ({ title }) => {
    return Swal.fire({
      title: title,
      imageUrl: '/alert/excuseme.png',
      imageWidth: '20rem',
      imageHeight: '20rem',
      imageAlt: '빈칸 발생',
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

  return { warningAlert };
};

export default WarningAlert;
