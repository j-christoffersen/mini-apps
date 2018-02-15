class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: newBoard(),
      player: 1,
      selected: null,
      pieceCounts: {
        1: 8,
        2: 8,
      },
      moves: null,
    };

    this.onClick = this.onClick.bind(this);
  }

  // event handlers

  onClick(row, col) {
    if (this.state.selected) {
      this.setState(this.move(row, col));
    } else {
      this.setState(this.select(row, col));
    } 
  }

  // reducer creator

  select(row, col, jump=false) {
    return (prevState) => {
      if (prevState.board[row][col].player === this.state.player) {
        const board = deepCopy(prevState.board);
        const moves = this.getMoves(row, col, jump);

        console.log(moves);
        board[row][col].selected = true;

        moves.forEach((move) => {
          let [mrow, mcol] = move;
          board[mrow][mcol].highlighted = true;
        });

        return {
          moves,
          board,
          selected: [row, col],
        };
      }

      return {};
    }
  }

  move(row, col) {
    const [sRow, sCol] = this.state.selected;
    const moves = this.state.moves;
    const validMove = moves
      .map(move => move[0] === row && move[1] === col)
      .reduce((acc, bool) => acc || bool);

    return (prevState) => {
      if (validMove) {
        let state = deepCopy(prevState);

        moves.forEach((move) => {
          let [mrow, mcol] = move;
          state.board[mrow][mcol].highlighted = false;
        });

        state.board[row][col] = state.board[sRow][sCol];
        if (row === 0 || row === 7) {
          state.board[row][col].king = true;
        }
        state.board[row][col].highlighted = false;
        state.board[sRow][sCol].selected = false;

        if (!(row === sRow)) {
          state.board[sRow][sCol] = { player: null };
        }

        if (Math.abs(row - sRow) === 2) {
          state.board[(sRow + row) / 2][(sCol + col) / 2] = { player: null };
          state.pieceCounts[state.player === 1 ? 2 : 1]--;
          console.log(this.getMoves(row, col, true));
        }

        const newMoves = this.getMoves(row, col, true);
        if (Math.abs(row - sRow) === 2 && newMoves.length > 1) {
          state = this.select(row, col, true)(state);
        } else {
          // change turn
          state.player = state.player === 1 ? 2 : 1;
          state.selected = null;
          state.moves = null;
        }

        return state;
      }

      return {};
    }
  }

  // Helpers

  getMoves(row, col, jump=false) {
    const moves = [];
    let dirs;
    if (this.state.board[row][col].king) {
      dirs = [-1, 1];
    } else if (this.state.player === 1) {
      dirs = [1];
    } else {
      dirs = [-1];
    }
    dirs.forEach((dir) => {
      [-1, 1].forEach((i) => {
        if ( // open space
          this.state.board[row + dir] &&
          this.state.board[row + dir][col + i] &&
          this.state.board[row + dir][col + i].player === null
        ) {
          if (!jump) {
            moves.push([row + dir, col + i]);
          }
        } else if ( // jump
          this.state.board[row + dir] &&
          this.state.board[row + dir][col + i] &&
          this.state.board[row + dir][col + i].player !== this.state.player &&
          this.state.board[row + 2 * dir] &&
          this.state.board[row + 2 * dir][col + 2 * i] &&
          this.state.board[row + 2 * dir][col + 2 * i].player === null
        ) {
          moves.push([row + 2 * dir, col + 2 * i]);
        }
      })
    })

    if (jump) {
      moves.push([row, col]);
    }

    return moves;
  }

  // render

  render() {
    return (
      <div>
        <Board board={this.state.board} onClick={this.onClick} />
        <p>{`It's Player ${this.state.player}'s Turn!`}</p>
      </div>
    );
  }
}

const Board = (props) => (
  <div className="board">
    {props.board.map((row, i) => (
      <div className="row" key={i}>
        {row.map((square, j) => (
          <Square color={(i + j) % 2} row={i} col={j} square={square} onClick={props.onClick} key={j} />
        ))}
      </div>
    ))}
  </div>
)

const Square = (props) => {
  const squareClasses = [
    'square',
    `square-${props.color}`,
  ];

  const playerClasses = [
    'player',
    `player-${props.square.player}`,
  ];

  if (props.square.highlighted) {
    squareClasses.push('square-highlight');
  };

  if (props.square.selected) {
    squareClasses.push('square-selected');
  }

  if (props.square.king) {
    playerClasses.push('player-king');
  }

  return (
    <div className={squareClasses.join(' ')} onClick={() => {props.onClick(props.row, props.col)}}>
      {props.square.player && <div className={playerClasses.join(' ')}></div>}
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'));


// Helpers

function newBoard() {
  const board = [];

  for (let i = 0; i < 8; i++) {
    board[i] = [];

    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 === 1) {
        if (i <= 1) {
          board[i][j] = { player: 1 };
          continue;
        } else if (i >= 6) {
          board[i][j] = { player: 2 };
          continue;
        }
      }

      board[i][j] = { player: null };
    }
  }

  return board;
}

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
};
