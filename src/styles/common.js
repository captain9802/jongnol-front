import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: 'Pretendard, sans-serif',
    VBT: {
      fontSize: '35px',    // 큰 글씨 강조 (BT)
      fontWeight: 600,
      lineHeight: 1.2     // semibold
    },
    BT: {
      fontSize: '28px',    // 큰 글씨 강조 (BT)
      fontWeight: 600,
      lineHeight: 1.2      // semibold
    },
    SBT: {
      fontSize: '28px',    // 큰 글씨 강조 (BT)
      fontWeight: 500,
      lineHeight: 1.2      // regular
    },
    PBT: {                // PC 화면에서의 버튼 안 텍스트 (PBT)
      fontSize: '18px',    
      fontWeight: 400,
      lineHeight: 1.2      // regular
    },
    PCT: {                // 카드 대제목 (PCT)
      fontSize: '16px',    
      fontWeight: 600,
      lineHeight: 1.2      // semibold
    },
    MPCT: {                // 카드 대제목 (PCT)
      fontSize: '16px',    
      fontWeight: 400,
      lineHeight: 1.2      // semibold
    },
    PCE: {                // 카드 설명글 (PCE)
      fontSize: '14px',    
      fontWeight: 400,     // regular
      color: '#9E9E9E',
      lineHeight: 1.2     // 설명글 색상
    },
    TE: {                 // TextField 안의 텍스트 (TE)
      fontSize: '16px',    
      fontWeight: 400,     // regular
      color: '#1D1B20',
      lineHeight: 1.2     // 텍스트 색상
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '5px',
          textTransform: 'none',
          },
        // 기본 contained 버튼 스타일 (primary 색상)
        contained: {
          backgroundColor: '#F5904B',
          color: 'white',
          '&:hover': {
            backgroundColor: 'white',
            color:'#572973',
          },
        },
        // PC 화면에서의 작은 버튼 (SPB)
        sizeSmall: {
          width: '6.25rem',
          height: '2.5rem',
          fontSize: '1rem',
          padding: '0'
        },
        // PC 화면에서의 큰 버튼 (BBT)
        sizeLarge: {
          width: '12.5rem',
          height: '3.125rem',
          fontSize: '1.125rem',
          padding: '0'
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
    MuiTabs: {
      styleOverrides: {
        root: {    
          '& .MuiTabs-indicator': {
            display: 'flex',  // 인디케이터를 flex로 설정하여 가운데 정렬
            justifyContent: 'center',  // 인디케이터 중앙 정렬
          },
          '& .MuiTabs-indicatorSpan': {
            maxWidth: '70px',  // 인디케이터의 최대 너비 설정
            backgroundColor: 'white',  // 인디케이터 배경색을 하얀색으로 설정
          },
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',  // 기본 텍스트 변환을 하지 않음
          backgroundColor: 'white', // 기본 배경색
          fontSize: '16px',    
          fontWeight: 400,
          color: '#1D1B20',
          lineHeight: 1.2,  
    
          '&.Mui-selected': {
            color: 'white',         // 선택된 탭 글자 색상
            backgroundColor: '#F5904B',  // 선택된 탭 배경 색상
            fontSize: '16px',    
            fontWeight: 600,
            lineHeight: 1.2,
          },
    
          '&:hover': {
            backgroundColor: 'white', // 호버 시 배경 색상
            color: '#572973',         // 호버 시 글자 색상
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
      main: '#F5904B',
    },
    secondary: {
      main: '#CECECE',
    },
    background: {
      default: '#fff1e8',
    },
  },
  
});

export default theme;
