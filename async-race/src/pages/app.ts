import { HeaderView } from '../components/header/header';
import { View } from '../components/view';
import { GarageView } from './garage/garage';
import { pages } from './pages';
import { WinnerView } from './winner/winner';
import { state } from './state';
import { backgroundsImages } from '../components/shared';

export class App {
  header: HeaderView;

  main: View;

  garagePage: GarageView;

  winnerPage: WinnerView;

  currentPage?: HTMLElement;

  constructor() {
    this.header = new HeaderView(this.setViewMain.bind(this));
    this.main = new View({ tagName: 'main', classes: ['main'] });
    this.garagePage = new GarageView(this.main.node);
    this.winnerPage = new WinnerView(this.main.node);
    pages.push(this.garagePage, this.winnerPage);

    this.setViewMain(0);
  }

  render() {
    document.body.append(this.header.node);
    document.body.append(this.main.node);
  }

  setViewMain(newPageNum: number) {
    if (this.main.node) {
      this.main.node.innerHTML = '';
    }
    state.activePage = newPageNum;
    this.currentPage = pages[newPageNum].node;
    this.main.node.append(this.currentPage);
    this.changeBackground();
  }

  changeBackground() {
    document.body.style.backgroundImage = `url(./assets/${backgroundsImages[state.activePage]})`;
  }
}
