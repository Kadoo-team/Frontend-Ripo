import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, BrowserRouter ,Switch } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import { Pages } from '@mui/icons-material';
import ProductPlantsPage from './Pages/ProductPlantsPage/ProductPlantsPage';
import ProductToolsPage from './Pages/ProductToolsPage/ProductToolsPage';
function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route exact path="/" component={HomePage}/>
        <Route exact path='/Homepage' exact component={HomePage} />
        <Route exact path="/ProductPlantsPage/:id" component={ProductPlantsPage}/>
        <Route exact path="/ProductToolsPage/:id" component={ProductToolsPage}/>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
