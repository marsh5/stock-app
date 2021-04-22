import React, { useState } from 'react'
import { Button } from './Button'
import { MdClose } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { modalDisplay } from '../reducers/modalReducer'
import authServices from '../services/authServices'
import { toast } from 'react-toastify';
import { isAuthenticated } from '../reducers/authReducer'
import '../css/Modal.css'

function LoginModal() {
    const dispatch = useDispatch();

    // const auth = useSelector(state => state.auth);

    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    })

    const { email, password } = inputs;

    const handleChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        const res = await authServices.postLogin(email, password)
        console.log('res', res)
        if(res){
            if(res.token){
                console.log('success')
                toast.success("Logged in")
                changeModuleDisplay('none')
                dispatch(isAuthenticated(true))
                localStorage.setItem("token", res.token)
            } else{   
                toast.error('Username or password is incorrect');
            }
            
        } else{
            console.log('fail')
            toast.error('Username or password is incorrect');
        }
        
    }

    const changeModuleDisplay = (module) => {
        dispatch(modalDisplay(module))
    }

    window.onclick = function(event) {
        if(event.target.firstChild !== null){
            if(event.target.firstChild.className === "modal-content"){
                changeModuleDisplay('none')
            }
        }
    }

    return (
        <div id="myModal" className="modal">
            <div className="modal-content">
                <span className="x-button" onClick={() => changeModuleDisplay('none')}><MdClose/></span>
                <h2>Log In</h2>
                <p>Don't have an account? <span onClick={() => changeModuleDisplay('register')}className="module-link">Sign Up</span></p>
               
                <form onSubmit={handleSubmit}>
                    <input type="email" name="email"
                    placeholder ="email" value={email}
                    onChange={handleChange} />

                    <input type="password" name="password" placeholder="password" className="form-control my-3"
                    value={password}
                    onChange={handleChange}/>

                    <Button buttonColor='light--blue' buttonSize='btn--small'>Log In</Button>

                </form>
            </div>
        </div>
    )
}

export default LoginModal
