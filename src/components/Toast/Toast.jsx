import React, {useState, useEffect, createContext} from "react";
import classNames from "classnames/bind";
import Styles from './Toast.module.scss';

const cx = classNames.bind(Styles);

const Toast = props => {

    const {children, success} = props;

    const duration = props.duration ? props.duration : 2000;

    const [visible, setVisible] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setVisible(false);
        }, duration);
    }, [duration]);

    if (!visible) return null;

    return <div className={cx('toast-container')} style={{'--duration': `${duration}ms`}}>
        <div className={cx('toast', {'success': success}, {'failure': !success})}>
            {children}
        </div>
    </div>
};

export default Toast;