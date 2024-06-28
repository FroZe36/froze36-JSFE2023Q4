import '../style.css';
import { User } from '../types/interface';
import { HeaderView } from '../view/header/header';
import { MainView } from '../view/main/main';

export class App {
  user: User | null = null;

  createView() {
    if (localStorage.getItem('login')) {
      const header = new HeaderView();
      header.onLogOut = () => {
        document.body.innerHTML = '';
        this.createView();
      };
      document.body.prepend(header.getHtmlElement() as Node);
    }
    const onLogIn = (data: User) => {
      document.body.innerHTML = '';
      this.user = data;
      this.createView();
    };
    document.body.append(new MainView(onLogIn).getHtmlElement() as Node);
  }
}
