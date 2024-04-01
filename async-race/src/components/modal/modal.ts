import { Car } from '../../types/types';
import { View } from '../view';
import './modal.css';

export class Modal extends View {
  message: string;

  constructor(car: Car, time: number) {
    super({ classes: ['modal'] });
    this.message = `${car.name} won the race! (${time.toFixed(2)}s)`;
    this.node.append(this.message);
  }

  render() {
    document.body.append(this.node);
  }
}
