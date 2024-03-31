import { createCar } from '../../../api';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { View } from '../../../components/view';

export class CreateCarControlView extends View {
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
      content: 'Create Car',
      classes: ['control__button', 'ubuntu-medium']
    });
    this.buttonSubmit.button.type = 'submit';
    this.render();
  }

  render() {
    const form = new View({ parentElement: this.node, tagName: 'form', classes: ['control__car-form'] });
    form.node.onsubmit = (e: Event) => e.preventDefault;
    this.buttonSubmit.button.onclick = async () => {
      const isValid = this.nameInput.node.checkValidity();
      if (!isValid) return;
      await this.addCar(this.nameInput.node.value, this.colorPicker.node.value);
      this.nameInput.node.value = '';
    };
    form.node.append(this.nameInput.node, this.colorPicker.node, this.buttonSubmit.node);
    this.node.append(form.node);
  }

  async addCar(name: string, color: string) {
    const car = {
      name,
      color
    };
    await createCar(JSON.stringify(car));
  }
}
