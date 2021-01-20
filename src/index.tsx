import React, { FC, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

type squareProps = {
  value: string;
  onClick: () => void;
};

const Square: FC<squareProps> = (props) => {
  const { value, onClick } = props;

  return (
    <button type="button" className="square" onClick={() => onClick()}>
      {value}
    </button>
  );
};

const Board: FC = () => {
  const [squares, setSquares] = useState<string[]>(Array(9).fill(null));

  const handleClick = (i: number) => {
    const s = squares.slice();
    s[i] = 'X';
    setSquares(s);
  };

  const renderSquare = (i: number) => (
    <Square value={squares[i]} onClick={() => handleClick(i)} />
  );

  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
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

const Game: FC = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
    <div className="game-info">
      <div>{/* status */}</div>
      <ol>{/* TODO */}</ol>
    </div>
  </div>
);

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));
