import '../style.css';
import { HeaderView } from '../view/header/header';
import { MainView } from '../view/main/main';

export class App {
  createView() {
    if (localStorage.getItem('login')) {
      const headerView = new HeaderView().getHtmlElement();
      document.body.prepend(headerView as Node);
    }
    const mainView = new MainView().getHtmlElement();
    document.body.append(mainView as Node);
  }
}
