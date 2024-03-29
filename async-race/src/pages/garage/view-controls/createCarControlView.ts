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
    this.node.append(this.nameInput.node, this.colorPicker.node, this.buttonSubmit.node);
  }
}
