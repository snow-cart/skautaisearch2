import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';

/**Components */
// import Header from './components/Header';
// import Footer from './components/Footer'; 
import Site from './sites/index';


function App() {
  return (
    <div className="App">
      {/* <Header /> */}
      <Router><Site /></Router>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
