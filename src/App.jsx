import React, { createContext, useState, useRef, useEffect } from 'react';
import WordleContext, { useSolutionWordList, useValidWordList, useSolutionWord } from './context/WordleContext';
import classNames from 'classnames/bind';
import Word from './components/Word/Word';
import Keyboard from './components/Keyboard/Keyboard';
import Toast from './components/Toast/Toast';

import './global.scss';

import Styles from './App.module.scss';
import WordGrid from './components/WordGrid/WordGrid';
const cx = classNames.bind(Styles);

const WORD_LENGTH = 5;
const NUM_GUESSES = 6;

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
  });

  const timeoutState = (setFunc, value, duration) => {
    setFunc(value);
    setTimeout(() => {
      setFunc(!value);
    }, duration);
  };

  const handleSubmit = (e) => {
    if (e) {
      e.preventDefault();
    }

    if (currentGuess.length > WORD_LENGTH) {
      timeoutState(setMaxChars, true, 2000);
      return;
    }

    if (!solutionWordList.includes(currentGuess) && !validWordList.includes(currentGuess)) {
      timeoutState(setInvalidWord, true, 2000);
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
      setMaxChars(false);
    } else if (e.key === 'Enter') {
      handleSubmit(e);
    } else if (e.key !== ' ' && String(e.key).match(/(\w)/g) && e.key.length === 1) {
      if (currentGuess.length < WORD_LENGTH) {
        setCurrentGuess(currentGuess.concat(e.key));
      } else {
        timeoutState(setMaxChars, true, 2000);
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
        {maxChars && <Toast failure>Please enter a word of length {WORD_LENGTH}</Toast>}
        {invalidWord && <Toast failure>Please enter a valid word</Toast>}
        {won && <Toast success duration={5000}>You won!</Toast>}
        {lost && <Toast failure duration={5000}>You lost! The correct word was {solutionWord}!</Toast>}
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