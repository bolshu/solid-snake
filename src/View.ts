import {
  TContext,
  TGardenSize,
  TCoordinates,
  TScoreValue,
} from './types';
import COLORS, { TColor } from './Views/colors';

import Canvas from './Views/Canvas';
import Garden from './Views/components/Garden';
import Snake from './Views/components/Snake';
import Apple from './Views/components/Apple';
import Score from './Views/components/Score';

type TRenderParams = {
  gardenSize: TGardenSize;
  snake: TCoordinates[];
  apple: TCoordinates;
  score: TScoreValue;
  isCrashed: boolean;
};

class View {
  private readonly context: TContext;

  private readonly garden: Garden;

  private readonly snake: Snake;

  private readonly apple: Apple;

  private readonly score: Score;

  private backgroundColor: TColor;

  constructor() {
    this.context = Canvas.getInstance().context;
    this.garden = new Garden(this.context);
    this.snake = new Snake(this.context);
    this.apple = new Apple(this.context);
    this.score = new Score(this.context);

    this.backgroundColor = COLORS.BACKGROUND;
  }

  private clear(): void {
    const { width, height } = this.context.canvas;
    this.context.clearRect(0, 0, width, height);
  }

  public toggleBackground(): void {
    this.backgroundColor = this.backgroundColor === COLORS.BACKGROUND
      ? COLORS.APPLE
      : COLORS.BACKGROUND;
  }

  private drawBackground(): void {
    const { width, height } = this.context.canvas;

    this.context.fillStyle = this.backgroundColor;
    this.context.fillRect(0, 0, width, height);
  }

  private drawGarden(size: TGardenSize): void {
    this.garden.draw(size);
  }

  private drawSnake(coordinates: TCoordinates[]): void {
    this.snake.draw(coordinates);
  }

  private drawApple(coordinates: TCoordinates): void {
    this.apple.draw(coordinates);
  }

  private drawScore(score: TScoreValue): void {
    this.score.draw(score);
  }

  private drawAll({
    gardenSize: garden,
    snake,
    apple,
    score,
    isCrashed,
  }: TRenderParams): void {
    if (isCrashed) {
      this.toggleBackground();
    } else {
      this.backgroundColor = COLORS.BACKGROUND;
    }

    this.drawBackground();
    this.drawGarden(garden);
    this.drawSnake(snake);
    this.drawApple(apple);
    this.drawScore(score);
  }

  public update(args: TRenderParams): void {
    this.clear();
    this.drawAll(args);
  }
}

export default View;
