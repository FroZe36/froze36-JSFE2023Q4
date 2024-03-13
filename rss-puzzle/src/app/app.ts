import '../style.css';
import { MainView } from '../view/main/main';

export class App {
  createView() {
    const mainView = new MainView().getHtmlElement();
    document.body.append(mainView as Node);
  }
}
