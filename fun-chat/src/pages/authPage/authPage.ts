import { Button } from '../../components/button';
import { Input } from '../../components/input';
import { generateUniqueId } from '../../components/shared';
import { View } from '../../components/view';
import { socket } from '../../api';
import './authPage.css';
import { SocketSendMessage } from '../../types/interfaces';

export class AuthPage extends View {
  inputName: Input;

  inputPassword: Input;

  buttonSubmit: Button;

  buttonAbout: Button;

  wrapperName = new View({ classes: ['auth__page-container'] });

  wrapperPassword = new View({ classes: ['auth__page-container'] });

  errorMessages = {
    nameErrorCapitalLetter: new View({
      tagName: 'span',
      content: 'Use lowercase and capital letters',
      classes: ['error']
    }),
    nameErrorTooShort: new View({
      tagName: 'span',
      content: 'Name must be more than 6 characters',
      classes: ['error']
    }),
    passwordErrorCapitalLetter: new View({
      tagName: 'span',
      content: 'Use lowercase and capital letters',
      classes: ['error']
    }),
    passwordErrorTooShort: new View({
      tagName: 'span',
      content: 'Password must be more than 6 characters',
      classes: ['error']
    })
  };

  isNameValid = false;

  isPasswordValid = false;

  constructor(setViewCallback: (pageNum: number) => void) {
    super({ classes: ['auth-page'] });
    this.inputName = new Input({ parentElement: this.node, classes: [] });
    this.inputName.node.id = 'nameInput';
    this.inputName.node.required = true;
    this.inputName.node.maxLength = 10;
    this.inputPassword = new Input({ parentElement: this.node, classes: [], type: 'password' });
    this.inputPassword.node.required = true;
    this.inputPassword.node.id = 'passwordInput';
    this.buttonSubmit = new Button({
      parentElement: this.node,
      classes: ['auth-page__btn', 'auth-page__btn_submit'],
      content: 'Log In'
    });
    this.buttonSubmit.button.type = 'submit';
    this.buttonSubmit.button.disabled = true;
    this.buttonAbout = new Button({
      parentElement: this.node,
      classes: ['auth-page__btn', 'auth-page__btn_about'],
      content: 'About'
    });
    this.buttonAbout.button.onclick = () => setViewCallback(1);
    this.render();
  }

  render() {
    this.createForm();
  }

  createForm() {
    const form = new View({ tagName: 'form', classes: ['auth-page__form'], parentElement: this.node });
    form.node.addEventListener('submit', this.onSubmit.bind(this));
    form.node.oninput = (e) => this.setValidate(e);
    const labelName = document.createElement('label');
    labelName.textContent = 'Name';
    labelName.htmlFor = 'nameInput';
    this.wrapperName.node.append(this.inputName.node);
    labelName.append(this.wrapperName.node);
    const labelPassword = document.createElement('label');
    labelPassword.htmlFor = 'passwordInput';
    labelPassword.textContent = 'Password';
    this.wrapperPassword.node.append(this.inputPassword.node);
    labelPassword.append(this.wrapperPassword.node);
    form.node.append(labelName, labelPassword, this.buttonSubmit.button);
    this.node.append(form.node, this.buttonAbout.button);
  }

  setValidate(event: Event) {
    if (event.target instanceof HTMLInputElement) {
      if (event.target.id === 'nameInput') {
        const isCapitalLetterValid = this.checkCapitalLetter(event.target, this.errorMessages.nameErrorCapitalLetter);
        const isTooShortValid = this.checkTooShort(event.target, this.errorMessages.nameErrorTooShort);
        this.isNameValid = !!(isCapitalLetterValid && isTooShortValid);
      } else if (event.target.id === 'passwordInput') {
        const isCapitalLetterValid = this.checkCapitalLetter(
          event.target,
          this.errorMessages.passwordErrorCapitalLetter
        );
        const isTooShortValid = this.checkTooShort(event.target, this.errorMessages.passwordErrorTooShort);
        this.isPasswordValid = !!(isCapitalLetterValid && isTooShortValid);
      }

      if (this.isNameValid && this.isPasswordValid) {
        this.buttonSubmit.button.disabled = false;
      } else {
        this.buttonSubmit.button.disabled = true;
      }
    }
  }

  checkCapitalLetter(input: HTMLInputElement, error: View): boolean {
    const { value } = input;
    const { parentElement } = input;
    const isValid = /[A-Z]+/.test(value);
    if (parentElement) {
      if (!isValid) {
        if (!parentElement.contains(error.node)) {
          parentElement.appendChild(error.node);
        }
      } else if (parentElement.contains(error.node)) {
        parentElement.removeChild(error.node);
      }
    }
    return isValid;
  }

  checkTooShort(input: HTMLInputElement, error: View): boolean {
    const { value } = input;
    const { parentElement } = input;
    const isValid = value.length > 6;
    if (parentElement) {
      if (!isValid) {
        if (!parentElement.contains(error.node)) {
          parentElement.appendChild(error.node);
        }
      } else if (parentElement.contains(error.node)) {
        parentElement.removeChild(error.node);
      }
    }
    return isValid;
  }

  onSubmit(e: Event) {
    e.preventDefault();
    const message: SocketSendMessage<{ user: { login: string; password: string } }> = {
      id: generateUniqueId(),
      type: 'USER_LOGIN',
      payload: {
        user: {
          login: this.inputName.node.value,
          password: this.inputPassword.node.value
        }
      }
    };
    // const storage: object[] = JSON.parse(localStorage.getItem('users')!);
    // storage.push({ id: user.id, user: user.payload?.user });
    // localStorage.setItem('users', JSON.stringify(storage));
    socket.sendMsg(message);
    sessionStorage.setItem(
      'user',
      JSON.stringify({
        id: message.id,
        login: message.payload?.user.login,
        password: message.payload?.user.password,
        isLogined: false
      })
    );
    this.inputName.node.value = '';
    this.inputPassword.node.value = '';
    this.buttonSubmit.button.disabled = true;
  }
}
