import React from 'react';
import Button from './Button';
import './ButtonGrid.css';
import buttonsJson from './Buttons.json';

function ButtonGrid({ onButtonPressed, onClearPressed, onBackPressed, onEqualPressed}){
    return(
        <div id='button-grid'>
            {buttonsJson.map(obj => {
                return <Button value={obj.value}className={obj.className} key={obj.value}
                            onButtonPressed={onButtonPressed}
                            onClearPressed={onClearPressed}
                            onBackPressed={onBackPressed}
                            onEqualPressed={onEqualPressed}
                        />
            })}
        </div>
    );
}

export default ButtonGrid;