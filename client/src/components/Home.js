import React from 'react'
import Nav from './Nav';
import HeroSection from './HeroSection';
import DisplayModal from './DisplayModal';
import { useDispatch, useSelector } from 'react-redux'

  function Home() {

    const dispatch = useDispatch();
    const modal = useSelector(state => state.modal);

    console.log('modalHomepage:', modal)

    // const DisplayModal = () => {
    //   if(modal === 'login'){
    //     return <LoginModal />
    //   } else if(modal === 'register'){
    //     return <RegisterModal />
    //   } else{
    //     return <></>
    //   }
    // }
    


    return (
    <div>
        <Nav />
        <HeroSection />
        <DisplayModal />
        
    </div>
    );
  }
  
  export default Home;
  