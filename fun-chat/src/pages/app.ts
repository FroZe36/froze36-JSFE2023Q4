import { View } from '../components/view';
import { AboutPage } from './aboutPage/aboutPage';
import { AuthPage } from './authPage/authPage';
import { ChatPage } from './chatPage/chatPage';
import { pages } from './pages';
import { state } from './state';
// import { socket } from '../api';
import { SessionStorageUser, ResponseUserAuth, ResponseError } from '../types/interfaces';
import { eventEmitter } from '../components/Event-emmiter/Event-emmiter';
import { Modal } from '../components/modal/modal';

export class App {
  authPage: AuthPage;

  chatPage: ChatPage;

  aboutPage: AboutPage;

  root: View;

  hashPages = ['#auth', '#about', '#chat'];

  enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const { hash } = window.location;
      if (hash === this.hashPages[1]) {
        this.setView(1);
      } else if (hash === this.hashPages[0] && !state.isLogin) {
        this.setView(0);
      } else if (hash === this.hashPages[2] && state.isLogin) {
        this.setView(2);
      } else {
        this.setView(state.activePage);
      }
    });
  }

  currentPage?: HTMLElement;

  constructor() {
    this.root = new View({ classes: ['root', 'container'] });
    this.authPage = new AuthPage(this.changeLocation.bind(this));
    this.aboutPage = new AboutPage(this.changeLocation.bind(this));
    this.chatPage = new ChatPage(this.changeLocation.bind(this));
    eventEmitter.on('auth/logIn', (data) => {
      const user = data as ResponseUserAuth;
      this.logIn(user);
    });
    eventEmitter.on('auth/logOut', (data) => {
      const user = data as ResponseUserAuth;
      this.logOut(user);
    });
    eventEmitter.on('error', (data) => {
      const error = data as ResponseError;
      new Modal(error.payload.error).render();
    });
    pages.push(this.authPage, this.aboutPage, this.chatPage);
    this.setView(0);
  }

  render() {
    document.body.append(this.root.node);
    this.enableRouteChange();
  }

  setView(newPageNum: number) {
    if (this.root.node) {
      this.root.node.innerHTML = '';
    }
    const prevPage = state.activePage;
    if (newPageNum !== 0) {
      state.prevPage = prevPage;
    } else {
      state.prevPage = null;
    }
    state.activePage = newPageNum;
    window.location.hash = this.hashPages[newPageNum];
    this.currentPage = pages[newPageNum].node;
    this.root.node.append(this.currentPage);
  }

  changeLocation(newPageNum: number) {
    window.location.hash = this.hashPages[newPageNum];
  }

  logIn(response: ResponseUserAuth) {
    const user = {
      id: response.id,
      login: response.payload.user.login,
      isLogined: response.payload.user.isLogined
    };
    const userFromStorage: SessionStorageUser = JSON.parse(sessionStorage.getItem('user') || '{}');
    userFromStorage.isLogined = user.isLogined;
    sessionStorage.setItem('user', JSON.stringify(userFromStorage));
    this.chatPage.chat.lsUser = userFromStorage;
    state.isLogin = user.isLogined;
    state.id = user.id;
    this.changeLocation(2);
  }

  logOut(response: ResponseUserAuth) {
    const user = {
      id: response.id,
      login: response.payload.user.login,
      isLogined: response.payload.user.isLogined
    };
    sessionStorage.removeItem('user');
    state.isLogin = user.isLogined;
    state.id = user.id;
    this.changeLocation(0);
  }
}
