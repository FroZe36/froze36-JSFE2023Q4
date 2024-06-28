import { socket } from '../../../api';
import { eventEmitter } from '../../../components/Event-emmiter/Event-emmiter';
import { Button } from '../../../components/button';
import { View } from '../../../components/view';
import { ResponseUserAuth, SessionStorageUser, SocketSendMessage } from '../../../types/interfaces';

export class Header extends View {
  callback: (pageNum: number) => void;

  userName: View;

  constructor(parentElement: HTMLElement, setViewCallback: (pageNum: number) => void) {
    super({ tagName: 'header', classes: ['chat__header', 'header'], parentElement });
    this.userName = new View({
      tagName: 'h2',
      classes: ['header__user-name'],
      parentElement: this.node
    });
    eventEmitter.on('auth/logIn', (data) => {
      const user = data as ResponseUserAuth;
      this.userName.node.textContent = `User: ${user.payload.user.login}`;
    });
    this.callback = setViewCallback;
    this.render();
  }

  render() {
    const wrapperButtons = new View({ classes: ['header__wrapper'] });
    const title = new View({ tagName: 'h2', classes: ['header__title'], content: 'FunChat', parentElement: this.node });
    const buttonAbout = new Button({
      classes: ['header__btn', 'header__btn_about'],
      content: 'About',
      parentElement: this.node
    });
    buttonAbout.button.onclick = () => this.callback(1);
    const buttonLogOut = new Button({
      classes: ['header__btn', 'header__btn_logout'],
      content: 'Log Out',
      parentElement: this.node
    });
    buttonLogOut.button.onclick = this.LogOut;
    wrapperButtons.node.append(buttonAbout.button, buttonLogOut.button);
    this.node.append(this.userName.node, title.node, wrapperButtons.node);
  }

  LogOut() {
    const userFromStorage: SessionStorageUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    const message: SocketSendMessage<{ user: { login: string; password: string } }> = {
      id: userFromStorage.id,
      type: 'USER_LOGOUT',
      payload: {
        user: {
          login: userFromStorage.login,
          password: userFromStorage.password || ''
        }
      }
    };
    socket.sendMsg(message);
  }
}
