import { View } from '../../components/view';
import { RaceControlView } from './view-controls/raceControlView';
import { CreateCarControlView } from './view-controls/createCarControlView';
import { UpdateCarControlView } from './view-controls/updateCarControlView';
import './garage.css';
import { Car } from '../../types/types';
import Race from './view-controls/race';
import { getCars } from '../../api';
import { constants } from '../../components/shared';

export class GarageView extends View {
  updateControlCar: UpdateCarControlView;

  createControlCar: CreateCarControlView;

  raceControl: RaceControlView;

  titlePage: View;

  counterOnPage: View;

  race?: Race;

  currentCars?: Car[];

  carsCount = 0;

  currentPage = 1;

  maxPages = 1;

  container: View;

  constructor(parentElement: HTMLElement) {
    super({ tagName: 'section', classes: ['garage'], parentElement });

    this.createControlCar = new CreateCarControlView(this.node);
    this.updateControlCar = new UpdateCarControlView(this.node);
    this.raceControl = new RaceControlView(this.node);
    this.titlePage = new View({
      parentElement: this.node,
      tagName: 'h1',
      classes: ['garage__title', 'title-page', 'ubuntu-bold'],
      content: `Garage Cars (${this.carsCount})`
    });
    this.counterOnPage = new View({
      parentElement: this.node,
      tagName: 'h3',
      classes: ['garage__counter', 'ubuntu-bold'],
      content: `Page № (${this.currentPage} / ${this.maxPages})`
    });
    this.container = new View({ parentElement: this.node });
    this.render();
  }

  async render() {
    this.node.append(
      this.createControlCar.node,
      this.updateControlCar.node,
      this.raceControl.node,
      this.titlePage.node,
      this.counterOnPage.node
    );
    await this.refreshGarage();
  }

  async getCars() {
    const res = await getCars(this.currentPage);
    console.log(res);
    this.carsCount = res.count;
    this.currentCars = res.data;
    this.maxPages = this.calcMaxPage();
    console.log(this.maxPages);
  }

  async refreshGarage() {
    await this.getCars();
    // this.refreshPageTitle();
    this.container.node.remove();
    this.renderRace(this.currentCars || []);
    this.node.append(this.container.node);
    // this.checkPagButtonsState();
  }

  renderRace(data: Car[]) {
    if (this.race !== undefined) {
      this.node.removeChild(this.race.node);
    }
    this.race = new Race(this.node, data);
    this.node.append(this.race.node);
  }

  calcMaxPage(): number {
    return Math.ceil(this.carsCount / constants.CARS_PER_PAGE_LIMIT);
  }
}
