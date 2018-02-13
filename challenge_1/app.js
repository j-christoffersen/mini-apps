class Model {
  constructor() {
    this.subscribers = [];
  }

  trigger() {
    this.subscribers.forEach(subscriber => {
      subscriber(this);
    })
  }

  subscribe(func) {
    this.subscribers.push(func);
  }
}

class Game extends Model {
  constructor() {
    super();
    this.board = [[0, 0 ,0], [0, 0, 0 ], [0, 0, 0 ]];
    this.player = 'X';
    this.winner = null;
    this.gameOver = false;
  }

  getWinner() {
    for (var i = 0; i < 3; i++) {
      if (
        (this.board[i][0] === this.player && this.board[i][1] === this.player && this.board[i][1] === this.player) ||
        (this.board[0][i] === this.player && this.board[1][i] === this.player && this.board[2][i] === this.player) 
      ) {
        return this.player;
      }
    }

    if (
      (this.board[0][0] === this.player && this.board[1][1] === this.player && this.board[2][2] === this.player) ||
      (this.board[0][2] === this.player && this.board[1][1] === this.player && this.board[2][0] === this.player)
    ) {
      return this.player;
    }

    return null;
  }

  play(i, j) {
    if (this.board[i][j] === 0 && !this.gameOver) {
      this.board[i][j] = this.player;

      if (this.winner = this.getWinner()) {
        this.gameOver = true;
      }

      this.player = this.player === 'X' ? 'O' : 'X';
      this.trigger();
    }
  }
}

class Component {
  constructor(el, models, props) {
    this.el = el;
    this.models = models;
    this.props = props;
    Object.values(this.models).forEach(model => {
      model.subscribe(this.render.bind(this));
    });
  }

  render() {
    this.el.innerHTML = this.html();
  }
}

class Box extends Component {
  constructor(el, models, props) {
    super(el, models, props);

    this.el.addEventListener("click", () => {
      this.models.game.play(this.props.i, this.props.j)
    });
  }

  html() {
    const mark = this.models.game.board[this.props.i][this.props.j];
    return mark ? mark : '.';
  }
}

class Message extends Component {
  html() {
    if (this.models.game.gameOver) {
      return `Game Over! ${this.models.game.winner} wins!`;
    } else {
      return `It's ${this.models.game.player}'s turn!`;
    }
  }
}


let game = new Game();
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    new Box(document.getElementById(`${i}_${j}`), { game }, { i, j });
  }
}
new Message(document.getElementById('msg'), { game });

game.trigger();
