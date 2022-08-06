import React, { useEffect } from 'react';
import './App.css';
import {getWordleData} from './scripts/wordleScraper';

function App() {

  useEffect(() => {
    getWordleData();
  }, []);

  return (
    <div className="App">
      Hello, World!
    </div>
  );
}

export default App;
