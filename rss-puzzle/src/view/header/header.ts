import { BaseElement } from '../../utils/createElement';
import { View } from '../view';
import './header.css';

export class HeaderView extends View {
  constructor() {
    super({
      tagName: 'header',
      classNames: ['header'],
    });
    this.configureView();
  }

  configureView() {
    function logOut() {
      localStorage.removeItem('login');
    }

    const logOutButton = new BaseElement({
      tagName: 'button',
      classNames: ['button-logout'],
      text: 'Log Out',
      callback: logOut,
    });

    this.elementCreator.addInnerElement(logOutButton.getElement() as HTMLElement);
  }
}
