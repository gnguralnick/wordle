import React, { useEffect, useState } from 'react';

import Word from '../Word/Word';

import Styles from './WordGrid.module.scss';

const WordGrid = props => {
    const { guesses, currentGuess, wordLength, numGuesses, onSubmit, wonOrLost } = props;

    const [grid, setGrid] = useState(Array(numGuesses - 1).fill(''));

    useEffect(() => {
        if (wonOrLost) {
            setGrid(guesses);
        } else {
            setGrid([...guesses, currentGuess].concat(Array(numGuesses - guesses.length - 1).fill('')));
        }
        
    }, [guesses]);

    console.log(grid);

    const renderGrid = () => {
        return grid.map((word, index) => {
            if (index === guesses.length) {
                return <form onSubmit={onSubmit}>
                    <Word word={currentGuess} length={wordLength} />
                </form>;
            }
            return <Word key={index} word={word} length={wordLength} complete={word !== ''} />;
        });
    }

    return <>
    <div className={Styles['wordgrid']} style={{'--length': `${grid.length}`}}>
        {renderGrid()}
    </div>
    </>;
};

export default WordGrid;