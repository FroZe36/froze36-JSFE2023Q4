import { View } from '../../components/view';
import { RaceControlView } from './view-controls/raceControlView';
import { CreateCarControlView } from './view-controls/createCarControlView';
import { UpdateCarControlView } from './view-controls/updateCarControlView';
import './garage.css';

export class GarageView extends View {
  updateControlCar: UpdateCarControlView;

  createControlCar: CreateCarControlView;

  raceControl: RaceControlView;

  titlePage: View;

  counterOnPage: View;

  constructor(parentElement: HTMLElement) {
    super({ tagName: 'section', classes: ['garage'], parentElement });

    this.createControlCar = new CreateCarControlView(this.node);
    this.updateControlCar = new UpdateCarControlView(this.node);
    this.raceControl = new RaceControlView(this.node);
    this.titlePage = new View({
      parentElement: this.node,
      tagName: 'h1',
      classes: ['garage__title', 'title-page', 'ubuntu-bold'],
      content: 'Garage Cars Count'
    });
    this.counterOnPage = new View({
      parentElement: this.node,
      tagName: 'h3',
      classes: ['garage__counter', 'ubuntu-bold'],
      content: 'Page №'
    });
    this.render();
  }

  render() {
    this.node.append(
      this.createControlCar.node,
      this.updateControlCar.node,
      this.raceControl.node,
      this.titlePage.node,
      this.counterOnPage.node
    );
  }
}
