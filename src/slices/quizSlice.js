import { createSlice } from "@reduxjs/toolkit";
import { sendQuiz, getQuiz, getCountQP, solveQuiz, getMyQuiz, completeQuiz } from "../apis/quizApi";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    quizzes: [],
    myquizzes: [],
    resultquiz: JSON.parse(localStorage.getItem("resultquiz")) || [],
    loading: false,
    searchCondition: "",
    searchKeyword: "",
    quizzesCount: 0,
    usersCount: 0,
    hasMore: true,
    myquizhasMore: true,
    solvequiz: JSON.parse(localStorage.getItem("solvequiz")) || []
  },
  reducers: {
    change_searchCondition: (state, action) => {
      state.searchCondition = action.payload;
    },
    change_searchKeyword: (state, action) => {
      state.searchKeyword = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendQuiz.fulfilled, (state, action) => {
        alert('정상적으로 퀴즈가 등록되었습니다.');
        window.location.href = '/search';
      })
      .addCase(sendQuiz.rejected, (state, action) => {
        alert("에러 발생. 관리자에게 문의하세요.")
        console.log(action.payload);
      })
      .addCase(getQuiz.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getQuiz.rejected, (state, action) => {
        alert("퀴즈 목록 에러. 관리자에게 문의하세요.")
        console.log(action.payload);
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        console.log(action.payload);
        console.log(action.payload.hasMore);
        console.log(state.searchKeyword);
        if (state.searchKeyword !== action.payload.searchKeyword && action.payload.item.length !== 0 ) {
          state.searchKeyword = action.payload.searchKeyword;
          state.quizzes = action.payload.item;
        } else {
            state.quizzes = [...state.quizzes, ...action.payload.item];
        }
        state.hasMore = action.payload.hasMore;
        state.loading = false;
      })
      .addCase(getMyQuiz.fulfilled, (state, action) => {
        state.myquizzes = [...state.myquizzes, ...action.payload.item];
        state.myquizhasMore = action.payload.hasMore;
        state.loading = false;
      })
      .addCase(getMyQuiz.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(getMyQuiz.rejected, (state, action) => {
        alert("내 퀴즈 에러러. 관리자에게 문의하세요.")
        console.log(action.payload);
      })
      .addCase(getCountQP.fulfilled, (state, action) => {
        console.log(action.payload);
        state.quizzesCount = action.payload.quizzesCount;
        state.usersCount = action.payload.usersCount;
      })
      .addCase(getCountQP.rejected, (state, action) => {
        alert("퀴즈 유저 에러 발생. 관리자에게 문의하세요.")
        console.log(action.payload);
      })
      .addCase(solveQuiz.fulfilled, (state, action) => {
        state.solvequiz = action.payload;
        localStorage.setItem("solvequiz", JSON.stringify(state.solvequiz));
        console.log(action.payload);
        console.log(state.solvequiz);
      })
      .addCase(solveQuiz.rejected, (state, action) => {
        alert("퀴즈 유저 에러 발생. 관리자에게 문의하세요.")
        console.log(action.payload);
      })
      .addCase(completeQuiz.fulfilled, (state, action) => {
        state.resultquiz = action.payload;
        localStorage.setItem("resultquiz", JSON.stringify(action.payload));
      })
      .addCase(completeQuiz.rejected, (state, action) => {
        alert("퀴즈 결과 집계 중중 발생. 관리자에게 문의하세요.")
        console.log(action.payload);
      });
  },
  
});

export default quizSlice.reducer;
