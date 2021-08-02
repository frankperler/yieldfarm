import { React, useState, useEffect } from 'react'
import MarketPage from './Components/MarketPage/MarketPage'
import LandingPage from './Components/LandingPage/LandingPage'

import './App.css';


function App() {
  const [isAuth, setIsAuth] = useState(false);

  return (

    isAuth ?
      <MarketPage isAuth={isAuth} />
      :
      <LandingPage isAuth={isAuth} setIsAuth={setIsAuth}/>
  );

}

export default App;
