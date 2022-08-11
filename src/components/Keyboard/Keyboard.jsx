import React from 'react';
import classNames from 'classnames/bind';

import backspace from '../../icons/backspace.png';

import Styles from './Keyboard.module.scss';

const cx = classNames.bind(Styles);

const Keyboard = props => {
    const {keyboardState, onClick, onSubmit} = props;
    const {correct, kinda, incorrect} = keyboardState;

    const rows = [
        'qwertyuiop',
        ' asdfghjkl ',
        'EzxcvbnmD'
    ]

    const renderChar = (char, index) => {
        if (char === 'D') {
            return <button key={index} className={cx('delete')} onClick={() => onClick({key: 'Backspace'})}>
                <img src={backspace} alt="Delete" />
            </button>;
        } else if (char === 'E') {
            return <button key={index} className={cx('submit')} onClick={() => onSubmit()}>
                <span>Enter</span>
            </button>;
        } else if (char === ' ') {
            return <div key={index} className={cx('spacer')}></div>;
        }
        return <button
            key={index}
            onClick={() => onClick({key: char})}
            className={cx(
                'char',
                {'correct': correct.includes(char)},
                {'kinda': kinda.includes(char)},
                {'incorrect': incorrect.includes(char)})}>
            <span>{char}</span>
        </button>;
    }

    return <div className={cx('keyboard')}>
        {rows.map((row, index) => {
            return <div key={index} className={cx('row')}>
                {row.split('').map(renderChar)}
            </div>;})
        }
    </div>
};

export default Keyboard;