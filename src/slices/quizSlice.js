import { createSlice } from "@reduxjs/toolkit";
import { sendQuiz, getQuiz, getCountQP, solveQuiz, getMyQuiz, completeQuiz, deleteQuiz } from "../apis/quizApi";

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
    solvequiz: JSON.parse(localStorage.getItem("solvequiz")) || [],
    searchKeyword: ""
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
        return state;
      })
      .addCase(sendQuiz.rejected, (state, action) => {
        return state;
      })
      .addCase(getQuiz.pending, (state, action) => {
        if(state.searchKeyword !== action.meta.arg.searchKeyword && state.searchKeyword !== "alls") {
          state.quizzes = [];
          state.hasMore = true;
          state.loading = true;
        } else if(state.searchKeyword === "alls") {
          state.loading = false;
        }
      })
      .addCase(getQuiz.rejected, (state, action) => {
        return state;
      })
      .addCase(getQuiz.fulfilled, (state, action) => {
        const newSearchKeyword = action.meta.arg.searchKeyword === "all" ? "alls" : action.meta.arg.searchKeyword || "";
        const newQuizzes = action.payload.item || [];

        if (state.searchKeyword !== newSearchKeyword) {
          state.searchKeyword = newSearchKeyword;
          state.quizzes = newQuizzes;
        } else {
          state.quizzes = [...state.quizzes, ...newQuizzes];
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
      })
      .addCase(getCountQP.fulfilled, (state, action) => {
        state.quizzesCount = action.payload.quizzesCount;
        state.usersCount = action.payload.usersCount;
      })
      .addCase(getCountQP.rejected, (state, action) => {
      })
      .addCase(solveQuiz.fulfilled, (state, action) => {
        state.solvequiz = action.payload;
        localStorage.setItem("solvequiz", JSON.stringify(state.solvequiz));
      })
      .addCase(solveQuiz.rejected, (state, action) => {
        return state;
      })
      .addCase(completeQuiz.fulfilled, (state, action) => {
        state.resultquiz = action.payload;
        localStorage.setItem("resultquiz", JSON.stringify(action.payload));
      })
      .addCase(completeQuiz.rejected, (state, action) => {
        return state;
      })
      .addCase(deleteQuiz.fulfilled, (state, action) => {
        const deletedQuizId = action.meta.arg;
        state.myquizzes = state.myquizzes.filter(quiz => quiz.id !== deletedQuizId);
        state.quizzes = state.quizzes.filter(quiz => quiz.id !== deletedQuizId);
      })
      .addCase(deleteQuiz.rejected, (state, action) => {
        return state;
      });
  },
});

export default quizSlice.reducer;
