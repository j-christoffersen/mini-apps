// import React from 'react';

const Keypad = (props) => (
  <div>
    {[0,1,2,3,4,5,6,7,8,9,10].map((i) => (
      <button key={i} onClick={() => props.onClick(i)} disabled={props.gameIsOver || i > 10 - props.prevScore}>{i}</button>
    ))}
  </div>
);

// export default Keypad;
