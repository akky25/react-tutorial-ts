import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Square: FC = () => (
  <button type="button" className="square">
    {/* TODO */}
  </button>
);

const Board: FC = () => {
  const renderSquare = () => <Square />;

  const status = 'Next player: X';

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
      <div className="board-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
      </div>
      <div className="board-row">
        {renderSquare()}
        {renderSquare()}
        {renderSquare()}
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
