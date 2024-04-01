import { getCar, updateCar } from '../../../api';
import { Button } from '../../../components/button';
import { subscribeEvent, triggerEvent } from '../../../components/event-bus/event-bus';
import { Input } from '../../../components/input';
import { constants } from '../../../components/shared';
import { View } from '../../../components/view';
import { Car } from '../../../types/types';
import { state } from '../../state';

export class UpdateCarControlView extends View {
  nameInput: Input;

  colorPicker: Input;

  buttonSubmit: Button;

  constructor(parentElement: HTMLElement) {
    super({ parentElement, classes: ['garage__control-wrapper', 'control'] });

    this.nameInput = new Input({ parentElement: this.node, classes: ['control__input-name', 'ubuntu-medium'] });
    this.nameInput.node.required = true;
    this.colorPicker = new Input({ parentElement: this.node, classes: ['control__input-color'], type: 'color' });
    this.buttonSubmit = new Button({
      parentElement: this.node,
      content: 'Update Car',
      classes: ['control__button', 'ubuntu-medium']
    });
    this.buttonSubmit.button.type = 'submit';
    subscribeEvent('car/select', this.fillCarData.bind(this));
    subscribeEvent('car/remove', this.resetControlsState.bind(this));
    this.render();
  }

  render() {
    const form = new View({ parentElement: this.node, tagName: 'form', classes: ['control__car-form'] });
    form.node.onsubmit = (e: Event) => e.preventDefault();
    this.checkButton();
    this.buttonSubmit.button.onclick = async () => {
      const isValid = this.nameInput.node.checkValidity();
      if (!isValid) return;
      await this.updateCar();
    };
    form.node.append(this.nameInput.node, this.colorPicker.node, this.buttonSubmit.node);
    this.node.append(form.node);
  }

  async updateCar() {
    const newCar = {
      name: this.nameInput.node.value,
      color: this.colorPicker.node.value
    };
    await updateCar(state.activeCarId, JSON.stringify(newCar));
    await triggerEvent('cars/update');
    this.resetControlsState();
  }

  clearControls() {
    this.nameInput.node.value = '';
    this.colorPicker.node.value = '#000000';
  }

  async fillCarData() {
    const car: Car = await getCar(state.activeCarId);
    this.nameInput.node.value = car.name;
    this.colorPicker.node.value = car.color;
    this.checkButton();
  }

  clearActiveCar() {
    state.activeCarId = constants.DEFAULT_ACTIVE_CAR_ID;
  }

  checkButton() {
    if (state.activeCarId !== 0) {
      this.buttonSubmit.button.disabled = false;
    } else this.buttonSubmit.button.disabled = true;
  }

  resetControlsState() {
    this.clearActiveCar();
    this.clearControls();
    this.checkButton();
  }
}
