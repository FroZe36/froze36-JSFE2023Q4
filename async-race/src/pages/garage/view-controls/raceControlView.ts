import { Button } from '../../../components/button';
import { View } from '../../../components/view';

export class RaceControlView extends View {
  randomCarsButton: Button;

  startRaceButton: Button;

  resetButton: Button;

  constructor(parentElement: HTMLElement) {
    super({ parentElement, classes: ['garage__control-wrapper', 'control'] });

    this.randomCarsButton = new Button({
      parentElement: this.node,
      content: 'Random Cars',
      classes: ['control__button', 'ubuntu-medium']
    });
    this.startRaceButton = new Button({
      parentElement: this.node,
      content: 'Start Race',
      classes: ['control__button', 'ubuntu-medium']
    });
    this.resetButton = new Button({
      parentElement: this.node,
      content: 'Reset',
      classes: ['control__button', 'ubuntu-medium']
    });
    this.render();
  }

  render() {
    this.randomCarsButton.node.onclick = () => {
      console.log('1');
    };
    this.startRaceButton.node.onclick = () => {
      console.log('2');
    };
    this.resetButton.node.onclick = () => {
      console.log('3');
    };
    this.node.append(this.randomCarsButton.node, this.startRaceButton.node, this.resetButton.node);
  }
}
