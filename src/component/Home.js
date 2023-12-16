import React, { useEffect, useRef, useState } from 'react'
import './style.css'
import Register from './Register'
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { getTasks, taskkAdd, deleteTasks, updateTasks } from '../store/action/taskAction';
import { motion } from 'framer-motion';


export default function Home() {

    const dispatch = useDispatch();
    const [loginToggle, setLoginToggle] = useState(localStorage.getItem('token'));
    const [taskToggle, setTaskToggle] = useState(false);
    const [taskEditToggle, setTaskEditToggle] = useState(false);
    const [lrToggle, setLrToggle] = useState('');
    const { taskSuccessMessage, taskErrorMessage, tasks } = useSelector((state) => state.task);
    const { successMessage, errorMessage, lsuccessMessage, lerrorMessage, token, email } = useSelector((state) => state.user);

    const [id, setId] = useState(null)
    const [temp, setTemp] = useState(null)
    // console.log(tasks)
    const data = {
        token: localStorage.token,
        email: localStorage.email
    }

    useEffect(() => {
        dispatch(getTasks(data))
    }, [])

    const logoutHandler = () => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to log out!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Logout'
        }).then((result) => {
            if (result.isConfirmed) {

                Swal.fire(
                    'Logged Out!',
                    'You have successfully logged out.',
                    'success'
                )
                localStorage.removeItem('token');
                setLoginToggle(false)
            }
        })
    }

    const [formData, setFormData] = useState({
        task: '',
        user: localStorage.email
    });

    const [editFormData, setEditFormData] = useState({
        task: temp,
        user: localStorage.email
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditFormData({
            ...editFormData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(taskkAdd(formData));
        window.location.reload();
    };

    const handelTaskDelete = (id) => {
        dispatch(deleteTasks(id));
        window.location.reload();
    }

    const handelTaskUpdate = (idx) => {
        console.log(idx)
        setTaskEditToggle(true);
        setTaskToggle(false)
        localStorage.setItem('id', idx)
    }

    const handleEditSubmit = () => {
        dispatch(updateTasks({ ...editFormData, id: id }));
        window.location.reload();
    }

    return (
        <div>
            {lrToggle ? <Register lrToggle={lrToggle} setLrToggle={setLrToggle} setLoginToggle={setLoginToggle} /> :
                <div className='home-main'>
                    <nav className="navbar navbar-expand-lg bg-body-tertiary">
                        <div className="container">
                            <a className="navbar-brand" href="#"><span className="text-warning">TASK.</span>App</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            {!loginToggle ? <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0" id='lg'>
                                    <li className="nav-item">
                                        <button type="button" onClick={() => setLrToggle('login')} className="btn btn-outline-success">Login</button>
                                    </li>

                                    <li className="nav-item">
                                        <button type="button" className="btn btn-outline-info" onClick={() => setLrToggle('register')}>Register</button>
                                    </li>
                                </ul>
                            </div> : <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav ms-auto mb-2 mb-lg-0" >
                                    <li className="nav-item">
                                        <i className="fa fa-user" style={{ marginTop: '5px', fontSize: '22px', marginRight: '5px' }}></i>
                                    </li>

                                    <li className="nav-item">
                                        <span className="navbar-brand">{localStorage.getItem('email')}</span>
                                    </li>
                                    <li className='nav-item'>
                                        <button type="button" onClick={logoutHandler} className="btn btn-warning">Logout</button>
                                    </li>
                                </ul>
                            </div>}
                        </div>
                    </nav>
                    {!loginToggle ? <div className='home-body'>
                        <div className="wrapper">
                            <div className="static-txt">Your own Task app</div>
                            <ul className="dynamic-txts">
                                <li><span>Create</span></li>
                                <li><span>Update</span></li>
                                <li><span>Delete</span></li>
                            </ul>
                        </div>
                    </div> : null}

                    {loginToggle &&
                        <div className="container">
                            <button type="button" onClick={() => { setTaskToggle(!taskToggle); setTaskEditToggle(false) }} className="btn btn-primary" style={{ marginTop: '3%' }}>{taskToggle ? 'close' : 'Add New Task'}</button>
                        </div>}
                    {loginToggle && <div className="task-container">

                        {taskToggle && <div className="row justify-content-center">
                            <div className="col-md-6">
                                <form onSubmit={handleSubmit}>
                                    <h2 className="text-center">Add New Task</h2>

                                    <div className="form-group">
                                        <label htmlFor="task">Task:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="task"
                                            name="task"
                                            value={formData.task}
                                            onChange={handleInputChange}
                                            placeholder="Enter task"
                                            required
                                        />
                                    </div>


                                    <button type="submit" className="btn btn-primary btn-block" style={{ marginTop: '3%', marginLeft: '44%' }}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>}
                        <div className="container-xxl card-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'flex-start', justifyContent: 'space-around' }}>
                            {tasks && tasks.length > 0 ? tasks.map((value, index) => {
                                return <motion.div
                                    initial={{ x: 1000 }}
                                    animate={{ x: 0 }}
                                    transition={{ type: "spring", duration: 1.2 }}
                                    className="task" key={index} style={{ width: '18rem', marginTop: '3%', cursor: 'pointer' }}
                                    >
                                    <div className="card-body">
                                        <h3>Task {index+1}</h3>
                                        <hr/>
                                        <h5 className="card-title"> {value.task}</h5>
                                    </div>
                                    <div style={{ display: 'flex', justifyContent: 'space-around', marginLeft: '70%',marginBottom:'3px' }}>
                                        <button style={{ border: 'none' }} onClick={(e) => { e.preventDefault(); handelTaskDelete(value._id) }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                            </svg>
                                        </button>


                                        <button type="button" style={{ border: 'none' }} data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={(e) => { e.preventDefault(); setId(value._id); editFormData.task = value.task }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                            </svg>
                                        </button>

                                        <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                            <div class="modal-dialog">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Task</h1>
                                                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div className="form-group">
                                                            <label htmlFor="task">Task:</label>
                                                            <input
                                                                type="text"
                                                                className="form-control"
                                                                id="task"
                                                                name="task"
                                                                value={editFormData.task}
                                                                onChange={handleEditInputChange}
                                                                placeholder='Entre Task'
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { editFormData.task = '' }}>Close</button>
                                                        <button type="button" class="btn btn-primary" onClick={(e) => { e.preventDefault(); handleEditSubmit() }}>Save changes</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            }) : null
                            }
                        </div>

                    </div>}
                </div>}
        </div>
    )
}
