import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendQuiz = createAsyncThunk(
    'quiz/newquiz',
    async (quizData, thunkAPI) => {
        console.log(quizData);
        try {
            const response = await axios.post(
                `http://localhost:8080/quiz/newquiz`,
                quizData,
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                    }
                }
            );
            localStorage.clear('newquiz');
            return response.data.item;
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    } 
);

export const getQuiz = createAsyncThunk(
    'quiz/getquiz',
    async ({ searchCondition, searchKeyword, offset, limit  }, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/quiz/getquiz`,
                {
                    params: {
                        searchCondition,
                        searchKeyword,
                        offset,
                        limit
                    }
                }
            );
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    } 
);

export const getCountQP = createAsyncThunk(
    'quiz/getcountqp',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/quiz/getcountqp`,
            );
            return response.data;
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    } 
);

export const solveQuiz = createAsyncThunk(
    'quiz/solvequiz',
    async (id, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/quiz/solvequiz/${id}`,
            );
            return response.data.questions;
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    } 
);