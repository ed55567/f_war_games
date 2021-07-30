import React from 'react';
import Card from './Card';

const Board = React.createClass({

	getCardPath(symbol, value){
		let path = './cards/';	
		if (!isNaN(parseInt(value))){
			path += value + '_of_';
		}else{
			switch(value) {
				case 'J': 
					path += 'jack_of_';
					break;
				case 'Q': 
					path += 'queen_of_';
					break;
				case 'K':
					path += 'king_of_';
					break;
				case 'A':
					path += 'ace_of_';
					break;
				default:
					console.log('value invalid');
			}
		}
		switch(symbol) {
			case 'H':
				path += 'hearts.png';
				break;
			case 'C':
				path += 'clubs.png';
				break;
			case 'S':
				path += 'spades.png';
				break;
			case 'D':
				path += 'diamonds.png';
				break;
			default:
				console.log('invalid symbol');
		}

		return path;
	},
	render: function(){
		let symbolCardPlayerOne = this.props.playerOneCard[0];
		let symbolCardPlayerTwo = this.props.playerTwoCard[0];
		let valueCardPlayerOne = this.props.playerOneCard.slice(1);
		let valueCardPlayerTwo = this.props.playerTwoCard.slice(1);
		let cardPlayerOnePath = this.getCardPath(symbolCardPlayerOne, valueCardPlayerOne);
		let cardPlayerTwoPath = this.getCardPath(symbolCardPlayerTwo, valueCardPlayerTwo);
		return (
			<div className='board'>			
					<Card key={cardPlayerOnePath} player='one' cardName={cardPlayerOnePath} />
					<Card key='2' player='two' cardName={cardPlayerTwoPath} />
			</div>
		)
	}
});

export default Board;