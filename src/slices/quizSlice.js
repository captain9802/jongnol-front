import { createSlice } from "@reduxjs/toolkit";
import { sendQuiz, getQuiz } from "../apis/quizApi";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: [],
    loading: false,
    searchCondition: "",
    searchKeyword: "",
  },
  reducers: {
    change_searchCondition: (state, action) => {
      state.searchCondition = action.payload;
    },
    change_searchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendQuiz.fulfilled, (state, action) => {
        alert('정상적으로 퀴즈가 등록되었습니다.');
        window.location.href = '/';
      })
      .addCase(sendQuiz.rejected, (state, action) => {
        alert("에러 발생. 관리자에게 문의하세요.")
        console.log(action.payload);
      })
      .addCase(getQuiz.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      });
      
  },
  
});

export default quizSlice.reducer;
