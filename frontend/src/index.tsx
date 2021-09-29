import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import "assets/styles/tailwind.css";
import App from './components/App';
import CreateRoom from './views/CreateRoom';
import CreateQuestion from './views/CreateQuestion';
import EnterRoom from './views/EnterRoom';
import PlayerPlays from './views/PlayerPlays';
import PlayerResults from './views/PlayerResults'
import Index from './views/Index';

ReactDOM.render(
  <App>
    <BrowserRouter>
      <Switch>
        {/* add routes with layouts */}
        <Route path="/create-room" component={CreateRoom} />
        <Route path="/create-questions" component={CreateQuestion} />
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
