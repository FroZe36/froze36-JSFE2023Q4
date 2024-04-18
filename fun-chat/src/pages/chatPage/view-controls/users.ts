import { Input } from '../../../components/input';
import { View } from '../../../components/view';

export class Users extends View {
  searchInput: Input;

  usersContainer: View;

  constructor(parentElement: HTMLElement) {
    super({ classes: ['chat__users', 'users'], parentElement });
    this.searchInput = new Input({ parentElement: this.node, classes: ['users__search-input'] });
    this.searchInput.node.placeholder = 'Search...';
    this.usersContainer = new View({ tagName: 'ul', classes: ['users__list'], parentElement: this.node });
    this.render();
  }

  render() {
    this.node.append(this.searchInput.node, this.usersContainer.node);
  }
}
