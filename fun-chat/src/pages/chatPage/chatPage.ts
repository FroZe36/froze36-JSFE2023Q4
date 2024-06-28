import { View } from '../../components/view';
import { Header } from './view-controls/header';
import './chatPage.css';
import { Users } from './view-controls/users';
import { Chat } from './view-controls/chat';
import { Footer } from './view-controls/footer';

export class ChatPage extends View {
  header: Header;

  users: Users;

  wrapperSection = new View({ classes: ['wrapper'] });

  chat: Chat;

  footer: Footer;

  constructor(setViewCallback: (pageNum: number) => void) {
    super({ classes: ['chat'], tagName: 'main' });
    this.header = new Header(this.node, setViewCallback);
    this.users = new Users(this.node, this.handleClickFromUsersList.bind(this));
    this.chat = new Chat(this.node);
    this.footer = new Footer(this.node);
    this.render();
  }

  render() {
    this.wrapperSection.node.append(this.users.node, this.chat.node);
    this.node.append(this.header.node, this.wrapperSection.node, this.footer.node);
  }

  handleClickFromUsersList(target: { login: string; isLogined: boolean }) {
    this.chat.setUserFromUserList(target);
  }
}
