import React, { FC } from 'react';
import { History } from '../type/type';

type movesProps = {
  history: History[];
  jumpTo: (move: number) => void;
};
const Moves: FC<movesProps> = (props) => {
  const { history, jumpTo } = props;

  return (
    <ol>
      {history.map((step, move) => {
        const desc = move ? `Go to move # ${move}` : `Go to game start`;

        return (
          <li key={step.key}>
            <button type="button" onClick={() => jumpTo(move)}>
              {desc}
            </button>
          </li>
        );
      })}
    </ol>
  );
};

export default Moves;
