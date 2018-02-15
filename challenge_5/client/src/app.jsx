

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: newBoard(),
      player: 1,
      selected: null,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick(row, col) {
    if (this.state.selected) {
      this.move(row, col);
    } else {
      this.select(row, col);
    } 
  }

  select(row, col) {
    if (this.state.board[row][col].player === this.state.player) {
      this.setState(prevState => {
        const board = deepCopy(this.state.board);
        board[row][col].selected = true;

        this.getMoves(row, col).forEach((move) => {
          let [mrow, mcol] = move;
          board[mrow][mcol].highlighted = true;
        });

        return {
          board,
          selected: [row, col],
        };
      })
    }
  }

  move(row, col) {
    const [sRow, sCol] = this.state.selected;
    const moves = this.getMoves(sRow, sCol);
    const validMove = moves
      .map(move => move[0] === row && move[1] === col)
      .reduce((acc, bool) => acc || bool);

    if (validMove) {
      this.setState((prevState) => {
        const board = deepCopy(prevState.board);

        moves.forEach((move) => {
          let [mrow, mcol] = move;
          board[mrow][mcol].highlighted = false;
        });

        board[row][col] = board[sRow][sCol];
        board[sRow][sCol].selected = false;
        board[sRow][sCol] = { player: null };

        return {
          board,
          selected: null,
          player: prevState.player === 1 ? 2 : 1,
        };
      })
    }
  }

  getMoves(row, col) {
    const dir = this.state.player === 1 ? 1 : -1;
    const moves = [];

    [-1, 1].forEach((i) => {
      if ( // open space
        this.state.board[row + dir] &&
        this.state.board[row + dir][col + i] &&
        this.state.board[row + dir][col + i].player === null
      ) {
        moves.push([row + dir, col + i]);
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

    return moves;
  }

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
