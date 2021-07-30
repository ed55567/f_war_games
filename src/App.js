import React from 'react';
import './App.css';
import PlayerZone from './components/PlayerZone';
import Board from './components/Board';
import Scores from './components/Scores';

const CARDS = ['D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10', 'DJ', 'DQ', 'DK', 'DA',
                'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 'C10', 'CJ', 'CQ', 'CK', 'CA',
                'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 'H10', 'HJ', 'HQ', 'HK', 'HA',
                'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8', 'S9', 'S10', 'SJ', 'SQ', 'SK', 'SA']

const App = React.createClass({
    getInitialState: function(){
        return {
            playerOne: {
                'wins': 0,
                'cards': [],
                'cardPlayed' : ''
            },
            playerTwo: {
                'wins': 0,
                'cards' : [],
                'cardPlayed' : '',
            },
            cardsToWin: []
        }
    },
    distributeCardsAtBeginningOfGame: function(){
        let deck = this.shuffle(CARDS);
        for (let i  = 0; i < deck.length; i++) {
            if (i % 2 == 0) {
                this.state.playerOne.cards.push(deck[i]);
            }else{
                this.state.playerTwo.cards.push(deck[i]);
            }
        }

        this.setState(this.state);
        this.pickCards();
    },
    shuffle: function(cards){
        let currIdx = cards.length, temporaryValue, randomIdx;

        while(0 !== currIdx){
            randomIdx = Math.floor(Math.random() * currIdx);
            currIdx -= 1;

            temporaryValue = cards[currIdx];
            cards[currIdx] = cards[randomIdx];
            cards[randomIdx] = temporaryValue;
        }

        return cards;
    },
    componentWillMount() {
        console.log('mounted');
      this.distributeCardsAtBeginningOfGame();
    },
    pickCards: function(){
        let _self = this;
        let playerOneCard = this.state.playerOne.cards.shift();
        let playerTwoCard = this.state.playerTwo.cards.shift();
        this.state.playerOne.cardPlayed = playerOneCard;
        this.state.playerTwo.cardPlayed = playerTwoCard;
        this.setState(this.state);
        setTimeout(function(){
            _self.compareValues();
        }, 3000);
    },
    compareValues: function(){
        let playerOneCardValue = this.state.playerOne.cardPlayed.slice(1);
        let playerTwoCardValue = this.state.playerTwo.cardPlayed.slice(1);
        let playerOneCard = this.state.playerOne.cardPlayed;
        let playerTwoCard = this.state.playerTwo.cardPlayed;
        if(playerOneCardValue == playerTwoCardValue) {
            //draw
            console.log('draw');
            this.state.cardsToWin.push(playerOneCard);
            this.state.cardsToWin.push(playerTwoCard);
        }else if (playerOneCardValue === 'A') {
            this.state.playerOne.cards.push(playerOneCard);
            this.state.playerOne.cards.push(playerTwoCard);
            this.checkPreviousDraw('one');
        } else if(playerTwoCardValue === 'A') {
            this.state.playerTwo.cards.push(playerOneCard);
            this.state.playerTwo.cards.push(playerTwoCard);
            this.checkPreviousDraw('two');
        } else if(playerOneCardValue === 'K') {
            this.state.playerOne.cards.push(playerOneCard);
            this.state.playerOne.cards.push(playerTwoCard);
            this.checkPreviousDraw('one');
        } else if(playerTwoCardValue === 'K') {
            this.state.playerTwo.cards.push(playerOneCard);
            this.state.playerTwo.cards.push(playerTwoCard);
            this.checkPreviousDraw('two');
        } else if (playerOneCardValue === 'Q') {
            this.state.playerOne.cards.push(playerOneCard);
            this.state.playerOne.cards.push(playerTwoCard);
            this.checkPreviousDraw('one');
        } else if (playerTwoCardValue === 'Q') {
            this.state.playerTwo.cards.push(playerOneCard);
            this.state.playerTwo.cards.push(playerTwoCard);
            this.checkPreviousDraw('two');
        }else if (playerOneCardValue === 'J') {
            this.state.playerOne.cards.push(playerOneCard);
            this.state.playerOne.cards.push(playerTwoCard);
            this.checkPreviousDraw('one');
        } else if(playerTwoCardValue === 'J') {
            this.state.playerTwo.cards.push(playerOneCard);
            this.state.playerTwo.cards.push(playerTwoCard);
            this.checkPreviousDraw('two');
        }else {
            //both players have numbers
            let numberPlayerOne = parseInt(playerOneCardValue);
            let numberPlayerTwo = parseInt(playerTwoCardValue);
            if(numberPlayerOne > numberPlayerTwo) {
                this.state.playerOne.cards.push(playerOneCard);
                this.state.playerOne.cards.push(playerTwoCard);
                this.checkPreviousDraw('one');
            } else if(numberPlayerTwo > numberPlayerOne) {
                this.state.playerTwo.cards.push(playerOneCard);
                this.state.playerTwo.cards.push(playerTwoCard);
                this.checkPreviousDraw('two');
            }
        }

        this.setState(this.state);
        this.checkNumberOfCards();

        this.pickCards();
    },
    checkPreviousDraw: function(player){
        let arrayCards = this.state.cardsToWin;
        if (player === 'one' && arrayCards.length > 0) {
            for (let i = 0; i < arrayCards.length; i++) {
                this.state.playerOne.cards.push(arrayCards[i]);
            }
            
        } else if(player === 'two' && arrayCards.length > 0){
            for (let i = 0; i < arrayCards.length; i++) {
                this.state.playerTwo.cards.push(arrayCards[i]);
            }
        }
        this.state.cardsToWin = [];
        this.setState(this.state);
    },
    checkNumberOfCards: function(){
        let totalNumberOfCards = this.state.playerOne.cards.length + this.state.playerTwo.cards.length + this.state.cardsToWin.length;
        if (totalNumberOfCards !== 52) {
            console.error('NOT THE GOOD NUMBER OF CARDS:', totalNumberOfCards);
        } else if (this.state.playerOne.cards.length === 0) {
            alert('Player Two WON !');
            this.state.playerTwo.wins += 1;
            this.setState(this.state);
            this.distributeCardsAtBeginningOfGame();
        } else if(this.state.playerTwo.cards.length === 0) {
            alert('Player One WON !');
            this.state.playerOne.wins += 1;
            this.setState(this.state);
            this.distributeCardsAtBeginningOfGame();
        }

    },
  render: function(){
    return (
        <div className='App' >
            <Scores 
                scorePlayerOne={this.state.playerOne.wins} 
                scorePlayerTwo={this.state.playerTwo.wins} />
            <div className='playerBoard'>
                <PlayerZone id='one' name="Player One" numberOfCards={this.state.playerOne.cards.length} cards={this.state.playerOne.cards} />
                <Board 
                    playerOneCard={this.state.playerOne.cardPlayed} 
                    playerTwoCard={this.state.playerTwo.cardPlayed}/>
                <PlayerZone id='two' name="Player Two" numberOfCards={this.state.playerTwo.cards.length} cards={this.state.playerTwo.cards} />
                <p className='title'>THIS IS <b>WAR</b></p>
            </div>
      </div>
    );
    }
});

export default App;
