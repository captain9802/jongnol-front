import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, Typography, Box, Paper, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import '../styles/quiz/QuizDialog.scss';
import WarningAlert from './alert/warningAlert';

const QuizDialog = () => {
    const [imageDialog, setImageDialog] = useState(null);
    const [openDialog, setOpenDialog] = useState(true);
    const [maintitle, setMainTitle] = useState('');
    const [mainex, setMainEx] = useState('');
    const {warningAlert} = WarningAlert();
    const navi = useNavigate();

    useEffect(() => {
        const savedQuizData = JSON.parse(localStorage.getItem('newquiz')) || {};
            setMainTitle(savedQuizData.title || '');
            setMainEx(savedQuizData.description || '');
            setImageDialog(savedQuizData.thumbnail || null);
    }, []);

    useEffect(() => {
        console.log("maintitle" + maintitle)
        console.log("description" + mainex)

        if (imageDialog !== null) {
            const existingQuizData = JSON.parse(localStorage.getItem('newquiz')) || {};
            const quizData = {
                title: maintitle,
                description: mainex,
                thumbnail: imageDialog,
                questions: existingQuizData.questions || [],
            };
            localStorage.setItem('newquiz', JSON.stringify(quizData));
        }
    }, [imageDialog,maintitle,mainex])

    const handleCancel = () => {
        navi(-1);
    };

    const handleImageChangeDialog = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            
            reader.onloadend = () => {
              const base64Image = reader.result;
              setImageDialog(base64Image);
            };
        
            reader.readAsDataURL(file);
          }
    };

    const handleImageClickDialog = () => {
        document.getElementById('file-input-dialog').click();
    };

    const handleRemoveImageDialog = (event) => {
        event.stopPropagation();
        setImageDialog(null);
    };

    const handleSaveQuiz = () => {

        if (!imageDialog) {
            const randomImageIndex = Math.floor(Math.random() * 5) + 1;
            const randomImage = `/images/random/g_${randomImageIndex}.jpg`;
            convertImageToBase64(randomImage);
        }
        if (!maintitle || !mainex) {
            warningAlert({title:'퀴즈 제목과 설명을 작성해 주세요.'});
            return;
        }
            setOpenDialog(false);
    };

    const convertImageToBase64 = (imageUrl) => {
        const img = new Image();
        img.src = imageUrl;
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            setImageDialog(canvas.toDataURL());
        };
    };

    return (
        <Dialog
            className="creatquiz__dialog"
            open={openDialog}
            onClose={(event, reason) => {
                if (reason === "backdropClick") return;
                setOpenDialog(false);
            }}
            fullWidth
        >
            <Typography variant="BT">퀴즈 등록</Typography>
            <DialogContent>
                <Box className="creatquiz__dialogQuiz 1">
                    <Typography variant="PCT">퀴즈 제목</Typography>
                    <TextField
                        value={maintitle}
                        onChange={(e) => setMainTitle(e.target.value)}
                        placeholder="퀴즈 제목을 입력해주세요. (최대 30자)"
                        multiline
                        fullWidth
                        inputProps={{
                            maxLength: 30,
                        }}
                    />
                </Box>
                <Box className="creatquiz__dialogQuiz 2">
                    <Typography variant="PCT">퀴즈 설명</Typography>
                    <TextField
                        value={mainex}
                        onChange={(e) => setMainEx(e.target.value)}
                        placeholder="퀴즈 설명을 입력해주세요. (최대 100자)"
                        multiline
                        fullWidth
                        inputProps={{
                            maxLength: 100,
                        }}
                        className="creatquiz__dialogQuizEx"
                    />
                </Box>
                <Box className="creatquiz__dialogQuiz 3">
                    <Typography variant="PCT">퀴즈 썸네일</Typography>
                    <Paper
                        className="creatquiz__dialogImage"
                        onClick={handleImageClickDialog}
                    >
                        {imageDialog ? (
                            <Box className="creatquiz__imagePreviewContainer">
                                <img
                                    src={imageDialog}
                                    alt="selected"
                                    className="creatquiz__imagePreview"
                                />
                                <ClearIcon
                                    className="creatquiz__clearIcon"
                                    onClick={handleRemoveImageDialog}
                                />
                            </Box>
                        ) : (
                            <AddIcon className="creatquiz__icon" />
                        )}
                    </Paper>
                    <input
                        type="file"
                        id="file-input-dialog"
                        style={{ display: "none" }}
                        accept="image/*"
                        onChange={handleImageChangeDialog}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCancel}
                    color='primary'
                    variant="contained"
                    size="small"
                >
                    취소하기
                </Button>
                <Button
                    onClick={handleSaveQuiz}
                    color='primary'
                    className="creatquiz__button"
                    variant="contained"
                    size="small"
                >
                    등록하기
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default QuizDialog;
