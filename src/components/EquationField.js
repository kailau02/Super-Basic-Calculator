import React from 'react';

function EquationField({equationText, equationTextEdited, onKeyPress}){
    return(
        <input type="text" className="f3 mb2 tr pa2" value={equationText} onChange={equationTextEdited} onKeyPress={onKeyPress}/>
    )
}

export default EquationField;