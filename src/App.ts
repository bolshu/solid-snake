import { TDirecton } from './types';
import Model from './Model';
import View from './View';

class App {
  public model: Model;

  public view: View;

  constructor() {
    this.model = new Model();
    this.view = new View();

    this.tick = this.tick.bind(this);
    this.keydownHandler = this.keydownHandler.bind(this);

    App.setStyles();
    this.addKeydownListener();
  }

  private static setStyles(): void {
    const { body } = document!;

    body.style.padding = '0px';
    body.style.margin = '0px';
    body.style.width = '100vw';
    body.style.height = '100vh';
  }

  private restart(): void {
    this.model.resetValues();
  }

  private keydownHandler(e: KeyboardEvent): void {
    const direction = <TDirecton>e.code.toUpperCase().replace('ARROW', '').trim();

    this.model.setNextDirection(direction);

    if (this.model.getIsCrashed) {
      this.restart();
    }
  }

  private addKeydownListener(): void {
    window.addEventListener('keydown', this.keydownHandler, true);
  }

  private tick(): void {
    this.model.update();
    this.view.update({
      gardenSize: this.model.getGardenSize,
      snake: this.model.getSnake,
      apple: this.model.getApple,
      score: this.model.getScore,
      isCrashed: this.model.getIsCrashed,
    });

    window.setTimeout(this.tick, this.model.getSpeed);
  }

  public init(): void {
    this.tick();
  }
}

export default App;
