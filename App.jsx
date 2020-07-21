import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { createBrowserHistory } from "history";
import LoginComponent from './components/Login.jsx';
import Onboarding from './components/Onboard.jsx';
import DashboardComponent from './components/Dashboard.jsx';
import WishlistComponent from './components/Wishlist.jsx';

const hist = createBrowserHistory();

export default function App() {
  return (
    <Router history={hist}>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>

          <Route path="/onboarding">
            <Onboarding />
          </Route>
          <Route path="/dashboard">
            <DashboardComponent />
          </Route>
          <Route path="/wishlist">
            <WishlistComponent />
          </Route>
          <Route path="/">
            <LoginComponent />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}