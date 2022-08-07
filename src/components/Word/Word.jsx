import React from 'react';
import classNames from 'classnames/bind';

import { useSolutionWord } from '../../context/WordleContext';
import Styles from './Word.module.scss';

const cx = classNames.bind(Styles);

const Word = props => {
    const {word} = props;
    const solutionWord = useSolutionWord();
    
    return (
        <div className={cx('word')} style={{'--length': `${word.length}`}}>
        {word.split('').map((char, index) => {
            if (char === solutionWord[index]) {
                return <span key={index} className={cx('char','correct')}>{char}</span>;
            } else if (solutionWord.includes(char)) {
                return <span key={index} className={cx('char','kinda-correct')}>{char}</span>;
            }
            return <span key={index} className={cx('char', 'incorrect')}>{char}</span>;
        }
        )}
        </div>
    );
}

export default Word;