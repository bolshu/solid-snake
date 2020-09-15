import { TContext } from '../types';

type TCanvas = HTMLCanvasElement;

class Canvas {
  private readonly ctx: TContext;

  private readonly el: TCanvas;

  private static instance: Canvas;

  constructor() {
    Canvas.create();

    this.el = <TCanvas>document.querySelector('#canvas')!;
    this.ctx = this.el.getContext('2d')!;
  }

  private static create(): void {
    const element = document.createElement('canvas')!;
    const { innerWidth, innerHeight } = window;

    element.setAttribute('id', 'canvas');
    element.setAttribute('width', innerWidth.toString());
    element.setAttribute('height', innerHeight.toString());

    document.body.appendChild(element);
  }

  public static getInstance(): Canvas {
    if (!Canvas.instance) {
      Canvas.instance = new Canvas();
    }

    return this.instance;
  }

  get context(): TContext {
    return this.ctx;
  }

  get element(): TCanvas {
    return this.el;
  }
}

export default Canvas;
