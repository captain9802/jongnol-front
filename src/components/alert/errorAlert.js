import Swal from 'sweetalert2';
import '../../styles/alert/SwalAlert.scss';

const ErrorAlert = () => {
  const errorAlert = () => {
    return Swal.fire({
      title: '오류가 발생했습니다. 관리자에게 문의해주세요.',
      imageUrl: '/alert/error.png',
      imageWidth: '20rem',
      imageHeight: '20rem',
      imageAlt: '에러러',
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

  return { errorAlert };
};

export default ErrorAlert;
