import React, { useState, useEffect } from 'react'
import './style.css'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { userCreate,userGet } from '../store/action/userAction';
import { USER_CREATE_FAIL_CLEAR, USER_CREATE_SUCCESS_CLEAR } from '../store/types/userType';

export default function Register({ lrToggle, setLrToggle, setLoginToggle }) {

    const {successMessage, errorMessage, lsuccessMessage,lerrorMessage,token,email} = useSelector((state)=>state.user);
    const navigate = useNavigate();
    const localStorage=window.localStorage;

    const [registerData, setRegisterData] = useState({
        name: "",
        email: '',
        password: '',
        cpassword: ''
    })
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const dispatch = useDispatch()
    const registerHandler = (e) => {
        e.preventDefault();
        if (registerData.password != registerData.cpassword) {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: 'password and confirm password must be same',
            })
            return;
        }
        if(!/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(registerData.password)){
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: 'Password must contain minimum eight characters, at least one letter, one number and one special character',
            })
            return;
        }

        dispatch(userCreate(registerData));
    }

    useEffect(()=>{
        if(successMessage){
         Swal.fire({
        
        icon: 'success',
        title: successMessage,
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        dispatch({type:USER_CREATE_SUCCESS_CLEAR})
      }).then(()=>{
        setLrToggle("login")
      })
        }
        if(errorMessage){
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: errorMessage,
          }).then(()=>{
            dispatch({type:USER_CREATE_FAIL_CLEAR})
          })
        }
      
      },[errorMessage,successMessage])

      useEffect(()=>{
        if(lsuccessMessage){
         Swal.fire({
        
        icon: 'success',
        title: lsuccessMessage,
        showConfirmButton: false,
        timer: 1500
      }).then(()=>{
        dispatch({type:USER_CREATE_SUCCESS_CLEAR})
      }).then(()=>{
        localStorage.setItem('token',token);
        localStorage.setItem('email',email);
        window.location.reload()
      })
        }
        if(lerrorMessage){
          Swal.fire({
            icon: 'error',
            title: 'error',
            text: lerrorMessage,
          }).then(()=>{
            dispatch({type:USER_CREATE_FAIL_CLEAR})
          })
        }
      
      },[lerrorMessage,lsuccessMessage])



    const loginHandler = (e) => {
        e.preventDefault();
        dispatch(userGet(loginData));
    }

    const registerInputHandler = (e) => {
        setRegisterData({
            ...registerData,
            [e.target.name]: e.target.value
        })
    }

    const loginInputHandler = (e) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }


    return (
        <div className='regis-main'>

            {lrToggle === 'register' ? <div class="container mt-5" >
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">

                                Registration Form
                                <span onClick={(e) => setLrToggle('')} style={{ float: 'right', height: '30px', width: '30px', backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '15px', cursor: 'pointer' }}>X</span>
                            </div>
                            <div className="card-body" style={{ backgroundColor: 'rgb(244, 240, 240)' }}>
                                <form onSubmit={(e) => registerHandler(e)} style={{ display: 'flex', flexDirection: 'column' }}>
                                    <div className="form-group">
                                        <label for="name">Name</label>
                                        <input name='name' type="text" onChange={(e) => registerInputHandler(e)} className="form-control" id="name" placeholder="Enter your name" />
                                    </div>
                                    <div className="form-group">
                                        <label for="email">Email</label>
                                        <input name='email' type="email" onChange={(e) => registerInputHandler(e)} className="form-control" id="email" placeholder="Enter your email" />
                                    </div>
                                    <div className="form-group">
                                        <label for="password">Password</label>
                                        <input name='password' type="password" onChange={(e) => registerInputHandler(e)} className="form-control" id="password" placeholder="Enter your password" />
                                    </div>
                                    <div className="form-group">
                                        <label for="confirmPassword">Confirm Password</label>
                                        <input name='cpassword' type="password" onChange={(e) => registerInputHandler(e)} className="form-control" id="confirmPassword" placeholder="Confirm your password" />
                                    </div>
                                    <button type="submit" className="btn btn-primary" style={{ marginTop: '20px', width: '30%', marginLeft: '35%' }}>
                                        Register</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div> : <div style={{ marginTop: '5%' }}>
                <div className="container login-container">
                    <div className="row justify-content-center">
                        <div className="col-md-4">
                            <div className="card">
                                <div className="card-header text-center">Login
                                    <span onClick={(e) => setLrToggle('')}
                                        style={{
                                            float: 'right', height: '30px', width: '30px',
                                            backgroundColor: 'red', display: 'flex', alignItems: 'center',
                                            justifyContent: 'center', borderRadius: '15px', cursor: 'pointer'
                                        }}>X</span>
                                </div>
                                <div className="card-body">
                                    <form onSubmit={(e) => { loginHandler(e) }}>
                                        <div className="form-group">
                                            <label for="email">Email</label>
                                            <input name='email' type="email" onChange={(e) => loginInputHandler(e)} class="form-control" id="email" placeholder="Enter your email" />
                                        </div>
                                        <div className="form-group">
                                            <label for="password">Password</label>
                                            <input name='password' type="password" onChange={(e) => loginInputHandler(e)} class="form-control" id="password" placeholder="Enter your password" />
                                        </div>
                                        <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '3%', width: '30%', marginLeft: '35%' }}>Login</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>}
        </div>
    )
}
