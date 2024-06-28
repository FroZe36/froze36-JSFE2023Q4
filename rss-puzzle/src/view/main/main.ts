import { View } from '../view';
import { Form } from '../formPage/form';
import './main.css';
import { StartView } from '../startPage/start';
import { User } from '../../types/interface';
import { GameView } from '../gamePage/game';

export class MainView extends View {
  onLogInCallback: (user: User) => void;

  constructor(_onLogInCallback: (user: User) => void) {
    super({ tagName: 'main', classNames: [] });
    this.configureView();
    this.onLogInCallback = _onLogInCallback;
  }

  configureView() {
    if (localStorage.getItem('login')) {
      const onGameStart = () => {
        this.configureView();
      };
      if (this.elementCreator.getElement()?.hasAttribute('game')) {
        this.elementCreator.getElement()?.firstChild?.remove();
        const gameView = new GameView();
        this.elementCreator.addInnerElement(gameView.getHtmlElement() as HTMLElement);
      } else {
        const startView = new StartView(onGameStart);
        this.elementCreator.addInnerElement(startView.getHtmlElement() as HTMLElement);
      }
    } else {
      const onLogIn = (user: User) => {
        this.onLogInCallback(user);
      };
      const formView = new Form(onLogIn);
      this.elementCreator.addInnerElement(formView.getHtmlElement() as HTMLElement);
    }
  }
}
