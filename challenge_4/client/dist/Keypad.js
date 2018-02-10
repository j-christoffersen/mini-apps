// import React from 'react';

const Keypad = props => React.createElement(
  "div",
  null,
  [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => React.createElement(
    "button",
    { key: i, onClick: () => props.onClick(i), disabled: props.gameIsOver || i > 10 - props.prevScore },
    i
  ))
);

// export default Keypad;

