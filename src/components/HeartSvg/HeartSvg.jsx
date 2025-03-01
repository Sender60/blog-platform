import React from 'react';

const HeartSvg = ({ like }) => (
  <svg width="22" height="22" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M50 90
           C30 70, 10 50, 10 30
           A20 20, 0, 0, 1, 50 30
           A20 20, 0, 0, 1, 90 30
           C90 50, 70 70, 50 90 Z"
      fill={like ? 'red' : 'white'}
      stroke={like ? 'red' : 'black'}
      strokeWidth="2"
    />
  </svg>
);

export default HeartSvg;
