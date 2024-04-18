import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { View } from '../../../components/view';

export class Chat extends View {
  recipientName: View;

  recipientStatus: View;

  dialog: View;

  messageInput: Input;

  buttonSend: Button;

  constructor(parentElement: HTMLElement) {
    super({ parentElement, classes: ['chat__dialog-container', 'dialog-container'] });
    this.recipientName = new View({
      tagName: 'span',
      content: 'user',
      parentElement: this.node,
      classes: ['dialog-container__recipient-name']
    });
    this.recipientStatus = new View({
      tagName: 'span',
      content: 'offline',
      parentElement: this.node,
      classes: ['dialog-container__recipient-status']
    });
    this.dialog = new View({ classes: ['dialog-container__content'], parentElement: this.node });
    this.messageInput = new Input({ classes: ['dialog-container__message-input'], parentElement: this.node });
    this.messageInput.node.placeholder = 'Write a message...';
    this.buttonSend = new Button({
      classes: ['dialog-container__button-send'],
      parentElement: this.node,
      content: 'Send'
    });
    this.buttonSend.button.disabled = true;
    this.buttonSend.button.type = 'submit';
    this.render();
  }

  render() {
    this.createRecipientHeader();
    this.node.append(this.dialog.node);
    this.createFormSendMessage();
  }

  createFormSendMessage() {
    const form = new View({ tagName: 'form', classes: ['dialog-container__form'], parentElement: this.node });
    form.node.append(this.messageInput.node, this.buttonSend.button);
    this.node.append(form.node);
  }

  createRecipientHeader() {
    const header = new View({ classes: ['dialog-container__header'], parentElement: this.node });
    header.node.append(this.recipientName.node, this.recipientStatus.node);
    this.node.append(header.node);
  }
}
