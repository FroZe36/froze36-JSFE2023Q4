import { socket } from '../../../api';
import { eventEmitter } from '../../../components/Event-emmiter/Event-emmiter';
import { Input } from '../../../components/input';
import { View } from '../../../components/view';
import {
  ResponseAllUsers,
  ResponseThirdPartyUser,
  ResponseUserAuth,
  SessionStorageUser,
  SocketSendMessage
} from '../../../types/interfaces';
// import { state } from '../../state';

export class Users extends View {
  searchInput: Input;

  usersContainer: View;

  users: { login: string; isLogined: boolean }[] = [];

  handleClickFromUsersList: (data: { login: string; isLogined: boolean }) => void;

  constructor(
    parentElement: HTMLElement,
    handleClickFromUsersList: (data: { login: string; isLogined: boolean }) => void
  ) {
    super({ classes: ['chat__users', 'users'], parentElement });
    this.searchInput = new Input({ parentElement: this.node, classes: ['users__search-input'] });
    this.searchInput.node.addEventListener('input', () => this.inputFilter());
    this.searchInput.node.placeholder = 'Search...';
    this.usersContainer = new View({ tagName: 'ul', classes: ['users__list'], parentElement: this.node });
    this.handleClickFromUsersList = handleClickFromUsersList;
    eventEmitter.on('auth/logIn', (data) => {
      const user = data as ResponseUserAuth;
      this.getUser(user);
    });
    eventEmitter.on('get/UserActive', (data) => {
      const users = data as ResponseAllUsers;
      this.getResponseAllUsersFromServer(users);
    });
    eventEmitter.on('get/UserInActive', (data) => {
      const users = data as ResponseAllUsers;
      this.getResponseAllUsersFromServer(users);
    });
    eventEmitter.on('server/UserLogIn', (data) => {
      const user = data as ResponseThirdPartyUser;
      this.getResponseUserFromServer(user);
    });
    eventEmitter.on('server/UserLogOut', (data) => {
      const user = data as ResponseThirdPartyUser;
      this.getResponseUserFromServer(user);
    });
    eventEmitter.on('auth/logOut', () => {
      this.users = [];
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

  getResponseAllUsersFromServer(response: ResponseAllUsers) {
    this.users = [...this.users, ...response.payload.users];
    this.addUsers();
  }

  getResponseUserFromServer(response: ResponseThirdPartyUser) {
    const { login, isLogined } = response.payload.user;
    const userIndex = this.users.findIndex((user) => user.login === login);
    if (userIndex !== -1) {
      this.users[userIndex].isLogined = isLogined;
    } else {
      this.users.push({ login, isLogined });
    }
    this.addUsers();
  }

  addUsers() {
    const userFromStorage: SessionStorageUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    this.usersContainer.node.innerHTML = '';
    this.users
      .filter(({ login }) => login !== userFromStorage.login)
      .sort((a, b) => {
        if (a.isLogined && !b.isLogined) return -1;
        if (b.isLogined && !a.isLogined) return 1;
        return 0;
      })
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
        uiUser.node.onclick = (e) => {
          const { target } = e;
          if (target instanceof HTMLElement) {
            this.handleClickFromUsersList(user);
          }
        };
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
