import { deleteCar } from '../../../api';
import { Button } from '../../../components/button';
import { triggerEvent } from '../../../components/event-bus/event-bus';
import { createSvg } from '../../../components/shared';
import { View } from '../../../components/view';
import { Car } from '../../../types/types';
import { state } from '../../state';

export default class Track extends View {
  car: Car;

  carContainer: View;

  carItem?: HTMLElement;

  selectBtn = new Button({ parentElement: this.node, content: 'Select' });

  removeBtn = new Button({ parentElement: this.node, content: 'Remove' });

  stopBtn = new Button({ parentElement: this.node, content: 'B' });

  startBtn = new Button({ parentElement: this.node, content: 'A' });

  isCarDriving = false;

  constructor(parentElement: HTMLElement, car: Car) {
    super({ parentElement, classes: ['track'] });
    this.car = car;
    this.carContainer = new View({ classes: ['car-container'] });
    this.createTrack();
  }

  createTrackHeader(): View {
    const trackHeader = new View({ classes: ['track-header'] });
    this.selectBtn.node.onclick = () => this.selectTrack();
    this.removeBtn.node.onclick = async () => {
      await this.deleteTrack();
    };
    const carTitle = new View({ tagName: 'h4', classes: ['car-title'], content: this.car.name });
    trackHeader.node.append(this.selectBtn.node, this.removeBtn.node, carTitle.node);
    return trackHeader;
  }

  createTrack() {
    const header = this.createTrackHeader();
    const road = new View({ classes: ['track-road'] });
    const carControls = this.createCarControls();
    const svg = createSvg(this.car.color);
    this.carContainer.node.append(svg);
    const finishPoint = new View({ classes: ['track-finish'] });
    road.node.append(carControls.node, this.carContainer.node, finishPoint.node);
    this.node.append(header.node, road.node);
  }

  createCarControls(): View {
    const controls = new View({ classes: ['track-wrapper-btn'] });
    this.startBtn.node.onclick = async () => {
      this.startBtn.button.disabled = true;
    };
    this.stopBtn.node.onclick = async () => {
      this.stopBtn.button.disabled = true;
    };
    controls.node.append(this.startBtn.node, this.stopBtn.node);
    return controls;
  }

  selectTrack() {
    state.activeCarId = this.car.id;
    triggerEvent('car/select');
  }

  async deleteTrack() {
    this.removeBtn.button.disabled = true;
    await deleteCar(this.car.id);
    triggerEvent('cars/update');
    triggerEvent('car/remove');
  }
}
