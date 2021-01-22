import React, { FC } from 'react';
import { elm } from '../type/type';

type squareProps = {
  value: elm;
  onClick: () => void;
};

const Square: FC<squareProps> = (props) => {
  const { value, onClick } = props;

  return (
    <button type="button" className="square" onClick={onClick}>
      {value}
    </button>
  );
};

export default Square;
