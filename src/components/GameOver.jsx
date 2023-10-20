import React from 'react'
import GameState from './GameState'
const GameOver = ({ gameState }) => {
    switch (gameState) {
        case GameState.inProgress:
            return <></>;
        case GameState.playerOWins:
            return <div className="game-over">O ชนะ</div>;
        case GameState.playerXWins:
            return <div className="game-over">X ชนะ</div>;
        case GameState.draw:
            return <div className="game-over">เสมอ</div>;
        default:
            return <></>;
    }
}

export default GameOver ;
