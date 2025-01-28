import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Typography, Box } from "@mui/material";
import { solveQuiz } from "../apis/quizApi";
import '../styles/quiz/InQuiz.scss';
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const InQuiz = ({ open, onClose, onStart, quizData, questionCount }) => {
  const dispatch = useDispatch();
  const navi = useNavigate();


  const [selectedCount, setSelectedCount] = useState(questionCount);

  useEffect(() => {
    setSelectedCount(questionCount);
  }, [questionCount]);

  const getSelectableCounts = () => {
    const counts = [];
    if (questionCount <= 10) {
      counts.push(questionCount);
    } else if (questionCount <= 20) {
      counts.push(10, questionCount);
    } else if (questionCount <= 30) {
      counts.push(10, 20, questionCount);
    } else if (questionCount <= 40) {
      counts.push(10, 20, 30, questionCount);
    } else if (questionCount < 50) {
      counts.push(10, 20, 30, 40, questionCount);
    } else {
      counts.push(10, 20, 30, 40, 50);
    }
    return counts;
  };
  

  const handleStartClick = () => {
    onStart(selectedCount);
    console.log(quizData.id);
    dispatch(solveQuiz(quizData.id));
    navi(`/solvequiz/${quizData.id}`);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth className="inquiz_dialog">
      <DialogTitle className="inquiz_dialog_title">
        <Typography variant="SBT">{quizData.title}</Typography>
      </DialogTitle>
      <DialogContent className="inquiz_dialog_content">
        <Typography variant="MPCT">{quizData.description}</Typography>
        <Box className="inquiz_dialog_menuitem">
          <TextField
            select
            fullWidth
            label="문제 수 선택"
            value={selectedCount}
            onChange={(e) => setSelectedCount(Number(e.target.value))}
          >
            {getSelectableCounts().map((count) => (
              <MenuItem key={count} value={count}>
                {count} 문제
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <img
          src={quizData.thumbnail}
          alt="Quiz Thumbnail"
          style={{
            width: "100%",
            height: "auto",
            borderRadius: "8px",
            objectFit: "cover",
          }}
        />
      </DialogContent>
      <DialogActions className="inquiz_dialog_button">
        <Button onClick={onClose} color="primary" variant="contained">
          취소하기
        </Button>
        <Button onClick={handleStartClick} color="primary" variant="contained">
          시작하기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default InQuiz;
