import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import App from '../../App'
import Button from '@material-ui/core/Button';

const Moralis = require('moralis');

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.
export default function LandingPage() {

  Moralis.initialize("gVyAd0mUU5Em5dn9DLEsPzUdzgMovzTti4j4wxCm"); // Application id from moralis.io
  Moralis.serverURL = "https://mzno7pj1kyf6.usemoralis.com:2053/server";

  return (
    <Router>
      <div>
        <Button>
          <Link to="/">Home</Link>
        </Button>
        <Button
          onClick={async () => {
            let user = await Moralis.Web3.authenticate();
            if(user) console.log(user)
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
          <Route exact path="/">
            <h1>You should log in with Metamask</h1>
          </Route>
          <Route path="/home">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}