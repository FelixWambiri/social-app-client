import React from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { logout, setAuthenticated, getUser } from "./redux/actions/userActions";
import store from "./redux/store";
import axios from "axios";

// MUI stuff
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";

// components
import Navbar from "./components/layout/Navbar";
import themeObject from "./util/theme";
import AuthRoute from "./util/AuthRoute";

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";
import User from "./pages/user";

const theme = createMuiTheme(themeObject);

// axios.defaults.baseURL =
//   "https://us-central1-socialape-591a9.cloudfunctions.net/api";

const token = localStorage.FBIdToken;
if (!!token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logout());
    window.location.href = "/login";
  } else {
    console.log('The store object is >>>>>>>>>', store)
    // store.dispatch(setAuthenticated());
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUser());
  }
}
console.log('The store object is >>>>>>>>>', store)

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Navbar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={Home} />
          <AuthRoute exact path="/login" component={Login} />
          <AuthRoute exact path="/signup" component={Signup} />
          <Route exact path="/user/:handle" component={User} />
          <Route exact path="/user/:handle/scream/:screamId" component={User} />
        </Switch>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
