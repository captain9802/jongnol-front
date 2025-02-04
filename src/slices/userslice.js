import { createSlice } from "@reduxjs/toolkit";
import { login, join, logout, updateUserProfile } from "../apis/userApi";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: sessionStorage.getItem("ACCESS_TOKEN") ? true : false,
        userNickName: '',
        userProfileImg: sessionStorage.getItem("UserProfile_Img")
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
            alert(`${action.payload.userNickName}님 회원가입을 축하합니다.`);
            window.location.href = '/login';
            
            return state;
        });
        builder.addCase(join.rejected, (state, action) => {
            alert("에러 발생. 관리자에게 문의하세요.")
            console.log(action.payload);
            return state;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            sessionStorage.setItem("ACCESS_TOKEN", action.payload.token);
            sessionStorage.setItem("UserNickName", action.payload.userNickName);
            sessionStorage.setItem("UserProfile_Img", action.payload.profileImg);

            return {
                ...state,
                isLogin: true,
                userNickName: action.payload.userNickName,
                userProfileImg: action.payload.profileImg
            };
        });
        builder.addCase(login.rejected, (state, action) => {
            if(action.payload === 200) {
                alert("존재하지 않는 아이디입니다.");
            } else if(action.payload === 201) {
                alert("비밀번호가 잘못됐습니다.");
            } else {
                alert("알 수 없는 에러발생.");
            }

            return state;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            sessionStorage.removeItem("ACCESS_TOKEN");
            localStorage.clear();
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
            console.log(action.payload.response.data.errorCode);
            return state;
        });
    }
});

export default userSlice.reducer;