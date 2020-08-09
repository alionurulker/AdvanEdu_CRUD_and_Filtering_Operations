import React, { Component } from "react";
import './App.css';
import { store } from "./store";
import { Provider } from "react-redux";
import Home from './components/Home';
import { Container } from "@material-ui/core";
import { ToastProvider } from "react-toast-notifications";
import { Route, Switch, Redirect } from "react-router-dom";

class App extends Component {
  render() {
    return (

      <Provider store={store}>

        <ToastProvider autoDismiss={true}>
          <Container maxWidth="lg">
            <Redirect exact from="/" to="/home/student" />
            <Route
              exact
              path="/home/:page?"
              render={(props) => <Home {...props} />}
            />
          </Container>

        </ToastProvider>
      </Provider>
    );
  }
}

export default App;
