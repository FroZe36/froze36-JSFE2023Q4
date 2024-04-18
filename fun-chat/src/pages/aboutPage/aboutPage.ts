import { Button } from '../../components/button';
import { View } from '../../components/view';
import { state } from '../state';
import './aboutPage.css';

export class AboutPage extends View {
  buttonBack: Button;

  constructor(setViewCallback: (pageNum: number) => void) {
    super({ classes: ['about-page'] });
    this.buttonBack = new Button({ classes: ['about-page__button'], parentElement: this.node, content: 'Go Back' });
    this.buttonBack.button.onclick = () => setViewCallback(state.prevPage!);
    this.render();
  }

  render() {
    this.node.textContent = 'About Page';
    this.node.append(this.buttonBack.button);
  }
}
