import React, {useEffect, useRef, useState} from 'react';
import classNames from 'classnames/bind';

import Styles from './WordInput.module.scss';

const cx = classNames.bind(Styles);

const WordInput = props => {
    const {word, onChange, length, refs} = props;

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && index === 0) {
            onChange(e, index);
        } else if (e.key === 'Backspace' && index !== 0) {
            console.log(e, index - 1);
            onChange(e, index - 1);
        }
    }

    useEffect(() => {
        if (refs.current?.length === length && refs.current.every(ref => ref !== null)) {
            refs.current.map((ref, index) => ref.addEventListener('keydown', (e) => handleKeyDown(e, index)));
        }

        return () => {
            if (refs.current?.length === length && refs.current.every(ref => ref !== null)) {
                refs.current.map((ref, index) => ref.removeEventListener('keydown', (e) => handleKeyDown(e, index)));
            }
        }
    }, []);

    return (
        <div className={cx('word')} style={{'--length': `${length}`}}>
        {word.map((char, index) => {
            return <div key={index} className={cx('char') + ' ' + index}>
                <input
                    type="text"
                    value={char}
                    ref={ref => refs.current[index] = ref}
                    onChange={e => onChange(e, index)}
                    disabled={word.length < index}/>
            </div>;
        }
        )}
        </div>
    );
}

export default WordInput;