import { View } from '../../components/view';
import { RaceControlView } from './view-controls/raceControlView';
import { CreateCarControlView } from './view-controls/createCarControlView';
import { UpdateCarControlView } from './view-controls/updateCarControlView';
import './garage.css';
import { Car } from '../../types/types';
import Race from './view-controls/race';
import { createCar, getCars } from '../../api';
import { carBrands, carModels, constants } from '../../components/shared';
import { subscribeEvent } from '../../components/event-bus/event-bus';

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

  containerPagination: View;

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
    this.containerPagination = new View({ parentElement: this.node });
    subscribeEvent('cars/update', this.updateGarage.bind(this));
    subscribeEvent('car/random', this.generateRandomCars.bind(this));
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
    await this.updateGarage();
  }

  async getCars() {
    const res = await getCars(this.currentPage);
    this.carsCount = res.count;
    this.currentCars = res.data;
    this.maxPages = this.calcMaxPage();
    console.log(this.maxPages);
  }

  async updateGarage() {
    await this.getCars();
    this.updatePageTitle();
    this.updatePageNumber();
    this.renderRace(this.currentCars || []);
  }

  updatePageTitle() {
    this.titlePage.node.textContent = `Garage Cars (${this.carsCount})`;
  }

  updatePageNumber() {
    this.counterOnPage.node.textContent = `Page № (${this.currentPage} / ${this.maxPages})`;
  }

  renderRace(data: Car[]) {
    if (this.race !== undefined) {
      console.log(this.node);
      this.node.removeChild(this.race.node);
    }
    this.race = new Race(this.node, data);
    this.node.append(this.race.node);
  }

  calcMaxPage(): number {
    return Math.ceil(this.carsCount / constants.CARS_PER_PAGE_LIMIT);
  }

  async generateRandomCars() {
    const cars = [];
    for (let i = 0; i < 100; i += 1) {
      const randBrand = carBrands[Math.floor(Math.random() * 10)];
      const randModel = carModels[Math.floor(Math.random() * 10)];
      const color = this.generateRandomColor();
      const car = {
        name: `${randBrand} ${randModel}`,
        color
      };
      cars.push(createCar(JSON.stringify(car)));
    }
    await Promise.all(cars);
  }

  generateRandomColor(): string {
    const randHex = Math.floor(Math.random() * 16777215).toString(16);
    return `#${randHex}`;
  }
}
