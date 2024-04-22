import { socket } from '../../../api';
import { eventEmitter } from '../../../components/Event-emmiter/Event-emmiter';
import { Input } from '../../../components/input';
import { View } from '../../../components/view';
import { ResponseAllUsers, ResponseUserAuth, SessionStorageUser, SocketSendMessage } from '../../../types/interfaces';
// import { state } from '../../state';

export class Users extends View {
  searchInput: Input;

  usersContainer: View;

  users: { login: string; isLogined: boolean }[] = [];

  constructor(parentElement: HTMLElement) {
    super({ classes: ['chat__users', 'users'], parentElement });
    this.searchInput = new Input({ parentElement: this.node, classes: ['users__search-input'] });
    this.searchInput.node.addEventListener('input', () => this.inputFilter());
    this.searchInput.node.placeholder = 'Search...';
    this.usersContainer = new View({ tagName: 'ul', classes: ['users__list'], parentElement: this.node });
    eventEmitter.on('auth/logIn', (data) => {
      const user = data as ResponseUserAuth;
      this.getUser(user);
    });
    eventEmitter.on('get/UserActive', (data) => {
      const users = data as ResponseAllUsers;
      this.getResponseUser(users);
    });
    eventEmitter.on('get/UserInActive', (data) => {
      const users = data as ResponseAllUsers;
      this.getResponseUser(users);
    });
    this.render();
  }

  render() {
    this.node.append(this.searchInput.node, this.usersContainer.node);
  }

  getUser(response: ResponseUserAuth) {
    const messageUserActive: SocketSendMessage<null> = {
      id: response.id,
      type: 'USER_ACTIVE',
      payload: null
    };
    const messageUserInActive: SocketSendMessage<null> = {
      id: response.id,
      type: 'USER_INACTIVE',
      payload: null
    };
    socket.sendMsg(messageUserActive);
    socket.sendMsg(messageUserInActive);
  }

  getResponseUser(response: ResponseAllUsers) {
    this.users = [...response.payload.users];
    this.addUsers();
  }

  addUsers() {
    const userFromStorage: SessionStorageUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.usersContainer.node.innerHTML = '';
    this.users
      .filter(({ login }) => login !== userFromStorage.login)
      .forEach((user) => {
        const uiUser = new View({
          tagName: 'li',
          classes: [
            'users__list-element',
            user.isLogined ? 'users__list-element_active' : 'users__list-element_inactive'
          ],
          parentElement: this.node,
          content: user.login
        });
        this.usersContainer.node.append(uiUser.node);
      });
  }

  inputFilter() {
    const filter = this.searchInput.node.value.toLowerCase();
    Array.from(this.usersContainer.node.getElementsByTagName('li')).forEach((item) => {
      const text = item.textContent?.toLowerCase();
      const escapedFilter = filter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`^${escapedFilter}`, 'i');
      const el = item;
      if (regex.test(text!)) {
        el.style.display = 'list-item';
      } else {
        el.style.display = 'none';
      }
    });
  }
}
