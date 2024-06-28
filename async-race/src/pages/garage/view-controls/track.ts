import {
  createWinner,
  deleteCar,
  deleteWinner,
  driveCar,
  getAllWinners,
  getWinner,
  startEngine,
  stopEngine,
  updateWinner
} from '../../../api';
import { Button } from '../../../components/button';
import { triggerEvent } from '../../../components/event-bus/event-bus';
import { Modal } from '../../../components/modal/modal';
import { constants, createSvg } from '../../../components/shared';
import { View } from '../../../components/view';
import { Car, Engine, Winner } from '../../../types/types';
import { state } from '../../state';

export default class Track extends View {
  car: Car;

  carContainer: View;

  carItem?: HTMLElement;

  selectBtn = new Button({ parentElement: this.node, content: 'Select', classes: ['ubuntu-regular'] });

  removeBtn = new Button({ parentElement: this.node, content: 'Remove', classes: ['ubuntu-regular'] });

  stopBtn = new Button({ parentElement: this.node, content: 'B', classes: ['ubuntu-regular'] });

  startBtn = new Button({ parentElement: this.node, content: 'A', classes: ['ubuntu-regular'] });

  isCarDriving = false;

  trackAnimationFrameId = 0;

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
    const carTitle = new View({ tagName: 'h4', classes: ['car-title', 'ubuntu-bold'], content: this.car.name });
    trackHeader.node.append(this.selectBtn.node, this.removeBtn.node, carTitle.node);
    return trackHeader;
  }

  createTrack() {
    const header = this.createTrackHeader();
    const road = new View({ classes: ['track-road'] });
    const carControls = this.createCarControls();
    const svg = createSvg(this.car.color);
    this.carContainer.node.append(svg);
    this.carItem = this.carContainer.node.querySelector('.icon') as HTMLElement;
    const finishPoint = new View({ classes: ['track-finish'] });
    road.node.append(carControls.node, this.carContainer.node, finishPoint.node);
    this.node.append(header.node, road.node);
    this.checkCarStatus();
  }

  createCarControls(): View {
    const controls = new View({ classes: ['track-wrapper-btn'] });
    this.startBtn.node.onclick = async () => {
      this.startBtn.button.disabled = true;
      const engine = await this.startEngine();
      this.raceSingleCar(engine);
      this.isCarDriving = true;
      this.checkCarStatus();
    };
    this.stopBtn.node.onclick = async () => {
      this.stopBtn.button.disabled = true;
      await this.stopEngine();
      this.isCarDriving = false;
      this.checkCarStatus();
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
    if ((await getAllWinners()).map((w: Winner) => w.id).includes(this.car.id)) {
      await deleteWinner(this.car.id);
    }
    triggerEvent('cars/update');
    triggerEvent('winners/update');
    triggerEvent('car/remove');
  }

  async startEngine() {
    const engine = await this.getEngine();
    return engine;
  }

  async raceSingleCar(engine: Engine) {
    this.startCarAnimation(engine);
    this.updateTrackAccess(true);
    const driving = await this.startDriving();
    if (!driving.ok) {
      cancelAnimationFrame(this.trackAnimationFrameId);
    }
  }

  async getEngine() {
    const data = await startEngine(this.car.id);
    return data;
  }

  async startDriving() {
    const res = await driveCar(this.car.id);
    return res;
  }

  async resetCar() {
    await this.stopEngine();
  }

  async stopEngine() {
    await stopEngine(this.car.id);
    if (this.carItem) {
      cancelAnimationFrame(this.trackAnimationFrameId);
      this.carItem.style.left = '0px';
      this.isCarDriving = false;
      this.updateTrackAccess(false);
    }
  }

  startCarAnimation(engine: Engine): number {
    const car = this.carItem as HTMLElement;
    const time = Math.trunc(engine.distance / engine.velocity);
    const distance = this.carContainer.node.clientWidth - car.clientWidth;
    const speed = distance / (time / 1000);
    const timestamp = new Date().getTime();
    this.trackAnimationFrameId = requestAnimationFrame(() => {
      this.animateCarMovement(car, speed, timestamp, time);
    });
    return time;
  }

  async updateWinner(raceTime: number, winner: Winner) {
    const fixedtime = +raceTime.toFixed(2);
    const updatedWinner = {
      wins: winner.wins + 1,
      time: fixedtime < winner.time ? fixedtime : winner.time
    };
    await updateWinner(winner.id, JSON.stringify(updatedWinner));
    triggerEvent('winners/update');
  }

  async addWinner(time: number) {
    const newWinner: Winner = {
      id: this.car.id,
      wins: 1,
      time: +time.toFixed(2)
    };
    await createWinner(JSON.stringify(newWinner));
    triggerEvent('winners/update');
  }

  async raceAllCars(engine: Engine) {
    const raceTime = this.startCarAnimation(engine);
    const driving = await this.startDriving();
    if (driving.ok) {
      if (state.winnerCarId === constants.DEFAULT_WINNER_CAR_ID) {
        const winnerId = this.car.id;
        state.winnerCarId = winnerId;
        const winner = await getWinner(winnerId);
        if (Object.keys(winner).length === 0) {
          await this.addWinner(raceTime / 1000);
        } else {
          await this.updateWinner(raceTime / 1000, winner);
        }
        const modal = new Modal(this.car, raceTime / 1000);
        modal.render();
      }
    } else cancelAnimationFrame(this.trackAnimationFrameId);
    return driving;
  }

  animateCarMovement(car: HTMLElement, speed: number, startTime: number, time: number) {
    const el = car;
    const timePassed = new Date().getTime() - startTime;
    const distance = (speed * timePassed) / 1000;
    el.style.left = `${distance}px`;
    if (timePassed < time) {
      this.trackAnimationFrameId = requestAnimationFrame(() => {
        this.animateCarMovement(el, speed, startTime, time);
      });
    }
  }

  checkCarStatus() {
    if (this.isCarDriving) {
      this.stopBtn.button.disabled = false;
      this.startBtn.button.disabled = true;
    } else {
      this.stopBtn.button.disabled = true;
      this.startBtn.button.disabled = false;
    }
  }

  updateTrackAccess(raceStarted: boolean) {
    if (!raceStarted) {
      this.checkCarStatus();
      this.selectBtn.button.disabled = false;
      this.removeBtn.button.disabled = false;
    } else {
      this.selectBtn.button.disabled = true;
      this.removeBtn.button.disabled = true;
      this.startBtn.button.disabled = true;
      this.stopBtn.button.disabled = true;
    }
  }
}
