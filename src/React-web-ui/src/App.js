import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes';
import './App.css';
import store from './store'
import Header from './components/header';
import CookingProcess from './components/cookingprocess';
const App = () => (
    <Provider store={store}>
      <div className="App">
        <div>
          <Header />
          <CookingProcess />
          <Router>
            <Routes />
          </Router> 
        </div>
      </div>
      </Provider>
);

export default App;
