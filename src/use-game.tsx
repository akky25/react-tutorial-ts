import { useState } from 'react';
import { elm, History } from './type';
import calculateWinner from './calculateWinner';

type ReturnType = [
  History[],
  number,
  boolean,
  (i: number) => void,
  (step: number) => void,
];

const UseGame = (): ReturnType => {
  const [history, setHistory] = useState<History[]>([
    { squares: Array<elm>(9).fill(null), key: 0 },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

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

  return [history, stepNumber, xIsNext, handleClick, jumpTo];
};

export default UseGame;
