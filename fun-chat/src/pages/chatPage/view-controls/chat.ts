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
  DataMsgType,
  NotificationDeliveryStatusChanged,
  NotificationOfMessageReadStatusChange
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

  isHistoryCompleted = false;

  requestSent = false;

  messagesTo: DataMsgType[] = [];

  constructor(parentElement: HTMLElement) {
    super({ parentElement, classes: ['chat__dialog-container', 'dialog-container'] });
    this.dialog = new View({ classes: ['dialog-container__content'], parentElement: this.node });
    this.dialog.node.style.scrollBehavior = 'smooth';
    this.header = new View({ classes: ['dialog-container__header'], parentElement: this.node });
    this.messageInput = new Input({ classes: ['dialog-container__message-input'], parentElement: this.node });
    this.buttonSend = new Button({
      classes: ['dialog-container__button-send'],
      parentElement: this.node,
      content: 'Send'
    });
    this.emptyTextMessageDialog = new View({
      tagName: 'span',
      classes: ['dialog-container__content_text'],
      content: 'Select the user to send the message...',
      parentElement: this.node
    });
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
    eventEmitter.on('statusMsg/Delivered', (data) => {
      const message = data as NotificationDeliveryStatusChanged;
      this.changeStateDelivired(message);
    });
    eventEmitter.on('statusMsg/Readed', (data) => {
      const message = data as NotificationOfMessageReadStatusChange;
      const msg = { ...message };
      // this.changeStateReaded(msg);
      console.log(msg);
    });
    this.render();
  }

  render() {
    this.dialog.node.append(this.emptyTextMessageDialog.node);
    this.node.append(this.header.node, this.dialog.node);
    this.createFormSendMessage();
    this.buttonSend.button.disabled = true;
    this.buttonSend.button.type = 'submit';
    this.messageInput.node.placeholder = 'Write a message...';
    this.messageInput.node.disabled = true;
  }

  createFormSendMessage() {
    const form = new View({ tagName: 'form', classes: ['dialog-container__form'], parentElement: this.node });
    form.node.addEventListener('submit', this.sendMsgToSocket.bind(this));
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
    const recipientName = new View({ tagName: 'span', classes: ['dialog-container__recipient-name'] });
    const recipientStatus = new View({ tagName: 'li', classes: ['dialog-container__recipient-status'] });
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
    this.requestSent = false;
    this.isHistoryCompleted = false;
    if (!this.dialogIsOpen) this.dialogIsOpen = true;
    this.handlerReadedStatus();
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
      this.findedMessageIsNotReaded(responseMessages);
      this.scrollMessages();
      this.isHistoryCompleted = true;
    }
  }

  sendMsgToSocket(e: Event) {
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
    if (message.id && message.payload?.message.to) {
      socket.sendMsg(message);
      this.messageInput.node.value = '';
      this.buttonSend.button.disabled = true;
    }
  }

  findedMessageIsNotReaded(arr: DataMsgType[]) {
    if (this.dialog.node.querySelector('.new-message-separator')) {
      this.dialog.node.querySelector('.new-message-separator')?.remove();
    }
    const index = arr.findIndex((msg: DataMsgType) => !msg.status.isReaded);
    const findedMessage = arr.find((msg: DataMsgType) => !msg.status.isReaded);
    if (findedMessage?.from !== this.lsUser?.login) {
      const div = new View({ classes: ['new-message-separator'], parentElement: this.node });
      div.node.innerHTML = '<span>New Messages</span>';
      const firstNotReadedMessage = this.dialog.node.querySelectorAll('.message')[index];
      this.dialog.node.insertBefore(div.node, firstNotReadedMessage);
    }
  }

  createMessage(data: DataMsgType) {
    if (this.dialogIsOpen) {
      if (this.emptyTextMessageDialog.node.style.display === 'inline') {
        this.emptyTextMessageDialog.node.style.display = 'none';
        this.dialog.node.style.justifyContent = 'flex-start';
      }
      const message = new Message(this.node, data, { user: this.user, lsUser: this.lsUser });
      this.messagesTo.push(data);
      message.node.setAttribute('data-id', data.id);
      this.dialog.node.append(message.node);
      if (this.isHistoryCompleted) {
        this.findedMessageIsNotReaded(this.messagesTo);
        this.requestSent = false;
        this.handlerReadedStatus();
        this.scrollMessages();
      }
    }
  }

  changeStateDelivired(state: NotificationDeliveryStatusChanged) {
    this.dialog.node.querySelectorAll('.message').forEach((msg) => {
      const atrId = msg.getAttribute('data-id');
      if (atrId === state.payload.message.id) {
        const message = msg.querySelector('.message__state');
        if (message) message.textContent = 'delivered';
      }
    });
  }

  handlerReadedStatus() {
    if (this.dialogIsOpen) {
      const form = this.node.querySelector('.dialog-container__form') as HTMLFormElement;
      this.dialog.node.onwheel = () => {
        if (!this.requestSent) {
          this.sendReadedStatus();
          this.requestSent = true;
        }
      };
      this.dialog.node.onclick = () => {
        if (!this.requestSent) {
          this.sendReadedStatus();
          this.requestSent = true;
        }
      };
      form.onsubmit = () => {
        if (!this.requestSent) {
          this.sendReadedStatus();
          this.requestSent = true;
        }
      };
    }
  }

  sendReadedStatus() {
    const arr = this.messagesTo.filter((msg) => msg.from === this.lsUser?.login).filter((msg) => !msg.status.isReaded);
    arr.forEach((msg) => {
      const message: SocketSendMessage<{ message: { id: string } }> = {
        id: this.lsUser?.id,
        type: 'MSG_READ',
        payload: {
          message: {
            id: msg.id
          }
        }
      };
      socket.sendMsg(message);
    });
  }

  // changeStateReaded(state: {
  //   id: string;
  //   type: 'MSG_READ';
  //   payload: {
  //     message: {
  //       id: string;
  //       status: {
  //         isReaded: boolean;
  //       };
  //     };
  //   };
  // }) {
  // const arr = this.messagesTo.filter((msg) => msg.to === this.lsUser?.login);
  // // Array.from(this.dialog.node.querySelectorAll('.message')).filter((msg) => msg.hasAttribute('sender'));
  // this.dialog.node.querySelectorAll('.message').forEach((msg) => {
  //   if (arr.id === state.payload.message.id) {
  //     const message = msg.querySelector('.message__state');
  //     if (message) message.textContent = 'read';
  //   }
  // });
  // arr.forEach((msg) => {
  //   // const atrId = msg.getAttribute('sender');
  //   if (msg.id === state.payload.message.id) {
  //     const message = msg.querySelector('.message__state');
  //     if (message) message.textContent = 'read';
  //   }
  // });
  // }

  scrollMessages() {
    const seperator = this.dialog.node.querySelector('.new-message-separator');
    if (seperator) {
      seperator.scrollIntoView(true);
    } else this.dialog.node.scrollTop = this.dialog.node.scrollHeight;
  }
}
