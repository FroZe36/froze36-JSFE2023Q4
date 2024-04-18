import { Button } from '../../../components/button';
import { View } from '../../../components/view';

export class Header extends View {
  callback: (pageNum: number) => void;

  constructor(parentElement: HTMLElement, setViewCallback: (pageNum: number) => void) {
    super({ tagName: 'header', classes: ['chat__header', 'header'], parentElement });
    this.callback = setViewCallback;
    this.render();
  }

  render() {
    const wrapperButtons = new View({ classes: ['header__wrapper'] });
    const userName = new View({
      tagName: 'h2',
      classes: ['header__user-name'],
      content: `User: 111`,
      parentElement: this.node
    });
    const title = new View({ tagName: 'h2', classes: ['header__title'], content: 'FlyChat', parentElement: this.node });
    const buttonAbout = new Button({
      classes: ['header__btn', 'header__btn_about'],
      content: 'About',
      parentElement: this.node
    });
    buttonAbout.button.onclick = () => this.callback(1);
    const buttonLogOut = new Button({
      classes: ['header__btn', 'header__btn_logout'],
      content: 'Log Out',
      parentElement: this.node
    });
    wrapperButtons.node.append(buttonAbout.button, buttonLogOut.button);
    this.node.append(userName.node, title.node, wrapperButtons.node);
  }
}
