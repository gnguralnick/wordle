import React, { createContext, useState } from 'react';
import WordleContext, { useSolutionWordList, useValidWordList, useSolutionWord } from './context/WordleContext';
import classNames from 'classnames/bind';
import Word from './components/Word/Word';

import Styles from './App.module.scss';
const cx = classNames.bind(Styles);

const WORD_LENGTH = 5;
const NUM_GUESSES = 5;

function App() {

  const solutionWord = useSolutionWord();
  const validWordList = useValidWordList();
  const solutionWordList = useSolutionWordList();

  const [guesses, setGuesses] = useState([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [maxChars, setMaxChars] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [invalidWord, setInvalidWord] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (currentGuess.length < WORD_LENGTH) {
      setMaxChars(true);
      return;
    }

    if (!solutionWordList.includes(currentGuess) && !validWordList.includes(currentGuess)) {

      setInvalidWord(true);
      return;
    }

    if (currentGuess === solutionWord) {
      setWon(true);
    } else if (guesses.length + 1 >= NUM_GUESSES) {
      setLost(true);
    }

    setGuesses([...guesses, currentGuess]);
    setCurrentGuess('');
    setMaxChars(false);
    setInvalidWord(false);
  };

  const handleGuessChange = (e) => {
    setInvalidWord(false);
    if (e.target.value.length > WORD_LENGTH) {
      setMaxChars(true);
      return;
    }
    else {
      setMaxChars(false);
    }
    setCurrentGuess(e.target.value);
  }

  return (
    <div>
      <h1>Welcome to Wordle!</h1>
      {guesses.map((guess, index) => <Word word={guess} key={index} />)}
      <form onSubmit={handleSubmit}>
        <input type="text" value={currentGuess} onChange={handleGuessChange} disabled={won || lost}/>
        <input type='submit' value='Submit' disabled={won || lost}/>
      </form>
      {maxChars && <p style={{color: 'red'}}>Please enter a word of length {WORD_LENGTH}</p>}
      {invalidWord && <p style={{color: 'red'}}>Please enter a valid word</p>}
      {won && <p style={{color: 'green'}}>You won!</p>}
      {lost && <p style={{color: 'red'}}>You lost! The correct word was {solutionWord}!</p>}
    </div>
  );
}

const withContext = () => {
  return (
    <WordleContext>
      <App />
    </WordleContext>
  );
}

export default withContext;