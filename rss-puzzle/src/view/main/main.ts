import { View } from '../view';
import { Form } from '../form/form';
import './main.css';

export class MainView extends View {
  constructor() {
    super({ tagName: 'main', classNames: [] });
    this.configureView();
  }

  configureView() {
    this.elementCreator.addInnerElement(new Form().getHtmlElement() as HTMLElement);
  }
}
