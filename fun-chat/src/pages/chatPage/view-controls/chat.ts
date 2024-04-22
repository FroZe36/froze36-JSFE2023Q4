import { socket } from '../../../api';
import { eventEmitter } from '../../../components/Event-emmiter/Event-emmiter';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { View } from '../../../components/view';
import { ResponseMsgSend, SessionStorageUser, SocketSendMessage } from '../../../types/interfaces';
import { state } from '../../state';
import { Message } from './message';

export class Chat extends View {
  dialog: View;

  messageInput: Input;

  buttonSend: Button;

  header: View;

  user: null | { login: string; isLogined: boolean };

  emptyTextMessageDialog: View;

  lsUser: null | SessionStorageUser;

  constructor(parentElement: HTMLElement) {
    super({ parentElement, classes: ['chat__dialog-container', 'dialog-container'] });
    this.dialog = new View({ classes: ['dialog-container__content'], parentElement: this.node });
    this.header = new View({ classes: ['dialog-container__header'], parentElement: this.node });
    this.messageInput = new Input({ classes: ['dialog-container__message-input'], parentElement: this.node });
    this.messageInput.node.placeholder = 'Write a message...';
    this.messageInput.node.disabled = true;
    this.buttonSend = new Button({
      classes: ['dialog-container__button-send'],
      parentElement: this.node,
      content: 'Send'
    });
    this.buttonSend.button.disabled = true;
    this.buttonSend.button.type = 'submit';
    this.emptyTextMessageDialog = new View({
      tagName: 'span',
      classes: ['dialog-container__content_text'],
      content: 'Select the user to send the message...',
      parentElement: this.node
    });
    /** МОжет быть понадобится */
    this.user = null;
    this.lsUser = null;
    eventEmitter.on('send/MessageTo', (data) => {
      const message = data as ResponseMsgSend;
      this.createMessage(message);
    });
    this.render();
  }

  render() {
    this.dialog.node.append(this.emptyTextMessageDialog.node);
    this.node.append(this.header.node, this.dialog.node);
    this.createFormSendMessage();
  }

  createFormSendMessage() {
    const form = new View({ tagName: 'form', classes: ['dialog-container__form'], parentElement: this.node });
    form.node.addEventListener('submit', this.sendMsgToUser.bind(this));
    form.node.oninput = (e) => this.setValidate(e);
    form.node.append(this.messageInput.node, this.buttonSend.button);
    this.node.append(form.node);
  }

  setUserFromUserList(data: { login: string; isLogined: boolean }) {
    this.header.node.innerHTML = '';
    const recipientName = new View({
      tagName: 'span',
      classes: ['dialog-container__recipient-name']
    });
    const recipientStatus = new View({
      tagName: 'li',
      classes: ['dialog-container__recipient-status']
    });
    recipientName.node.textContent = data.login;
    recipientStatus.node.textContent = data.isLogined ? 'Online' : 'Offline';
    recipientStatus.node.classList.add(data.isLogined ? 'active' : 'inactive');
    this.header.node.append(recipientName.node, recipientStatus.node);
    this.user = data;
    this.messageInput.node.disabled = false;
    this.emptyTextMessageDialog.node.textContent = 'Write your first message...';
  }

  setValidate(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value) {
        this.buttonSend.button.disabled = false;
      } else {
        this.buttonSend.button.disabled = true;
      }
    }
  }

  sendMsgToUser(e: Event) {
    e.preventDefault();
    const message: SocketSendMessage<{ message: { to: string; text: string } }> = {
      id: state.id || '',
      type: 'MSG_SEND',
      payload: {
        message: {
          to: this.user?.login || '',
          text: this.messageInput.node.value
        }
      }
    };
    if (message.id && message.payload?.message.to) {
      socket.sendMsg(message);
      this.messageInput.node.value = '';
      this.buttonSend.button.disabled = true;
    }
  }

  createMessage(data: ResponseMsgSend) {
    if (this.emptyTextMessageDialog.node) {
      this.emptyTextMessageDialog.node.remove();
    }
    const message = new Message(this.node, data, { user: this.user, lsUser: this.lsUser });
    this.dialog.node.append(message.node);
    // const container = new View({ classes: [] });
    // const { to, from, text, datetime, status } = data.payload.message;
    // const { day, month, year, hours, minutes, seconds } = this.transformDate(datetime);
    // const header = new View({ classes: [] });
    // const who = new View({ tagName: 'span', classes: [], content: this.lsUser?.login === from ? 'You' : to });
    // const dateElement = new View({
    //   tagName: 'span',
    //   classes: [],
    //   content: `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`
    // });
    // const msg = new View({ classes: [], content: text });
    // const stateOfMsg = new View({ classes: [], content: status.isDelivered ? 'delivered' : 'sent' });
  }

  // transformDate(timestap: number): {
  //   year: number;
  //   month: number;
  //   day: number;
  //   hours: number;
  //   minutes: number;
  //   seconds: number;
  // } {
  //   const date = new Date(timestap);
  //   const year = date.getFullYear();
  //   const month = date.getMonth() + 1;
  //   const day = date.getDate();
  //   const hours = date.getHours();
  //   const minutes = date.getMinutes();
  //   const seconds = date.getSeconds();
  //   return { year, month, day, hours, minutes, seconds };
  // }

  // getMessageResponse(responseMsg: ResponseMsgSend) {
  //   console.log(responseMsg);
  // }
}
