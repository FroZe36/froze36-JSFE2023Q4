import { Button } from '../../../components/button';
import { subscribeEvent, triggerEvent } from '../../../components/event-bus/event-bus';
import { View } from '../../../components/view';
import { state } from '../../state';

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
    this.resetButton.button.disabled = true;
    subscribeEvent('race/started', this.checkRaceResetState.bind(this));
    this.render();
  }

  render() {
    this.randomCarsButton.node.onclick = () => {
      this.generateRandomCars();
    };
    this.startRaceButton.node.onclick = () => {
      this.startRace();
    };
    this.resetButton.node.onclick = () => {
      this.resetRace();
    };
    this.node.append(this.randomCarsButton.node, this.startRaceButton.node, this.resetButton.node);
  }

  async generateRandomCars() {
    this.randomCarsButton.button.disabled = true;
    await triggerEvent('car/random');
    await triggerEvent('cars/update');
    this.randomCarsButton.button.disabled = false;
  }

  startRace() {
    this.startRaceButton.button.disabled = true;
    this.resetButton.button.disabled = true;
    this.randomCarsButton.button.disabled = true;
    triggerEvent('cars/raceStart');
  }

  resetRace() {
    this.resetButton.button.disabled = true;
    triggerEvent('cars/raceReset');
  }

  checkRaceResetState() {
    if (state.isRaceStarted) {
      this.resetButton.button.disabled = false;
      this.startRaceButton.button.disabled = true;
      this.randomCarsButton.button.disabled = true;
    } else {
      this.startRaceButton.button.disabled = false;
      this.randomCarsButton.button.disabled = false;
      this.resetButton.button.disabled = true;
    }
  }
}
