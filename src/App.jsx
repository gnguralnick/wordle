import React, { useEffect, useState } from 'react';
import './App.css';
import WordleContext from './context/WordleContext';

function App() {

  return (
    <WordleContext>
      <div className="App">
        Hello, World!
      </div>
    </WordleContext>
  );
}

export default App;
