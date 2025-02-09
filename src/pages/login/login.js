import React, { useCallback, useState } from 'react';
import { Button, Container, Grid2, Link, Paper, TextField, Typography,IconButton, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../../apis/userApi';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../styles/login/login.scss';
import OkAlert from '../../components/alert/okAlert';
import WarningAlert from '../../components/alert/warningAlert';
import ErrorAlert from '../../components/alert/errorAlert';

const Login = () => {
    const [form, setForm] = useState({
        userName: '',
        userPw: ''
    });
    const {okAlert} = OkAlert();
    const {warningAlert} = WarningAlert();
    const {errorAlert} = ErrorAlert();

    const navi = useNavigate();
    const dispatch = useDispatch();

    const textFieldChanged = useCallback((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }, [form]);

    const handleLogin = useCallback((e) => {
        e.preventDefault();
        dispatch(login(form)).then((result) => {
            if (result.type === 'user/login/fulfilled') {
                okAlert({title:"로그인되었습니다."})
                navi("/");
            } else if (result.type === 'user/login/rejected') {
                if (result.payload === 200) {
                    warningAlert({title:"존재하지 않는 아이디입니다."});
                } else if (result.payload === 201) {
                    warningAlert({title:"비밀번호가 잘못됐습니다."});
                } else {
                    errorAlert();
                }
                
                setForm((prevForm) => ({
                    ...prevForm,
                    userPw: ''
                }));
            }
        });
    }, [form, dispatch, navi]);

    const handleBack = () => {
        navi(-1);
    };

    const handleHome = () => {
        navi('/');
    }

    return (
        <Container component='div' className='login'>
            <IconButton className='login__backarrow' onClick={handleBack}>
              <ArrowBackIcon/>
            </IconButton>
            <Box className='login__img' onClick={handleHome}>
            <img src='logo/4.png' alt='logo' className='login__img__logo'/>
            </Box>
          <Paper  className='login__paper'>
            <form onSubmit={handleLogin}>
                <Grid2 container spacing={2} sx={{ display: 'grid'}}>
                    <Grid2 className='login__title'>
                        <Typography component='h1' variant='BT' textAlign='center'>
                            로그인
                        </Typography>
                    </Grid2>
                    <Grid2 className='login__id'>
                        <TextField
                            name='userName'
                            variant='standard'
                            required
                            id='userName'
                            label='아이디를 입력해주세요.'
                            autoFocus
                            fullWidth
                            value={form.userName}
                            onChange={textFieldChanged}
                        />
                    </Grid2>
                    <Grid2>
                        <TextField
                            name='userPw'
                            variant='standard'
                            required
                            id='userPw'
                            label='비밀번호를 입력해주세요.'
                            fullWidth
                            type='password'
                            value={form.userPw}
                            onChange={textFieldChanged}
                        />
                    </Grid2>
                    <Grid2 container justifyContent='flex-end'>
                    <Grid2 item className='login__join'>
                        <Link href="/join" variant='body2'>
                            계정이 없으시면 회원가입하세요.
                        </Link>
                    </Grid2>
                </Grid2>
                    <Grid2>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'
                            className='login__button'>
                            로그인
                        </Button>
                    </Grid2>
                </Grid2>
            </form>
          </Paper>
        </Container>
    );
}

export default Login;
