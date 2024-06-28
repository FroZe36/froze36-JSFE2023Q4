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
import { Button } from '../../components/button';
import { state } from '../state';

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

  prevButton?: Button;

  nextButton?: Button;

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
      content: `Page #(${this.currentPage} / ${this.maxPages})`
    });
    this.containerPagination = new View({ parentElement: this.node, classes: ['pagination-wrapper'] });
    subscribeEvent('cars/update', this.updateGarage.bind(this));
    subscribeEvent('car/random', this.generateRandomCars.bind(this));
    subscribeEvent('race/started', this.checkRaseResetState.bind(this));
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
    this.createControlPagination();
  }

  async getCars() {
    const res = await getCars(this.currentPage);
    this.carsCount = res.count;
    this.currentCars = res.data;
    this.maxPages = this.calcMaxPage();
  }

  async updateGarage() {
    await this.getCars();
    this.updatePageTitle();
    this.updatePageNumber();
    this.containerPagination.node.remove();
    this.renderRace(this.currentCars || []);
    this.node.append(this.containerPagination.node);
    this.checkStatePaginationControls();
  }

  changePage() {
    this.updateGarage();
  }

  checkRaseResetState() {
    const nextButton = this.nextButton?.button;
    const prevButton = this.prevButton?.button;
    if (state.isRaceStarted) {
      if (nextButton && prevButton) {
        if (!nextButton.disabled) {
          nextButton.disabled = true;
        }
        if (!prevButton.disabled) {
          prevButton.disabled = true;
        }
      }
    } else this.checkStatePaginationControls();
  }

  updatePageTitle() {
    this.titlePage.node.textContent = `Garage Cars (${this.carsCount})`;
  }

  updatePageNumber() {
    this.counterOnPage.node.textContent = `Page #(${this.currentPage} / ${this.maxPages})`;
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

  createControlPagination() {
    this.prevButton = new Button({ parentElement: this.node, classes: ['ubuntu-regular'], content: 'Previous' });
    this.prevButton.node.onclick = () => {
      this.currentPage -= 1;
      this.changePage();
    };
    this.nextButton = new Button({ parentElement: this.node, classes: ['ubuntu-regular'], content: 'Next' });
    this.nextButton.node.onclick = () => {
      this.currentPage += 1;
      this.changePage();
    };

    this.containerPagination.node.append(this.prevButton.button, this.nextButton.button);
    this.checkStatePaginationControls();
    this.node.append(this.containerPagination.node);
  }

  checkStatePaginationControls() {
    this.checkPaginationPrevState();
    this.checkPaginationNextState();
  }

  checkPaginationPrevState() {
    const button = this.prevButton?.button;
    if (button) {
      if (this.currentPage > 1) button.disabled = false;
      else button.disabled = true;
    }
  }

  checkPaginationNextState() {
    const button = this.nextButton?.button;
    if (button) {
      if (this.currentPage < this.maxPages) button.disabled = false;
      else button.disabled = true;
    }
  }
}
