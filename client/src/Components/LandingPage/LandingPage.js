import {React, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import MarketPage from '../MarketPage/MarketPage'
import Button from '@material-ui/core/Button';

const Moralis = require('moralis');

export default function LandingPage(props) {

  useEffect(async () => {
    await Moralis.initialize(process.env.MORALIS_APP_ID); // Application id from moralis.io
    Moralis.serverURL = process.env.MORALIS_SERVER
  }, [])

  return (
    <Router>
      <div>
        <Button
          onClick={async () => {
            let user = await Moralis.Web3.authenticate();
            props.setIsAuth(true);
          }}
        >
          <Link to="/home">App</Link>
        </Button>
        <hr />

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route path="/home">
            <MarketPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}