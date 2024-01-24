import {
    TASK_ADD_SUCCESS, TASK_ADD_FAIL, TASK_ADD_SUCCESS_CLEAR,
    TASK_ADD_FAIL_CLEAR, TASK_GET_SUCCESS,TASK_DELETE_SUCCESS,TASK_UPDATE_SUCCESS
} from '../types/taskType'
import axios from 'axios'



export const taskkAdd = (data)=>{
    return async(dispatch)=>{
        try{
            let response = await axios.post('https://task-backend-1iky.onrender.com/addtask',data)
            dispatch({
                type:TASK_ADD_SUCCESS,
                payload:{
                    message:response.data.message
                }
            })

        }
        catch(error){
            let data = error.response.data.message
            dispatch({
                type: TASK_ADD_FAIL,
                payload:{
                    errorMessage:data
                }
            })
        }
    }
}

export const getTasks = (data)=>{
    const {token,email}=data;
    const headers = { "Authorization": token };
    return async(dispatch)=>{
        try{
            let response = await axios.get(`https://task-backend-1iky.onrender.com/gettask?user=${email}`,{ headers})
            dispatch({
                type:TASK_GET_SUCCESS,
                payload:{
                    data:response.data.data
                }
            })
        }catch(error){
            console.log(error)
        }
    }
}

export const deleteTasks = (data)=>{
    console.log('delete hitted')
    return async(dispatch)=>{
        try{
            let response = await axios.delete(`https://task-backend-1iky.onrender.com/deletetask?id=${data}`,)
            dispatch({
                type:TASK_DELETE_SUCCESS,
                payload:{
                    data:response.data.data
                }
            })
        }catch(error){
            console.log(error)
        }
    }
}

export const updateTasks = (data)=>{

    return async(dispatch)=>{
        try{
            let response = await axios.put(`https://task-backend-1iky.onrender.com/updatetask`,data)
            dispatch({
                type:TASK_UPDATE_SUCCESS,
                payload:{
                    data:response.data.data
                }
            })
            localStorage.removeItem('id')
        }catch(error){
            console.log(error)
        }
    }
}

