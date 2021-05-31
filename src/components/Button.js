import React from 'react';
import './Button.css';

function Button({value, className, ...props}){

    const onClick = () => {
        switch(value){
            case("Clear"):
                return props.onClearPressed;
            case("Backspace"):
                return props.onBackPressed;
            case("="):
                return props.onEqualPressed;
            default:
                return props.onButtonPressed;
        }
    }

    return (
        <button value={value} className={`tc ${className}`} onClick={onClick()}>{value}</button>
    )
}

export default Button;