import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/main/Home';
import Main from './pages/main/Main';
import Login from './pages/login/login';
import Join from './pages/login/Join';
import Layout from './pages/Layout';
import store from './store/store';
import { Provider } from 'react-redux';
import { Container, ThemeProvider, CssBaseline  } from '@mui/material';
import common from './styles/common';
import QuizCreate from './pages/quiz/creatquiz';
import SolveQuiz from './pages/quiz/solvequiz';
import MyPage from './pages/mypage/MyPage';
import EerrorPage from './pages/errorPage';
import ResultQuiz from './pages/quiz/resultquiz';
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={common}>
       <CssBaseline />
          <Router>
            <Container maxWidth={false} style={{ maxWidth: "1440px", padding: 0}}>
              <Routes>
                  <Route index element={<Main />} />
                <Route element={<Layout />}>
                  <Route path='/search' element={<Home />} />
                  <Route path='/join' element={<Join />} />
                  <Route path='/login' element={<Login />} />
                  <Route path='/mypage' element={<MyPage/>}/>
                  <Route path='/quizcreate' element={<QuizCreate />}/>
                  <Route path='/solvequiz/:id' element={<SolveQuiz />}/>
                  <Route path='/resultquiz/:id' element={<ResultQuiz />}/>
                  <Route path="*" element={<EerrorPage />} />
                </Route>
              </Routes>
            </Container>
          </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
