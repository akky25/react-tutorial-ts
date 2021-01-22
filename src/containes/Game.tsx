import React, { FC } from 'react';
import useGame from '../hooks/use-game';
import calculateWinner from '../utils/calculateWinner';
import Game from '../components/Game';

const EnhancedGame: FC = () => {
  const [history, stepNumber, xIsNext, handleClick, jumpTo] = useGame();

  const winner = calculateWinner(history[stepNumber].squares);
  let status: string;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <Game
      history={history}
      squares={history[stepNumber].squares}
      status={status}
      handleClick={handleClick}
      jumpTo={jumpTo}
    />
  );
};

export default EnhancedGame;
