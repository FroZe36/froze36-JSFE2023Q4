import { View } from '../../components/view';

export class GarageView extends View {
  constructor(parentElement: HTMLElement) {
    super({ tagName: 'section', classes: ['garage'], content: 'Garage Page', parentElement });
  }
}
