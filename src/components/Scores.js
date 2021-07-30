import React from 'react';

function Scores(props){
	return (
		<div className="scoreboard">
			<h3>ScoreBoard</h3>
			<p className="scores">
				P1  <b>{props.scorePlayerOne}</b> : <b>{props.scorePlayerTwo}</b>   P2
			</p>
		</div>
	)
}

export default Scores;