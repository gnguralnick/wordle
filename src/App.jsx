import React, { useEffect } from 'react';
import './App.css';
import {fetchWordleData} from './scripts/wordleScraper';

const WORDLE_URL = 'https://www.nytimes.com/games-assets/v2/wordle.ad4d1f42a5aee771f8d6557988a5fb7e99877fdc.js';
const PROXY_URL = 'https://sleepy-hamlet-25032.herokuapp.com/';

function App() {

  useEffect(() => {

    async function getWordleData() {
      const data = await fetchWordleData(PROXY_URL + WORDLE_URL);

      const solutionWordListStart = data.indexOf('he=[') + 3;
      const solutionWordListEnd = data.indexOf(']', solutionWordListStart);
      const solutionWordList = JSON.parse(data.substring(solutionWordListStart, solutionWordListEnd + 1));

      console.log(solutionWordList);

      const validWordListStart = data.indexOf('be=[') + 3;
      const validWordListEnd = data.indexOf(']', validWordListStart);
      const validWordList = JSON.parse(data.substring(validWordListStart, validWordListEnd + 1));

      console.log(validWordList);

    }

    getWordleData();
  }, []);

  return (
    <div className="App">
      Hello, World!
    </div>
  );
}

export default App;
