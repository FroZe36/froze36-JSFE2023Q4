import { View } from '../../components/view';

export class WinnerView extends View {
  constructor(parentElement: HTMLElement) {
    super({ tagName: 'section', classes: ['winner'], content: 'Winner Page', parentElement });
  }
}
