import Canvas, { TContext } from './Canvas';
import Game from './Game/Game';

class App {
  private readonly context: TContext;

  private game: Game;

  constructor() {
    this.context = Canvas.getInstance().context;
    this.game = new Game(this.context);
  }

  private static setStyles(): void {
    const { body } = document!;

    body.style.padding = '0px';
    body.style.margin = '0px';
    body.style.width = '100vw';
    body.style.height = '100vh';
  }

  public init(): void {
    App.setStyles();
    this.game.start();
  }
}

export default App;
