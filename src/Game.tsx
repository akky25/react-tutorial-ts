import React, { FC } from 'react';
import Board from './Board';
import Moves from './Moves';
import UseGame from './use-game';
import calculateWinner from './calculateWinner';

const Game: FC = () => {
  const [history, stepNumber, xIsNext, handleClick, jumpTo] = UseGame();

  const winner = calculateWinner(history[stepNumber].squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board
          squares={history[stepNumber].squares}
          onClick={(i) => handleClick(i)}
        />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <Moves history={history} jumpTo={jumpTo} />
      </div>
    </div>
  );
};

export default Game;
