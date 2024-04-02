import { Car } from '../../types/types';
import { Button } from '../button';
import { View } from '../view';
import './modal.css';

export class Modal extends View {
  message: View;

  buttonCloseModal: Button;

  wrapper = new View({ classes: ['modal__wrapper'] });

  constructor(car: Car, time: number) {
    super({ classes: ['modal'] });
    this.message = new View({
      content: `${car.name} won the race! (${time.toFixed(2)}s)`,
      classes: ['modal__text', 'ubuntu-bold']
    });
    this.buttonCloseModal = new Button({
      classes: ['modal__button-close'],
      content: 'OK!'
    });
    this.wrapper.node.append(this.message.node, this.buttonCloseModal.button);
    this.node.append(this.wrapper.node);
  }

  render() {
    document.body.append(this.node);
    this.buttonCloseModal.button.onclick = () => this.closeModal();
  }

  closeModal() {
    document.body.querySelector('.modal')?.remove();
  }
}
