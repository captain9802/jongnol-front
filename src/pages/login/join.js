import React, { useCallback, useState } from 'react';
import { Button, Container, Grid2, Link, TextField, Typography, IconButton, Box, Paper } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { join } from '../../apis/userApi';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import '../../styles/login/join.scss';
import { Await, useNavigate } from 'react-router-dom';
import WarningAlert from '../../components/alert/warningAlert';
import ErrorAlert from '../../components/alert/errorAlert';
import OkAlert from '../../components/alert/okAlert';
import SubmitAlert from '../../components/alert/submitAlert';

const Join = () => {
    const [form, setForm] = useState({
        userName: '',
        userPw: '',
        userPwChk: '',
        userNickName: '',
    });
    const [NickNameChk,setNickNameChk] = useState(false);
    const [idChk, setIdChk] = useState(false);
    const [pwValidation, setPwValidtaion] = useState(false);
    const [pwChk, setPwChk] = useState(false);
    const dispatch = useDispatch();
    const navi = useNavigate();
    const {warningAlert} = WarningAlert();
    const {errorAlert} = ErrorAlert();
    const {okAlert} = OkAlert();
    const {submitAlert} = SubmitAlert();

    const textFiledchanged = useCallback((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });

        if (e.target.name === 'userNickName') {
            setNickNameChk(false);
            document.querySelector("#userNickName").removeAttribute('disabled');
            return;
        }

        if (e.target.name === 'userName') {
            setIdChk(false);
            document.querySelector("#usernameChk").removeAttribute('disabled');
            return;
        }

        if (e.target.name === 'userPw') {
            if (e.target.value === form.userPwChk) {
                setPwChk(true);
                document.querySelector("#password-check-success").style.display = 'block';
                document.querySelector("#password-check-fail").style.display = 'none';
            } else {
                setPwChk(false);
                document.querySelector("#password-check-success").style.display = 'none';
                document.querySelector("#password-check-fail").style.display = 'block';
            }
            return;
        }

        if (e.target.name === 'userPwChk') {
            if (e.target.value === form.userPw) {
                setPwChk(true);
                document.querySelector("#password-check-success").style.display = 'block';
                document.querySelector("#password-check-fail").style.display = 'none';
            } else {
                setPwChk(false);
                document.querySelector("#password-check-success").style.display = 'none';
                document.querySelector("#password-check-fail").style.display = 'block';
            }
            return;
        }
    }, [form]);

    const userNickNameCheck = useCallback(async () => {
        if (form.userNickName === '') {
            warningAlert({title:"닉네임을 입력해주세요."});
            document.querySelector("#userNickName").focus();
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/user/nickname-check`, {
                userNickName: form.userNickName
            });
            if (response.data.item.nicknameCheckResult === 'invalid nickname') {
                warningAlert({title:"사용중인 닉네임입니다. 다른 닉네임을 사용해주세요."});
                document.querySelector("#userNickName").focus();
                return;
            } else {
                submitAlert({
                    title: `${form.userNickName}는 사용가능한 닉네임입니다. 사용하시겠습니까?`
                }).then(result => {
                    if (result.isConfirmed) {
                        document.querySelector("#userNickName").setAttribute('disabled', true);
                        setNickNameChk(true);
                    }
                });
            }
        } catch (e) {
            errorAlert();
        }
    }, [form.userNickName]);

    const idCheck = useCallback(async () => {
        if (form.userName === '') {
            warningAlert({title:"닉네임을 입력해주세요."});
            document.querySelector("#userName").focus();
            return;
        }

        try {
            const response = await axios.post(`http://localhost:8080/user/id-check`, {
                userName: form.userName
            });
            if (response.data.item.idCheckResult === 'invalid id') {
                warningAlert({title:"중복된 아이디입니다. 다른 아이디로 변경해주세요."});
                document.querySelector("#userName").focus();
                return;
            } else {
                submitAlert({
                    title: `${form.userName}은 사용가능한 닉네임입니다. 사용하시겠습니까?`
                }).then(result => {
                    if (result.isConfirmed) {
                        document.querySelector("#userName").setAttribute('disabled', true);
                        setIdChk(true);
                    }
                });
            }
        } catch (e) {
            errorAlert();
        }
    }, [form.userName]);

    const validatePassword = (userPw) => {
        return /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*+=-]).{9,}$/.test(userPw);
    }

    const userPwBlur = useCallback((e) => {
        if (validatePassword(e.target.value)) {
            setPwValidtaion(true);
            document.querySelector("#password-validation").style.display = "none";
        } else {
            setPwValidtaion(false);
            document.querySelector("#password-validation").style.display = "block";
            document.querySelector("#userPw").focus();
        }
    }, []);

    const handleJoin = useCallback(async (e) => {
        e.preventDefault();

        if (!idChk) {
            warningAlert({title:"아이디 중복체크를 진행해주세요."});
            return;
        }

        if (!NickNameChk) {
            warningAlert({title:"닉네임 중복체크를 진행해주세요."});
            return;
        }

        if (!pwValidation) {
            warningAlert({title:"비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 설정해주세요."});
            document.querySelector("#userPw").focus();
            return;
        }

        if (!pwChk) {
            warningAlert({title:"비밀번호가 일치하지 않습니다."});
            document.querySelector("#userPwChk").focus();
            return;
        }

        try {
            const actionResult = await dispatch(join(form)).unwrap();
    
            okAlert({title:`${actionResult.userNickName}님 회원가입을 축하합니다.`});
            navi("/login")
        } catch (error) {
            errorAlert();
        }
    }, [form, NickNameChk, idChk, pwValidation, pwChk, dispatch]);

    const handleBack = () => {
        navi(-1);
    };

    const handleHome = () => {
        navi('/');
    }

    return (
        <Container component="div" maxWidth="xs" className="join">
             <IconButton className='join__backarrow' onClick={handleBack}>
              <ArrowBackIcon/>
            </IconButton>
            <Box className='join__img' onClick={handleHome}>
            <img src='logo/4.png' alt='logo' className='join__img__logo'/>
            </Box>
            <Paper className='join__paper'>
            <form onSubmit={handleJoin} className="join__form">
                <Grid2 container spacing={2} className="join__grid">
                    <Grid2 item xs={12} className="join__title">
                        <Typography component="h1" variant="BT" align="center">
                            회원가입
                        </Typography>
                    </Grid2>
                    <Grid2 item xs={12} sx={{display:'flex', alignItems:'center'}}>
                        <Box className='join__text 1'>
                         <Typography variant="PCT">닉네임</Typography>
                        </Box>
                        <TextField
                            name="userNickName"
                            variant="standard"
                            required
                            id="userNickName"
                            label="닉네임"
                            autoFocus
                            fullWidth
                            value={form.userNickName}
                            onChange={textFiledchanged}
                            className="join__input join__input--id"
                        />
                        <Button
                            name="userNickNameChk"
                            id="userNickNameChk"
                            color="primary"
                            size="small"
                            onClick={userNickNameCheck}
                            className="join__button join__button--id-check"
                        >
                            중복확인
                        </Button>
                    </Grid2>
                    <Grid2 item xs={12} sx={{display:'flex', alignItems:'center'}}>
                        <Box className='join__text 2'>
                         <Typography variant="PCT">아이디</Typography>
                        </Box>
                        <TextField
                            name="userName"
                            variant="standard"
                            required
                            id="userName"
                            label="아이디"
                            autoFocus
                            fullWidth
                            value={form.userName}
                            onChange={textFiledchanged}
                            className="join__input join__input--id"
                        />
                        <Button
                            name="usernameChk"
                            id="usernameChk"
                            color="primary"
                            size="small"
                            onClick={idCheck}
                            className="join__button join__button--id-check"
                        >
                            중복확인
                        </Button>
                    </Grid2>
                    <Grid2 item xs={12} sx={{display:'flex', alignItems:'center'}}>
                        <Box className='join__text 3'>
                         <Typography variant="PCT">비밀번호</Typography>
                        </Box>
                        <TextField
                            name="userPw"
                            variant="standard"
                            required
                            id="userPw"
                            label="비밀번호"
                            fullWidth
                            type="password"
                            value={form.userPw}
                            onChange={textFiledchanged}
                            onBlur={userPwBlur}
                            className="join__input join__input--password"
                        />
                    </Grid2>
                    <Typography
                            id="password-validation"
                            className="join__validation join__validation--password"
                            color="error"
                        >
                            비밀번호는 특수문자, 영문자, 숫자 조합의 9자리 이상으로 설정하세요.
                        </Typography>
                    <Grid2 item xs={12} sx={{display:'flex', alignItems:'center'}}>
                        <Box className='join__text 4'>
                         <Typography variant="PCT">비밀번호 재확인</Typography>
                        </Box>
                        <TextField
                            name="userPwChk"
                            variant="standard"
                            required
                            id="userPwChk"
                            label="비밀번호 확인"
                            fullWidth
                            type="password"
                            value={form.userPwChk}
                            onChange={textFiledchanged}
                            className="join__input join__input--password-check"
                        />                       
                    </Grid2>
                       <Typography
                            id="password-check-success"
                            className="join__validation join__validation--success"
                            color="success"
                        >
                            비밀번호가 일치합니다.
                        </Typography>
                        <Typography
                            id="password-check-fail"
                            className="join__validation join__validation--fail"
                            color="error"
                        >
                            비밀번호가 일치하지 않습니다.
                        </Typography>
                    <Grid2 item xs={12}>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="join__button join__button--submit"
                        >
                            회원가입
                        </Button>
                    </Grid2>
                </Grid2>
                <Grid2 container justifyContent="flex-end" className="join__link-container">
                    <Grid2 item>
                        <Link href="/login" variant="body2" className="join__link">
                            이미 계정이 있으시면 로그인하세요.
                        </Link>
                    </Grid2>
                </Grid2>
            </form>
            </Paper>
        </Container>
    );
}

export default Join;
