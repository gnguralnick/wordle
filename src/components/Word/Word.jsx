import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames/bind';

import { useSolutionWord } from '../../context/WordleContext';
import Styles from './Word.module.scss';

const cx = classNames.bind(Styles);

const Word = props => {
    const {word, length, complete} = props;
    const solutionWord = useSolutionWord();
    const [fullWord, setFullWord] = useState(Array(length).fill(' ').join(''));

    useEffect(() => {
        if (!complete && word && length) {
            setFullWord(word.concat(Array(length - word.length).fill(' ').join('')));
        } else if (complete && word && length) {
            setFullWord(word);
        } else if (!complete && !word && length) {
            setFullWord(Array(length).fill(' ').join(''));
        }
    }, [word, length]);
    
    return (
        <div className={cx('word')} style={{'--length': `${length}`}}>
        {fullWord.split('').map((char, index) => {
            return <div key={index} style={{'--index': `${index}`}}
                className={cx(
                    'char',
                    {'complete': complete},
                    {'incorrect': complete && !solutionWord.includes(char)},
                    {'kinda-correct': complete && solutionWord.includes(char) && char !== solutionWord[index]},
                    {'correct': complete && char === solutionWord[index]}
                )}>
                    <span>{char}</span>
            </div>;
        }
        )}
        </div>
    );
}

export default Word;