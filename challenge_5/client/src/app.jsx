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
      // moves: null,
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
          // moves,
          board,
          selected: [row, col],
        };
      }

      return {};
    }
  }

  move(row, col) {
    const [sRow, sCol] = this.state.selected;
    const moves = this.getMoves(sRow, sCol);
    const validMove = moves
      .map(move => move[0] === row && move[1] === col)
      .reduce((acc, bool) => acc || bool);

    return (prevState) => {
      if (validMove) {
        let state = {
          board: deepCopy(prevState.board),
          pieceCounts: deepCopy(prevState.pieceCounts),
          player: prevState.player,
          selected: prevState.selected,
        }

        moves.forEach((move) => {
          let [mrow, mcol] = move;
          state.board[mrow][mcol].highlighted = false;
        });

        state.board[row][col] = state.board[sRow][sCol];
        state.board[row][col].highlighted = false;
        state.board[sRow][sCol].selected = false;
        state.board[sRow][sCol] = { player: null };

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
        }

        return state;
      }

      return {};
    }
  }

  // Helpers

  getMoves(row, col, jump=false) {
    const dir = this.state.player === 1 ? 1 : -1;
    const moves = [];

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

  if (props.square.highlighted) {
    squareClasses.push('square-highlight');
  };

  if (props.square.selected) {
    squareClasses.push('square-selected');
  }

  return (
    <div className={squareClasses.join(' ')} onClick={() => {props.onClick(props.row, props.col)}}>
      <div className={`player player-${props.square.player}`}></div>
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


