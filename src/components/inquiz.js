import React, { useState, useEffect } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Typography, Box } from "@mui/material";
import { solveQuiz, deleteQuiz } from "../apis/quizApi";
import '../styles/quiz/InQuiz.scss';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SubmitAlert from "./alert/submitAlert";
import ErrorAlert from "./alert/errorAlert";
import OkAlert from "./alert/okAlert";
import WarningAlert from "./alert/warningAlert";

const InQuiz = ({ open, onClose, onStart, quizData, questionCount }) => {
  const dispatch = useDispatch();
  const navi = useNavigate();
  const {submitAlert} = SubmitAlert();
  const {errorAlert} = ErrorAlert();
  const {okAlert} = OkAlert();
  const {warningAlert} = WarningAlert();
  const { userId } = useSelector((state) => state.user);

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
    dispatch(solveQuiz(quizData.id));
    navi(`/solvequiz/${quizData.id}`);
    onClose();
  };

  const handleDeleteClick = () => {
    submitAlert({
      title: `정말 퀴즈를 삭제하시겠습니까??`
    }).then(result => {
      if (result.isConfirmed) {
        dispatch(deleteQuiz(quizData.id))
          .then((response) => {
            if (response?.meta?.requestStatus === 'fulfilled') {
              okAlert({ title: "퀴즈가 삭제되었습니다." });
              onClose();
            } else {
              warningAlert({ title: "권한이 없습니다. 이 퀴즈를 삭제할 수 없습니다." });
            }
          })
          .catch((error) => {
            if (error) {
              errorAlert();
            }
          });
      }
    });
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
        {userId == quizData.userId && (
          <Box className="inquiz_dialog_button_box_delete">
            <Button onClick={handleDeleteClick} color="secondary" variant="contained" size="small" className="inquiz_dialog_button_box_delete_1">
              삭제하기
            </Button>
          </Box>
        )}
        <Box className="inquiz_dialog_button_box_submit">
        <Button onClick={onClose} color="primary" variant="contained" size="small" className="inquiz_dialog_button_box_submit_1">
          취소하기
        </Button>
        <Button onClick={handleStartClick} color="primary" variant="contained" size="small" className="inquiz_dialog_button_box_submit_2">
          시작하기
        </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default InQuiz;
