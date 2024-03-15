import { View } from '../view';
import './game.css';

export class GameView extends View {
  constructor() {
    super({
      tagName: 'div',
      classNames: ['game'],
      text: 'GAME PAGE',
    });
  }
}
