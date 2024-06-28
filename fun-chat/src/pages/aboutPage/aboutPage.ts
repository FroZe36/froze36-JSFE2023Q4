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
    const wrapper = new View({ classes: ['about-page-wrapper'], parentElement: this.node });
    const h1 = new View({
      classes: ['about-page__title'],
      parentElement: this.node,
      tagName: 'h3',
      content: 'The application was developed for the task of Fun Chat as part of the course RSSchool JS/FE 2023Q3'
    });
    const p = new View({
      tagName: 'p',
      classes: ['about-page__text'],
      parentElement: this.node,
      content: 'If you like the app, I will be glad of feedback!'
    });
    const myName = new View({
      tagName: 'a',
      classes: ['about-page__name'],
      content: 'Danila K.',
      parentElement: this.node
    });
    myName.node.setAttribute('href', 'https://github.com/FroZe36');
    myName.node.setAttribute('target', '_blank');
    const year = new View({
      content: '2024',
      classes: ['about-page__year'],
      tagName: 'span',
      parentElement: this.node
    });
    wrapper.node.append(myName.node, year.node);
    this.node.append(h1.node, p.node, wrapper.node, this.buttonBack.button);
  }
}
