import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import List from './pages/List';

import "./css/tailwind.output.css";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <main className="w-full h-full" style={{ minHeight: "100vh" }}>
          <Switch>
            <Redirect from="/" exact to="/all" />
            <Route path="/all" component={List} />
          </Switch>
        </main>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
