import React, { useState } from 'react'
import { Button } from './Button'
import { MdClose } from 'react-icons/md'
import { useDispatch } from 'react-redux'
import { modalDisplay } from '../reducers/modalReducer'
import { isAuthenticated } from '../reducers/authReducer'
import { toast } from 'react-toastify';
import authServices from '../services/authServices'
import '../css/Modal.css'

function LoginModal() {
    const dispatch = useDispatch();

    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: ''
    })

    const { email, password, name } = inputs;

    const handleChange = e => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (ev) => {
        ev.preventDefault()
        const res = await authServices.postRegister(name, email, password)
        console.log('res', res)

        if(res){
            if(res.token){
                console.log('success')
                toast.success("Registered Succesfully")
                changeModuleDisplay('none')
                dispatch(isAuthenticated(true))
                localStorage.setItem("token", res.token)
            } else{   
                toast.error(res);
            }
            
        } else{
            console.log('fail')
            toast.error('Error with registering');
        }
    }

    const changeModuleDisplay = (module) => {
        dispatch(modalDisplay(module))
    }

    // Close the dropdown if the user clicks outside of it
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
                <span className="x-button2" onClick={() => changeModuleDisplay('none')}><MdClose/></span>
                <h2>Sign Up</h2>
                <p>Already have an account? <span onClick={() => changeModuleDisplay('login')}className="module-link">Log In</span></p>
               
                <form onSubmit={handleSubmit}>
                <input type="text" name="name"
                    placeholder ="username" value={name}
                    onChange={handleChange} />
                    
                    <input type="email" name="email"
                    placeholder ="email" value={email}
                    onChange={handleChange} />

                    <input type="password" name="password" placeholder="password" className="form-control my-3"
                    value={password}
                    onChange={handleChange}/>

                    <Button buttonColor='light--blue' buttonSize='btn--small'>Sign Up</Button>

                </form>
            </div>
        </div>
    )
}

export default LoginModal
