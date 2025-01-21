import { createSlice } from "@reduxjs/toolkit";
import { sendQuiz } from "../apis/quizApi"; // sendQuiz API 호출 import

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendQuiz.fulfilled, (state, action) => {
        alert('정상적으로 퀴즈가 등록되었습니다.');
        window.location.href = '/';
      })
      .addCase(sendQuiz.rejected, (state, action) => {
        alert("에러 발생. 관리자에게 문의하세요.")
        console.log(action.payload);
      });
  },
});

export default quizSlice.reducer;
