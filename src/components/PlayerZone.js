import React from 'react';

function PlayerZone(props){
	let cards = props.cards;
    return (
        <div className={props.name == 'Player One' ? 'one' : 'two'}>
            <h1>{props.name}</h1>
            <p className='cards-left'>Cards Left: {props.numberOfCards}
            	<img className='deck-img' src='deck.jpg'/>
            </p>
            
         </div>
    );
};

export default PlayerZone;
