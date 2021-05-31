import React from 'react';

function AnswersList({answers}){
    const listItems = answers.map((val, i) => {
        return <li key={i} style={{listStyle:"circle"}}>{val}</li>
    })
    return(
        <div style={{textAlign:"left", paddingLeft:"50px"}}>
            <h3>Answers:</h3>
            <ol style={{paddingLeft:'25px'}}>
                {listItems}
            </ol>
        </div>

    );
}

export default AnswersList;