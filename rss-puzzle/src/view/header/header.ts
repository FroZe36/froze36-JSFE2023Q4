import { BaseElement } from '../../utils/createElement';
import { View } from '../view';
import './header.css';

export class HeaderView extends View {
  onLogOut: (() => void) | null = null;

  name?: string;

  constructor() {
    super({
      tagName: 'header',
      classNames: ['header'],
    });
    this.configureView();
  }

  configureView() {
    const logOut = () => {
      localStorage.removeItem('login');
      if (this.onLogOut) {
        this.onLogOut();
      }

      // while (document.body.firstChild) {
      //   document.body.firstChild.remove();
      // }
      // document.body.append(new Form().getHtmlElement() as HTMLElement);
    };

    const logOutButton = new BaseElement({
      tagName: 'button',
      classNames: ['button-logout'],
      text: 'Log Out',
      callback: logOut,
    });

    this.elementCreator.addInnerElement(logOutButton.getElement() as HTMLElement);
  }
}
