import { View } from '../../../components/view';
import { Car } from '../../../types/types';
import Track from './track';

export default class Race extends View {
  tracks: Track[] = [];

  cars: Car[];

  constructor(parentElement: HTMLElement, cars: Car[]) {
    super({ parentElement, classes: ['race'] });
    this.cars = cars;
    this.renderTracks();
  }

  renderTracks() {
    const fragment = document.createDocumentFragment();
    this.cars.forEach((car) => {
      const track = new Track(this.node, car);
      this.tracks.push(track);
      fragment.append(track.node);
    });
    this.node.append(fragment);
  }
}
