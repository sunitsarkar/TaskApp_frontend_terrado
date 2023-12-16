import {
    TASK_ADD_SUCCESS, TASK_ADD_FAIL, TASK_ADD_SUCCESS_CLEAR,
    TASK_ADD_FAIL_CLEAR, TASK_GET_SUCCESS,TASK_DELETE_SUCCESS,TASK_UPDATE_SUCCESS
} from '../types/taskType'

const taskState = {
    taskSuccessMessage: '',
    taskErrorMessage: '',
    tasks: [],
}


export const taskReducer = (state = taskState, action) => {
    const { type, payload } = action;
    if (type === TASK_ADD_SUCCESS) {
        return {
            ...state,
            taskSuccessMessage: payload.message
        }

    }
    if (type === TASK_DELETE_SUCCESS) {
        return {
            ...state
        }
    }
    if(type === TASK_UPDATE_SUCCESS){
        return {
            ...state
        }
    }

    if (type === TASK_ADD_FAIL) {
        return {
            ...state,
            taskErrorMessage: payload.errorMessage
        }
    }
    if (type === TASK_ADD_SUCCESS_CLEAR) {
        return {
            ...state,
            taskSuccessMessage: ''
        }
    }
    if (type === TASK_ADD_FAIL_CLEAR) {
        return {
            ...state,
            taskErrorMessage: ''
        }
    }
    if (type === TASK_GET_SUCCESS) {
        return {
            ...state,
            tasks: payload.data
        }
    }
    return state
}