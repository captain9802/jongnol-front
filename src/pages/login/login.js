import React, { useCallback, useState } from 'react';
import { Button, Container, Grid2, Link, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../../apis/userApi';
import { useNavigate } from 'react-router-dom';
import '../../styles/login/login.scss';

const Login = () => {
    const [form, setForm] = useState({
        userId: '',
        userPw: ''
    });

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
        dispatch(login(form));
        navi("/");
    }, [form, dispatch, navi]);

    return (
        <Container component='div' maxWidth="xs" style={{ marginTop: '8%' }} className='login'>
            <form onSubmit={handleLogin}>
                <Grid2 container spacing={2} sx={{ display: 'grid'}}>
                    <Grid2 >
                        <Typography component='h1' variant='h5' textAlign='center'>
                            로그인
                        </Typography>
                    </Grid2>
                    <Grid2>
                        <TextField
                            name='userId'
                            variant='outlined'
                            required
                            id='userId'
                            label='아이디'
                            autoFocus
                            fullWidth
                            value={form.userId}
                            onChange={textFieldChanged}
                        />
                    </Grid2>
                    <Grid2>
                        <TextField
                            name='userPw'
                            variant='outlined'
                            required
                            id='userPw'
                            label='비밀번호'
                            fullWidth
                            type='password'
                            value={form.userPw}
                            onChange={textFieldChanged}
                        />
                    </Grid2>
                    <Grid2>
                        <Button
                            type='submit'
                            fullWidth
                            variant='contained'
                            color='primary'>
                            로그인
                        </Button>
                    </Grid2>
                </Grid2>
                <Grid2 container justifyContent='flex-end'>
                    <Grid2 item>
                        <Link href="/join" variant='body2'>
                            계정이 없으시면 회원가입하세요.
                        </Link>
                    </Grid2>
                </Grid2>
            </form>
        </Container>
    );
}

export default Login;
