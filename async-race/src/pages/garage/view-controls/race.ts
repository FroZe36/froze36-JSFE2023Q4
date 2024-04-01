import { subscribeEvent, triggerEvent } from '../../../components/event-bus/event-bus';
import { constants } from '../../../components/shared';
import { View } from '../../../components/view';
import { Car, Engine } from '../../../types/types';
import { state } from '../../state';
import Track from './track';

export default class Race extends View {
  tracks: Track[] = [];

  cars: Car[];

  constructor(parentElement: HTMLElement, cars: Car[]) {
    super({ parentElement, classes: ['race'] });
    this.cars = cars;
    subscribeEvent('cars/raceStart', this.startRace.bind(this));
    subscribeEvent('cars/raceReset', this.resetRace.bind(this));
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

  startRace() {
    state.winnerCarId = constants.DEFAULT_WINNER_CAR_ID;

    this.updateTrackAccess(true);

    const startedEngines: Promise<Response>[] = [];
    const races: Promise<Response>[] = [];
    this.tracks.forEach((track) => {
      startedEngines.push(track.startEngine());
    });

    Promise.all(startedEngines).then((engines) => {
      engines.forEach((engine, index) => {
        races.push(this.tracks[index].raceAllCars(engine as unknown as Engine));
        this.tracks[index].isCarDriving = true;
        this.tracks[index].checkCarStatus();
      });
    });
    this.updateRaceState(true);
  }

  resetRace() {
    const stoppedCars: Promise<void>[] = [];
    this.tracks.forEach((track) => {
      stoppedCars.push(track.resetCar());
    });
    Promise.all(stoppedCars).then(() => {
      this.updateRaceState(false);
      this.updateTrackAccess(false);
    });
  }

  updateRaceState(newState: boolean) {
    state.isRaceStarted = newState;
    triggerEvent('race/started');
  }

  updateTrackAccess(raceStarted: boolean) {
    this.tracks.forEach((track) => {
      track.updateTrackAccess(raceStarted);
    });
  }
}
