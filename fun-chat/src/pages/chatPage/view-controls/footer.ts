import { View } from '../../../components/view';
import { logoSchool } from '../../../components/shared';

export class Footer extends View {
  constructor(parentElement: HTMLElement) {
    super({ parentElement, classes: ['chat__footer', 'footer'] });
    this.render();
  }

  render() {
    const linkSchool = new View({ tagName: 'a', classes: ['footer__logo'], parentElement: this.node });
    linkSchool.node.innerHTML = `${logoSchool}`;
    linkSchool.node.setAttribute('href', 'https://rs.school/courses/javascript-mentoring-program');
    linkSchool.node.setAttribute('target', '_blank');
    const myName = new View({
      tagName: 'a',
      classes: ['footer__name'],
      content: 'Danila K.',
      parentElement: this.node
    });
    myName.node.setAttribute('href', 'https://github.com/FroZe36');
    myName.node.setAttribute('target', '_blank');
    const year = new View({ content: '2024', classes: ['footer__year'], tagName: 'span', parentElement: this.node });
    this.node.append(linkSchool.node, myName.node, year.node);
  }
}
