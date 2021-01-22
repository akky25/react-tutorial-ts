import { useState } from 'react';
import { elm, History } from '../type/type';
import calculateWinner from '../utils/calculateWinner';

type ReturnType = [
  History[],
  number,
  boolean,
  (i: number) => void,
  (step: number) => void,
];

const useGame = (): ReturnType => {
  const [history, setHistory] = useState<History[]>([
    { squares: Array<elm>(9).fill(null), key: 0 },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = (i: number) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const newCurrent = newHistory[newHistory.length - 1];
    const newSquares = newCurrent.squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setHistory(
      newHistory.concat([{ squares: newSquares, key: newCurrent.key + 1 }]),
    );
    setXIsNext(!xIsNext);
    setStepNumber(newHistory.length);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  return [history, stepNumber, xIsNext, handleClick, jumpTo];
};

export default useGame;
