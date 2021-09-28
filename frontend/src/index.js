import React, { createContext, useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/styles/tailwind.css";

// layouts

//import Admin from "layouts/Admin.js";
import Index from "views/Index.js";
import CreateRoom from "views/CreateRoom";
import CreateQuestions from "views/CreateQuestion";
import EnterRoom from "views/EnterRoom"
import PlayerPlays from "views/PlayerPlays"
import PlayerResults from "views/PlayerResults"
import StateWrapper from 'components/StateWrapper';
import App from 'components/App';


ReactDOM.render(
  <App>
    <BrowserRouter>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/create-room" component={CreateRoom} />
        <Route path="/create-questions" component={CreateQuestions} />
        <Route path="/enter-room" component={EnterRoom} />
        <Route path="/player-plays" component={PlayerPlays} />
        <Route path="/player-results" component={PlayerResults} />
        <Route path="/" exact component={Index} />
        {/* add redirect for first page */}
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  </App>,
  document.getElementById("root")
);
