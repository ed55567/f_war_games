import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

function Card(props){
	let id, classes;
	if(props.player == 'one'){
		id = 'playerOneCard';
	}else{
		id = 'playerTwoCard';
	}
	return (
		<div className="card">
			<img id={id} src={props.cardName}/>
		</div>
			
	)
}

export default Card;