// import React from 'react';
// import ReactDOM from 'react-dom';

const App = () => (
  <div>
    <Board />
  </div>
);

class Board extends React.Component {
  constructor() {
    super();

    this.state = {
      player: 1,
      board: _.range(7).map(i => [0, 0, 0, 0, 0, 0]),
      winner: 0,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(colIndex) {
    this.setState((prevState) => {
      const col = prevState.board[colIndex].slice();
      let player = prevState.player;
      let winner = prevState.winner;
      const board = prevState.board.slice();

      for (let i = 0; i < col.length; i++) {
        if (col[i] === 0) {
          col[i] = prevState.player;
          board[colIndex] = col;

          if (checkForWin(board, colIndex, i ,player)) {
            winner = player;
          }

          player = player === 1 ? 2 : 1;
          break;
        }
      }

      

      return {
        player,
        board,
        winner,
      }
    });
  }

  render() {
    return (
      <div className="board">
        {
          this.state.board.map((col, i) => (
            <Column col={col} index={i} key={i} onClick={this.onClick} />
          ))
        }
        <div>
          {this.state.winner ?
            `Game Over! Player ${this.state.winner} wins!` :
            `It is player ${this.state.player}'s turn.`}
        </div>
      </div>
    );
  }
}

const Column = (props) => (
  <div className="column" onClick={() => {props.onClick(props.index)}}>
    {
      props.col.slice().reverse().map((square, i) => (
        <div className={`square ${getPlayerFor(square)}`} key={i}></div>
      ))
    }
  </div>
);

ReactDOM.render(<App />, document.getElementById('app'));


// Helpers

function getPlayerFor(square) {
  if (square === 0) {
    return "empty";
  }
  return `player-${square}`;
};

function checkForWin(board, i, j, player) {
  return vertical(board, i, j, player) || horizontal(board, i, j, player) ||
    major(board, i, j, player) || minor(board, i, j, player);
}

function vertical(board, i, j, player) {
  let total = 1;
  let jj = j;

  while (board[i][++jj] && board[i][jj] === player) {
    total++;
  }

  jj = j;
  while (board[i][--jj] && board[i][jj] === player) {
    total++;
  }

  return total >= 4;
}

function horizontal(board, i, j, player) {
  let total = 1;
  let ii = i;

  while (board[++ii] && board[ii][j] === player) {
    total++;
  }

  ii = i;
  while (board[--ii] && board[ii][j] === player) {
    total++;
  }

  return total >= 4;
}

function major(board, i, j, player) {
  let total = 1;
  let ii = i;
  let jj = j;

  while (board[++ii] && board[ii][++jj] && board[ii][jj] === player) {
    total++;
  }

  ii = i;
  jj = j;
  while (board[--ii] && board[ii][--jj] && board[ii][jj] === player) {
    total++;
  }

  return total >= 4;
}


function minor(board, i, j, player) {
  let total = 1;
  let ii = i;
  let jj = j;

  while (board[--ii] && board[ii][++jj] && board[ii][jj] === player) {
    total++;
  }

  ii = i;
  jj = j;
  while (board[++ii] && board[ii][--jj] && board[ii][jj] === player) {
    total++;
  }

  return total >= 4;
}