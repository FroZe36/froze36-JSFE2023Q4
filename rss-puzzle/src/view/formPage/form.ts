import { View } from '../view';
import { InputCreator } from '../../utils/input-element/createInput';
import { BaseElement } from '../../utils/createElement';
import './form.css';
import { User } from '../../types/interface';

export class Form extends View {
  nameDivWrapper;

  surnameDivWrapper;

  buttonSumbit;

  nameTextError;

  surnameTextError;

  onLogIn: (user: User) => void;

  constructor(_onLogIn: (user: User) => void) {
    super({
      tagName: 'form',
      classNames: ['form-login'],
    });
    this.nameDivWrapper = new InputCreator({
      tagName: 'div',
      classNames: ['login'],
      text: 'First Name',
    });
    this.surnameDivWrapper = new InputCreator({
      tagName: 'div',
      classNames: ['login'],
      text: 'Surname',
    });
    this.buttonSumbit = new BaseElement({
      tagName: 'button',
      classNames: ['button-submit', 'button-submit_active'],
      text: 'Login In',
    });
    this.nameTextError = document.createElement('p');
    this.surnameTextError = document.createElement('p');
    this.onLogIn = _onLogIn;
    this.configureView();
    this.init();
  }

  init() {
    this.elementCreator.addInnerElement(this.nameDivWrapper.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(this.surnameDivWrapper.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(this.buttonSumbit.getElement() as HTMLElement);
    this.nameDivWrapper.getElement()?.append(this.nameTextError);
    this.surnameDivWrapper.getElement()?.append(this.surnameTextError);
  }

  configureView() {
    const nameInput = this.nameDivWrapper.getElement()?.querySelector('input');
    const surnameInput = this.surnameDivWrapper.getElement()?.querySelector('input');
    this.elementCreator.getElement()?.addEventListener('change', () => {
      if (nameInput?.value && surnameInput?.value) {
        this.buttonSumbit.getElement()?.classList.remove('button-submit_active');
      } else if (!nameInput?.value || !surnameInput?.value) {
        this.buttonSumbit.getElement()?.classList.add('button-submit_active');
      }
    });
    this.handlerForm(nameInput, surnameInput);
  }

  handlerForm(nameInput: HTMLInputElement | null | undefined, surnameInput: HTMLInputElement | null | undefined) {
    const copyName = nameInput;
    const copySurname = surnameInput;
    const nameRegex = /^[A-Z][a-zA-Z-]{2,}$/;
    const surnameRegex = /^[A-Z][a-zA-Z-]{3,}$/;
    this.elementCreator.getElement()?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!copyName?.value.match(nameRegex)) {
        this.nameTextError.textContent = '';
        this.nameTextError.textContent =
          'First letter need to Uppercase, only English alphabhet and the hyphen, min length 3';
      } else {
        this.nameTextError.textContent = '';
      }
      if (!copySurname?.value.match(surnameRegex)) {
        this.surnameTextError.textContent = '';
        this.surnameTextError.textContent =
          'First letter need to Uppercase, only English alphabhet and the hyphen, min length 4';
      } else {
        this.surnameTextError.textContent = '';
      }
      if (copyName?.value.match(nameRegex) && copySurname?.value.match(surnameRegex)) {
        const user = { name: copyName.value, surname: copySurname.value };
        localStorage.setItem('login', JSON.stringify(user));
        copyName.value = '';
        copySurname.value = '';
        this.onSubmit(user);
      }
    });
  }
  // render() {
  //   const element = this.elementCreator.getElement();
  //   element?.remove();
  //   document.body.append(new HeaderView().getHtmlElement() as Node, new StartView().getHtmlElement() as Node);
  // }

  onSubmit(user: User) {
    this.onLogIn(user);
  }
}
