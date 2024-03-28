import { Button } from '../button';
import { View } from '../view';
import './header.css';

export class HeaderView extends View {
  setViewCallback: (pageNum: number) => void;

  constructor(callback: (pageNum: number) => void) {
    super({ tagName: 'header', classes: ['header'] });
    this.setViewCallback = callback;
    this.render();
  }

  render() {
    const garageButton = new Button({
      parentElement: this.node,
      content: 'To Garage Page',
      classes: ['header__button', 'ubuntu-regular']
    });
    garageButton.node.onclick = () => {
      this.setViewMain(0);
    };
    const winnerButton = new Button({
      parentElement: this.node,
      content: 'To Winners Page',
      classes: ['header__button', 'ubuntu-regular']
    });
    winnerButton.node.onclick = () => {
      this.setViewMain(1);
    };
    this.node.append(garageButton.node, winnerButton.node);
  }

  setViewMain(pageNum: number): void {
    this.setViewCallback(pageNum);
  }
}
