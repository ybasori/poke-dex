import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./_redux";

import "./global.scss";
import "@fortawesome/fontawesome-free/css/all.css";

import Layout from "./components/Layout";

import DefaultLayout from "./layout/DefaultLayout";

import Home from "./pages/Home";
import Pokemon from "./pages/Pokemon";
import ComparePokemon from "./pages/ComparePokemon";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Layout Layout={DefaultLayout}>
          <Switch>
            <Route path="/compare-pokemon">
              <ComparePokemon />
            </Route>
            <Route path="/pokemon/:pokemon">
              <Pokemon />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Layout>
      </Router>
    </Provider>
  );
};

export default App;
