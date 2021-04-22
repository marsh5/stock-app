import React from 'react'
import LoginModal from './LoginModal';
import RegisterModal from './RegisterModal'
import { useSelector } from 'react-redux'


function DisplayModal() {

    const modal = useSelector(state => state.modal);

    if(modal === 'login'){
        return <LoginModal />
      } else if(modal === 'register'){
        return <RegisterModal />
      } else{
        return <></>
      }
}

export default DisplayModal
