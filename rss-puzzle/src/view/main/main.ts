import { View } from '../view';
import { Form } from '../formPage/form';
import './main.css';
import { StartView } from '../startPage/start';

export class MainView extends View {
  constructor() {
    super({ tagName: 'main', classNames: [] });
    this.configureView();
  }

  configureView() {
    if (localStorage.getItem('login')) {
      const startView = new StartView().getHtmlElement();
      this.elementCreator.addInnerElement(startView as HTMLElement);
    } else {
      this.elementCreator.addInnerElement(new Form().getHtmlElement() as HTMLElement);
    }
  }
}
