import './App.css';
import { React, useState } from 'react'
import MarketPage from './Components/MarketPage/MarketPage'
import LandingPage from './Components/LandingPage/LandingPage'

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userAddr, setUserAddr] = useState('')
  
  return (
    isAuth ?
      <MarketPage isAuth={isAuth} userAddr={userAddr}/>
      :
      <LandingPage setIsAuth={setIsAuth} userAddr={userAddr} setUserAddr={setUserAddr}/>
  );
}

export default App;
