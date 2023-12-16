import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';

import { userReducer } from './reducers/userReducer';
import { taskReducer } from './reducers/taskReducer';



const rootReducer = combineReducers({

    user:userReducer,
    task:taskReducer

})

const store = configureStore({ reducer: rootReducer });

export default store;