import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/main/Home';
import Login from './pages/login/login';
import Join from './pages/login/Join';
import Layout from './pages/Layout';
import store from './store/store';
import { Provider } from 'react-redux';
import { Container, ThemeProvider } from '@mui/material';
import common from './styles/common';
import QuizCreate from './pages/quiz/creatquiz';

function App() {
  return (
    <ThemeProvider theme={common}>
    <Provider store={store}>
      <Router>
        <Container maxWidth={false} style={{ maxWidth: "1200px", padding: 0}}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='/join' element={<Join />} />
              <Route path='/login' element={<Login />} />
              <Route path='/quizcreate' element={<QuizCreate />}/>
            </Route>
          </Routes>
        </Container>
      </Router>
    </Provider>
    </ThemeProvider>
  );
}

export default App;
