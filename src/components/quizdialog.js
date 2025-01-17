import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, Typography, Box, Paper, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';
import '../styles/quiz/QuizDialog.scss';

const QuizDialog = ({}) => {
    const [imageDialog, setImageDialog] = useState(null);
    const [openDialog, setOpenDialog] = useState(true);
    const [maintitle, setMainTitle] = useState('');
    const [mainex, setMainEx] = useState('');

    const navi = useNavigate();

    const handleCancel = () => {
        navi(-1);
      };

      const handleImageChangeDialog = (event) => {
        const file = event.target.files[0];
        if (file) {
          setImageDialog(URL.createObjectURL(file));
        }
      };
    
      const handleImageClickDialog = () => {
        document.getElementById('file-input-dialog').click();
      };
    
      const handleRemoveImageDialog = (event) => {
        event.stopPropagation();
        setImageDialog(null);
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
            sx={{
              backgroundColor: "#C8DEB8",
              "&:hover": {
                backgroundColor: "#C8DEB8",
              },
            }}
            variant="contained"
            size="small"
          >
            취소하기
          </Button>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{
              backgroundColor: "#C8DEB8",
              "&:hover": {
                backgroundColor: "#C8DEB8",
              },
            }}
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