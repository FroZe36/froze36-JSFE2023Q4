import { Button } from '../button';
import { View } from '../view';
import './modal.css';

export class Modal extends View {
  message: View;

  buttonCloseModal: Button;

  wrapper = new View({ classes: ['modal__wrapper'] });

  constructor(error: string) {
    super({ classes: ['modal'] });
    this.message = new View({
      content: error,
      classes: ['modal__text']
    });
    this.buttonCloseModal = new Button({
      classes: ['modal__button-close'],
      content: 'OK!'
    });
    this.wrapper.node.append(this.message.node);
    this.node.append(this.wrapper.node);
  }

  render() {
    this.wrapper.node.append(this.buttonCloseModal.button);
    document.body.append(this.node);
    this.buttonCloseModal.button.onclick = () => this.closeModal();
  }

  renderWithOutButton() {
    document.body.append(this.node);
  }

  closeModal() {
    document.body.querySelector('.modal')?.remove();
  }
}
