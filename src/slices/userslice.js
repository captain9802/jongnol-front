import { createSlice } from "@reduxjs/toolkit";
import { login, join, logout, updateUserProfile } from "../apis/userApi";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: sessionStorage.getItem("ACCESS_TOKEN") ? true : false,
        userNickName: '',
        userProfileImg: sessionStorage.getItem("UserProfile_Img"),
        userId: sessionStorage.getItem("User"),
    },
    reducers: {
        change_searchCondition: (state, action) => ({
            ...state,
            searchCondition: action.payload
        }),
        change_searchKeyword: (state, action) => ({
            ...state,
            searchKeyword: action.payload
        })
    },
    extraReducers: (builder) => {
        builder.addCase(join.fulfilled, (state, action) => {
            return state;
        });
        builder.addCase(join.rejected, (state, action) => {
            return state;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            sessionStorage.setItem("ACCESS_TOKEN", action.payload.token);
            sessionStorage.setItem("UserNickName", action.payload.userNickName);
            sessionStorage.setItem("UserProfile_Img", action.payload.profileImg);
            sessionStorage.setItem("User", action.payload.id);

            return {
                ...state,
                isLogin: true,
                userNickName: action.payload.userNickName,
                userProfileImg: action.payload.profileImg,
                userId: action.payload.id
            };
        });
        builder.addCase(login.rejected, (state, action) => {
            return state;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            sessionStorage.removeItem("ACCESS_TOKEN");
            localStorage.clear();
            sessionStorage.clear();
            return {
                ...state,
                isLogin: false
            }
        });
        builder.addCase(updateUserProfile.fulfilled, (state, action) => {
            sessionStorage.setItem("UserNickName", action.payload.userNickName);
            sessionStorage.setItem("UserProfile_Img", action.payload.profileImg);
            return {
                ...state,
                userNickName: action.payload.userNickName,
                userProfileImg: action.payload.profileImg
            };
        });
        builder.addCase(updateUserProfile.rejected, (state, action) => {
            return state;
        });
    }
});

export default userSlice.reducer;