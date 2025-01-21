import {persistReducer,FLUSH,REHYDRATE,PAUSE,PERSIST,PURGE,REGISTER} from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import {configureStore,combineReducers} from '@reduxjs/toolkit';
import userslice from '../slices/userslice';
import quizSlice from '../slices/quizSlice';

const reducers = combineReducers({
    user: userslice,
    quiz: quizSlice,
});

const persistConfig = {
    key: 'root',
    storage: storageSession
};

const persistreducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistreducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
            },
        }),
});

export default store;