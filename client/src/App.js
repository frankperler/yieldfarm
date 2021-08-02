import './App.css';
import { React, useState, createContext } from 'react'
import MarketPage from './Components/MarketPage/MarketPage'
import LandingPage from './Components/LandingPage/LandingPage'

export const AppContext = createContext(null);

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [userAddr, setUserAddr] = useState('')


  return (
    isAuth ?
      <MarketPage isAuth={isAuth} userAddr={userAddr} />
      :
      <LandingPage setIsAuth={setIsAuth} userAddr={userAddr} setUserAddr={setUserAddr} />
  );
}

export default App;
