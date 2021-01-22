import React, { FC, useState } from 'react';
import calculateWinner from './calculateWinner';
import Board from './Board';
import { elm } from './type';

type History = {
  squares: elm[];
  key: number;
};

const Game: FC = () => {
  const [history, setHistory] = useState<History[]>([
    { squares: Array<elm>(9).fill(null), key: 0 },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);
  const current = history[stepNumber];

  const handleClick = (i: number) => {
    const h = history.slice(0, stepNumber + 1);
    const c = h[h.length - 1];
    const s = c.squares.slice();
    if (calculateWinner(s) || s[i]) {
      return;
    }
    s[i] = xIsNext ? 'X' : 'O';
    setHistory(h.concat([{ squares: s, key: c.key + 1 }]));
    setXIsNext(!xIsNext);
    setStepNumber(h.length);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const moves = history.map((step, move) => {
    const desc = move ? `Go to move # ${move}` : `Go to game start`;

    return (
      <li key={step.key}>
        <button type="button" onClick={() => jumpTo(move)}>
          {desc}
        </button>
      </li>
    );
  });

  const winner = calculateWinner(current.squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
