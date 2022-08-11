import React, { createContext, useState, useRef, useEffect } from 'react';
import WordleContext, { useSolutionWordList, useValidWordList, useSolutionWord } from './context/WordleContext';
import classNames from 'classnames/bind';
import Word from './components/Word/Word';
import Keyboard from './components/Keyboard/Keyboard';

import './global.scss';

import Styles from './App.module.scss';
import WordGrid from './components/WordGrid/WordGrid';
const cx = classNames.bind(Styles);

const WORD_LENGTH = 5;
const NUM_GUESSES = 5;

function App() {

  const solutionWord = useSolutionWord();
  const validWordList = useValidWordList();
  const solutionWordList = useSolutionWordList();

  const [guesses, setGuesses] = useState([]);
  const [keyboardState, setKeyboardState] = useState({correct: [], kinda: [], incorrect: []});
  const [currentGuess, setCurrentGuess] = useState('');
  const [maxChars, setMaxChars] = useState(false);
  const [won, setWon] = useState(false);
  const [lost, setLost] = useState(false);
  const [invalidWord, setInvalidWord] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  })

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (currentGuess.length > WORD_LENGTH) {
      setMaxChars(true);
      return;
    }

    if (!solutionWordList.includes(currentGuess) && !validWordList.includes(currentGuess)) {
      setInvalidWord(true);
      return;
    }

    const newCorrect = [...keyboardState.correct];
    const newKinda = [...keyboardState.kinda];
    const newIncorrect = [...keyboardState.incorrect];

    currentGuess.split('').forEach((char, index) => {
      if (solutionWord[index] === char) {
        newCorrect.push(char);
      } else if (solutionWord.includes(char)) {
        newKinda.push(char);
      } else {
        newIncorrect.push(char);
      }
    });

    setKeyboardState({correct: newCorrect, kinda: newKinda, incorrect: newIncorrect});

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

  const handleKeyDown = e => {
    if (won || lost) {
      return;
    }


    if (e.key === 'Backspace' && currentGuess.length === 0) {
      setCurrentGuess('');
    } else if (e.key === 'Backspace' && currentGuess.length > 0) {
      setCurrentGuess(currentGuess.slice(0, -1));
    } else if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key !== ' ' && String(e.key).match(/(\w)/g) && e.key.length === 1) {
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(currentGuess.concat(e.key));
      } else {
        setMaxChars(true);
      }
    }
  }

  return (
    <div className={cx('app')}>
      <div className={cx('header')}>
        <h1>Wordle!</h1>
      </div>

      <div className={cx('game-container')}>
        <WordGrid
          guesses={guesses}
          currentGuess={currentGuess}
          wordLength={WORD_LENGTH}
          numGuesses={NUM_GUESSES}
          onSubmit={handleSubmit}
          wonOrLost={won || lost}/>
        {maxChars && <p style={{color: 'red'}}>Please enter a word of length {WORD_LENGTH}</p>}
        {invalidWord && <p style={{color: 'red'}}>Please enter a valid word</p>}
        {won && <p style={{color: 'green'}}>You won!</p>}
        {lost && <p style={{color: 'red'}}>You lost! The correct word was {solutionWord}!</p>}
        <Keyboard keyboardState={keyboardState} onClick={handleKeyDown} onSubmit={handleSubmit}/>
      </div>
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