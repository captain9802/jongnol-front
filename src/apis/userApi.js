import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const join = createAsyncThunk(
    'user/join',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/user/join`,
                user
            );

            return response.data.item;
        } catch(e) {
            return thunkAPI.rejectWithValue(e);
        }
    } 
);

export const login = createAsyncThunk(
    'user/login',
    async (user, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/user/login`,
                user
            );

            return response.data.item;
        } catch(e) {
            return thunkAPI.rejectWithValue(e.response.data.errorCode);
        }
    }
);

export const logout = createAsyncThunk(
    'user/logout',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get(
                `http://localhost:8080/user/logout`,
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
)

export const updateUserProfile = createAsyncThunk(
    'user/updateprofile',
    async (form, thunkAPI) => {
        try {
            const response = await axios.post(
                `http://localhost:8080/user/updateprofile`,
                {
                    userNickName: form.userNickName,
                    profileImg: form.userProfileImg
                  },
                {
                    headers: {
                        Authorization: `Bearer ${sessionStorage.getItem("ACCESS_TOKEN")}`
                    }
                }
            );
            console.log(response.data.item);
            return response.data.item;
        } catch (e) {
            return thunkAPI.rejectWithValue(e);
        }
    }
);