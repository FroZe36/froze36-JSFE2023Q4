import { View } from '../components/view';
import { AboutPage } from './aboutPage/aboutPage';
import { AuthPage } from './authPage/authPage';
import { ChatPage } from './chatPage/chatPage';
import { pages } from './pages';
import { state } from './state';

export class App {
  authPage: AuthPage;

  chatPage: ChatPage;

  aboutPage: AboutPage;

  root: View;

  hashPages = ['#auth', '#about', '#chat'];

  enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const { hash } = window.location;
      console.log(hash);
      if (hash === this.hashPages[1]) {
        this.setView(1);
      } else if (hash === this.hashPages[0]) {
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
    console.log(state.activePage, state.prevPage);
    this.currentPage = pages[newPageNum].node;
    this.root.node.append(this.currentPage);
  }

  changeLocation(newPageNum: number) {
    window.location.hash = this.hashPages[newPageNum];
  }
}
