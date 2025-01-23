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
            return response.data.item;
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    } 
);

export const getQuiz = createAsyncThunk(
    'quiz/getquiz',
    async ({ searchCondition, searchKeyword }, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/quiz/getquiz`,
                {
                    params: {
                        searchCondition,
                        searchKeyword
                    }
                }
            );
            console.log(response.data.item);
            return response.data.item;
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    } 
);