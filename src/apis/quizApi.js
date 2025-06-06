import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const sendQuiz = createAsyncThunk(
    'quiz/newquiz',
    async (quizData, thunkAPI) => {
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
            localStorage.removeItem('newquiz');
            return response.data.item;
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    } 
);

export const uploadImage = createAsyncThunk(
  'quiz/uploadImage',
  async (base64Image, thunkAPI) => {
    try {
      const imageDTO = { image: base64Image };

      const response = await axios.post(
        `http://localhost:8080/quiz/temporaryload`,
        imageDTO,
        {
          headers: {
            'Content-Type': 'application/json'
          },
        }
      );

      return response.data.imageUrl;
    } catch (e) {
      return thunkAPI.rejectWithValue(e);
    }
  }
);

export const deleteImage = createAsyncThunk(
    'quiz/deleteImage',
    async (ImageUrl, thunkAPI) => {
      try {
        const response = await axios.delete(
          `http://localhost:8080/quiz/deletetemporary`,
           {data: { image: ImageUrl }} ,
          {
            headers: {
              'Content-Type': 'application/json'
            },
          }
        );
        return response.data;
      } catch (e) {
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

export const getMyQuiz = createAsyncThunk(
    'quiz/getmyquiz',
    async ({ offset, limit  }, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/quiz/getmyquiz`,
                {
                    params: {
                        offset,
                        limit
                    },
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
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
  async ({ id, questionsCount, quizMode }, thunkAPI) => {
      try {
          const response = await axios.post(
              `http://localhost:8080/quiz/solvequiz/${id}`, 
              {questionsCount, quizMode}
          );
          return response.data.questions;
      } catch (e) {
          return thunkAPI.rejectWithValue(e);
      }
  }
);

export const deleteQuiz = createAsyncThunk(
    'quiz/deletequiz',
    async (id, thunkAPI) => {
        try {
            const response = await axios.delete(
                `http://localhost:8080/quiz/deletequiz/${id}`,{
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                }
            }
            );
            return response.data.item;
        } catch(e) {
            return thunkAPI.rejectWithValue(e.response.data);
        }
    } 
);

export const completeQuiz = createAsyncThunk(
    'quiz/completequiz',
    async (quizAnswers, thunkAPI) => {
      try {
        const questionDTOList = Object.keys(quizAnswers).map(key => {
          const questionId = parseInt(key, 10); 
          const tanswer = quizAnswers[key]; 
          return {
            id: questionId,
            tanswer: tanswer,
          };
        });
          const response = await axios.post(
          `http://localhost:8080/quiz/completequiz`,
           questionDTOList 
        );
        return response.data;
      } catch (e) {
        return thunkAPI.rejectWithValue(e);
      }
    }
  );
  