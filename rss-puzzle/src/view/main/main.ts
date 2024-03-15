import { View } from '../view';
import { Form } from '../formPage/form';
import './main.css';
import { StartView } from '../startPage/start';
import { User } from '../../types/interface';

export class MainView extends View {
  onLogInCallback: (user: User) => void;

  constructor(_onLogInCallback: (user: User) => void) {
    super({ tagName: 'main', classNames: [] });
    this.configureView();
    this.onLogInCallback = _onLogInCallback;
  }

  configureView() {
    if (localStorage.getItem('login')) {
      const startView = new StartView().getHtmlElement();
      this.elementCreator.addInnerElement(startView as HTMLElement);
    } else {
      const onLogIn = (user: User) => {
        this.onLogInCallback(user);
      };
      const form = new Form(onLogIn);
      this.elementCreator.addInnerElement(form.getHtmlElement() as HTMLElement);
    }
  }
}
