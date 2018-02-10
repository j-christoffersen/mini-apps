// import React from 'react';
// import ReactDOM from 'react-dom';

// import Keypad from './Keypad';
// import Scoreboard from './Scoreboard';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      frames: new Array(12).fill([null, null]),
      frame: 0,
      roll: 0
    };

    this.addRoll = this.addRoll.bind(this);
  }

  addRoll(pinCount) {
    if (this.state.roll === 0 && pinCount === 10) {
      this.setState(prevState => {
        // create a deep copy of frames
        const newFrames = prevState.frames.map(frame => frame.slice());
        newFrames[prevState.frame][0] = 10;
        return {
          frames: newFrames,
          frame: prevState.frame + 1,
          roll: 0
        };
      });
    } else {
      this.setState(prevState => {
        // create a deep copy of frames
        const newFrames = prevState.frames.map(frame => frame.slice());
        newFrames[prevState.frame][prevState.roll] = pinCount;
        return {
          frames: newFrames,
          frame: prevState.roll ? prevState.frame + 1 : prevState.frame,
          roll: prevState.roll ? 0 : 1
        };
      });
    }
  }

  render() {
    const prevScore = this.state.roll === 1 ? this.state.frames[this.state.frame][0] : 0;
    const gameIsOver = getScores(this.state.frames)[9] !== null;

    return React.createElement(
      'div',
      null,
      React.createElement(Keypad, { onClick: this.addRoll, prevScore: prevScore, gameIsOver: gameIsOver }),
      React.createElement(Scoreboard, { frames: this.state.frames }),
      gameIsOver && React.createElement(
        'div',
        null,
        'Game Over!'
      )
    );
  }
}

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

