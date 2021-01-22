import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type elm = 'X' | 'O' | null;

type squareProps = {
  value: elm;
  onClick: () => void;
};

const calculateWinner = (squares: Array<elm>) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

const Square: FC<squareProps> = (props) => {
  const { value, onClick } = props;

  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
};

type boardProps = {
  squares: Array<elm>;
  onClick: (i: number) => void;
};

const Board: FC<boardProps> = (props) => {
  const { squares, onClick } = props;

  const renderSquare = (i: number) => (
    <Square value={squares[i]} onClick={() => onClick(i)} />
  );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
};

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

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
