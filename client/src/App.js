import './App.css';
import { React, useState, useEffect } from 'react'
import MarketPage from './Components/MarketPage/MarketPage'
import LandingPage from './Components/LandingPage/LandingPage'

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userAddr, setUserAddr] = useState('')
  console.log("app", isAuth)
  
  return (
    isAuth ?
      <MarketPage isAuth={isAuth} userAddr={userAddr}/>
      :
      <LandingPage setIsAuth={setIsAuth} userAddr={userAddr} setUserAddr={setUserAddr}/>
  );
}

export default App;
