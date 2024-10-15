import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard, sans-serif',
    BT: {
      fontSize: '28px',    // 큰 글씨 강조 (BT)
      fontWeight: 600,     // semibold
    },
    PBT: {                // PC 화면에서의 버튼 안 텍스트 (PBT)
      fontSize: '18px',    
      fontWeight: 400,     // regular
    },
    PCT: {                // 카드 대제목 (PCT)
      fontSize: '16px',    
      fontWeight: 600,     // semibold
    },
    PCE: {                // 카드 설명글 (PCE)
      fontSize: '14px',    
      fontWeight: 400,     // regular
      color: '#9E9E9E',    // 설명글 색상
    },
    TE: {                 // TextField 안의 텍스트 (TE)
      fontSize: '16px',    
      fontWeight: 400,     // regular
      color: '#1D1B20',    // 텍스트 색상
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '10px',  // 모든 버튼에 적용되는 border-radius
          textTransform: 'none', // 텍스트 대문자 변환 제거
          boxShadow: 'none',     // 버튼에 그림자 제거
          backgroundColor: 'white', // 기본 버튼 배경 흰색
          '&:hover': {
            backgroundColor: '#F5F5F5', // 호버 시 더 진한 흰색으로 변경
          },
        },
        // 기본 contained 버튼 스타일 (primary 색상)
        contained: {
          backgroundColor: 'white', // 기본 배경 흰색
          color: '#1D1B20',         // 기본 텍스트 색상
          '&:hover': {
            backgroundColor: '#F5F5F5', // 호버 시 더 진한 흰색으로 변경
          },
        },
        // PC 화면에서의 작은 버튼 (SPB)
        sizeSmall: {
          borderRadius: '10px',      // 보더 반경 10px
          width: '80px',
          height: '30px',
          fontSize: '16px',          // PBT 텍스트 크기
          padding: '0',
        },
        // PC 화면에서의 큰 버튼 (BBT)
        sizeLarge: {
          borderRadius: '10px',
          width: '450px',
          height: '40px',
          fontSize: '18px',          // PBT 텍스트 크기
          padding: '0',
        },
        // 취소 버튼 스타일
        containedSecondary: {
          backgroundColor: '#CECECE',
          '&:hover': {
            backgroundColor: '#BDBDBD', // 호버 시 더 진한 회색
          },
        },
      },
    },
  
    MuiTextField: {
      styleOverrides: {
        root: {
          '& input': {
            fontSize: '16px',        // TE 텍스트 크기
            fontWeight: 400,         // regular
            color: '#1D1B20',        // TextField 안의 텍스트 색상
          },
        },
      },
    },
  },
  palette: {
    primary: {
      main: '#1D1B20',    // primary 컬러
    },
  },
});

export default theme;
