import React, { FC } from 'react';
import Board from './Board';
import Moves from './Moves';
import { elm, History } from '../type/type';

type gamePorops = {
  history: History[];
  squares: elm[];
  status: string;
  handleClick: (i: number) => void;
  jumpTo: (step: number) => void;
};

const Game: FC<gamePorops> = ({
  history,
  squares,
  status,
  handleClick,
  jumpTo,
}) => (
  <div className="game">
    <div className="game-board">
      <Board squares={squares} onClick={(i) => handleClick(i)} />
    </div>
    <div className="game-info">
      <div>{status}</div>
      <Moves history={history} jumpTo={jumpTo} />
    </div>
  </div>
);

export default Game;
