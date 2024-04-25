import { View } from '../../../components/view';
import { DataMsgType, SessionStorageUser } from '../../../types/interfaces';

export class Message extends View {
  header = new View({ classes: ['message-header'] });

  user: View;

  dateElement: View;

  textMsg: View;

  stateMsg: View;

  newUser: { login: string; isLogined: boolean } | null;

  lsUser: SessionStorageUser | null;

  data: DataMsgType;

  constructor(
    parentElement: HTMLElement,
    data: DataMsgType,
    dataObj: { user: { login: string; isLogined: boolean } | null; lsUser: SessionStorageUser | null }
  ) {
    super({ parentElement, classes: ['message'] });
    this.user = new View({
      tagName: 'span',
      classes: ['message-header__user'],
      parentElement: this.node
    });
    this.dateElement = new View({
      tagName: 'span',
      classes: ['message-header__date'],
      parentElement: this.node
    });
    this.textMsg = new View({ classes: ['message__text'], parentElement: this.node });
    this.stateMsg = new View({ classes: ['message__state'], parentElement: this.node });
    this.newUser = dataObj.user;
    this.lsUser = dataObj.lsUser;
    this.data = data;
    this.render();
  }

  render() {
    this.setUser();
    this.setDate();
    this.setText();
    this.setState();
    this.header.node.append(this.user.node, this.dateElement.node);
    this.node.append(this.header.node, this.textMsg.node, this.stateMsg.node);
  }

  setUser() {
    this.user.node.textContent = this.lsUser?.login === this.data.from ? 'You' : this.data.from;

    if (this.lsUser?.login === this.data.from) {
      this.node.style.alignSelf = 'flex-end';
    } else {
      this.node.style.alignSelf = 'flex-start';
    }
  }

  setState() {
    const { isDelivered, isEdited, isReaded } = this.data.status;
    if (isEdited) {
      this.stateMsg.node.textContent = 'changed';
    } else if (isReaded && this.lsUser?.login === this.data.from) {
      this.stateMsg.node.textContent = 'read';
    } else if (isDelivered && this.lsUser?.login === this.data.from) {
      this.stateMsg.node.textContent = 'delivered';
    } else if (!isReaded && !isDelivered && this.lsUser?.login === this.data.from) {
      this.stateMsg.node.textContent = 'sent';
    } else {
      this.stateMsg.node.textContent = '';
    }
  }

  setText() {
    this.textMsg.node.textContent = this.data.text;
  }

  setDate() {
    const { year, month, day, seconds, minutes, hours } = this.transformDate(this.data.datetime);
    this.dateElement.node.textContent = `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`;
  }

  transformDate(timestap: number): {
    year: number;
    month: string;
    day: string;
    hours: string;
    minutes: string;
    seconds: string;
  } {
    const date = new Date(timestap);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return { year, month, day, hours, minutes, seconds };
  }
}
