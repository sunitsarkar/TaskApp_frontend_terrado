import axios from 'axios';
import{USER_CREATE_SUCCESS,USER_CREATE_FAIL,USER_CREATE_SUCCESS_CLEAR,
    USER_CREATE_FAIL_CLEAR,USER_GET_SUCCESS,USER_GET_FAIL,
    USER_GET_SUCCESS_CLEAR,USER_GET_FAIL_CLEAR} from '../types/userType';


export const userCreate = (data)=>{
    return async(dispatch)=>{
        try{
            let response = await axios.post('http://localhost:8080/register',data)
            console.log(response.data.message)
            dispatch({
                type: USER_CREATE_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                }
            })
        }catch(error){
            let data = error.response.data.message
        
            dispatch({
                type: USER_CREATE_FAIL,
                payload:{
                    errorMessage:data
                }
            })
        
        }
    }
}

export const userGet = (data)=>{
    return async(dispatch)=>{
        try{
            let response = await axios.post('http://localhost:8080/login',data)
            console.log(response.data.message);
            localStorage.setItem('token',response.data.data)
            dispatch({
                type: USER_GET_SUCCESS,
                payload: {
                    successMessage: response.data.message,
                    token:response.data.data,
                    emailData:response.data.email
                }
            })
        }catch(error){
            let data = error.response.data.message
            dispatch({
                type: USER_GET_FAIL,
                payload:{
                    errorMessage:data
                }
            })
        }
    }
}