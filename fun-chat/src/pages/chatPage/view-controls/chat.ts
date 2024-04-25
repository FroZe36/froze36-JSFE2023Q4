import { socket } from '../../../api';
import { eventEmitter } from '../../../components/Event-emmiter/Event-emmiter';
import { Button } from '../../../components/button';
import { Input } from '../../../components/input';
import { View } from '../../../components/view';
import {
  FetchingMessagesWithUser,
  ResponseMsgSend,
  SessionStorageUser,
  SocketSendMessage,
  DataMsgType
} from '../../../types/interfaces';
import { Message } from './message';

export class Chat extends View {
  dialog: View;

  messageInput: Input;

  buttonSend: Button;

  header: View;

  user: null | { login: string; isLogined: boolean };

  emptyTextMessageDialog: View;

  lsUser: null | SessionStorageUser;

  dialogIsOpen = false;

  constructor(parentElement: HTMLElement) {
    super({ parentElement, classes: ['chat__dialog-container', 'dialog-container'] });
    this.dialog = new View({ classes: ['dialog-container__content'], parentElement: this.node });
    this.dialog.node.style.scrollBehavior = 'smooth';
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
      this.createMessage(message.payload.message);
    });
    eventEmitter.on('history/UserMessages', (data) => {
      const message = data as FetchingMessagesWithUser;
      this.getHistoryMessages(message.payload.messages);
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
    if (this.emptyTextMessageDialog.node.style.display === 'none') {
      while (this.dialog.node.querySelector('.message')) {
        this.dialog.node.querySelector('.message')?.remove();
      }
    }
    if (this.dialog.node.querySelector('.new-message-separator'))
      this.dialog.node.querySelector('.new-message-separator')?.remove();
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
    const message: SocketSendMessage<{ user: { login: string } }> = {
      id: this.lsUser?.id,
      type: 'MSG_FROM_USER',
      payload: {
        user: {
          login: data.login
        }
      }
    };
    socket.sendMsg(message);
    this.messageInput.node.disabled = false;
    this.messageInput.node.value = '';
    if (!this.dialogIsOpen) this.dialogIsOpen = true;
  }

  setValidate(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.value.trim() !== '') {
        this.buttonSend.button.disabled = false;
      } else {
        this.buttonSend.button.disabled = true;
      }
    }
  }

  getHistoryMessages(responseMessages: DataMsgType[]) {
    if (!responseMessages.length) {
      this.dialog.node.style.justifyContent = 'center';
      this.emptyTextMessageDialog.node.style.display = 'inline';
      this.emptyTextMessageDialog.node.textContent = 'Write your first message...';
    } else {
      this.emptyTextMessageDialog.node.style.display = 'none';
      this.dialog.node.style.justifyContent = 'flex-start';
      responseMessages.forEach((msg: DataMsgType) => this.createMessage(msg));
      const index = responseMessages.findIndex((msg: DataMsgType) => !msg.status.isReaded);
      const findedMessage = responseMessages.find((msg: DataMsgType) => !msg.status.isReaded);
      if (findedMessage?.from !== this.lsUser?.login) {
        const div = new View({ classes: ['new-message-separator'], parentElement: this.node });
        div.node.innerHTML = '<span>New Messages</span>';
        const firstNotReadedMessage = this.dialog.node.querySelectorAll('.message')[index];
        this.dialog.node.insertBefore(div.node, firstNotReadedMessage);
        div.node.scrollIntoView(true);
      }
    }
  }

  sendMsgToUser(e: Event) {
    e.preventDefault();
    const message: SocketSendMessage<{ message: { to: string; text: string } }> = {
      id: this.lsUser?.id,
      type: 'MSG_SEND',
      payload: {
        message: {
          to: this.user?.login || '',
          text: this.messageInput.node.value
        }
      }
    };
    console.log('abs');
    if (message.id && message.payload?.message.to) {
      socket.sendMsg(message);
      this.messageInput.node.value = '';
      this.buttonSend.button.disabled = true;
    }
  }

  createMessage(data: DataMsgType) {
    if (this.dialogIsOpen) {
      if (this.emptyTextMessageDialog.node.style.display === 'inline') {
        this.emptyTextMessageDialog.node.style.display = 'none';
        this.dialog.node.style.justifyContent = 'flex-start';
      }
      const message = new Message(this.node, data, { user: this.user, lsUser: this.lsUser });
      console.log(message);
      this.dialog.node.append(message.node);
      this.dialog.node.scrollTop = this.dialog.node.scrollHeight;
    }
  }
}
