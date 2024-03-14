import { View } from '../view';
import { InputCreator } from '../../utils/input-element/createInput';
import { BaseElement } from '../../utils/createElement';
import './form.css';

export class Form extends View {
  nameDivWrapper;

  surnameDivWrapper;

  buttonSumbit;

  constructor() {
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
    this.configureView();
    this.init();
  }

  init() {
    this.elementCreator.addInnerElement(this.nameDivWrapper.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(this.surnameDivWrapper.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(this.buttonSumbit.getElement() as HTMLElement);
  }

  configureView() {
    const nameInput = this.nameDivWrapper.getElement()?.querySelector('input');
    const surnameInput = this.surnameDivWrapper.getElement()?.querySelector('input');
    const nameRegex = /^[A-Z][a-zA-Z-]{2,}$/;
    const surnameRegex = /^[A-Z][a-zA-Z-]{3,}$/;
    const nameTextError = document.createElement('p');
    const surnameTextError = document.createElement('p');
    this.nameDivWrapper.getElement()?.append(nameTextError);
    this.surnameDivWrapper.getElement()?.append(surnameTextError);
    this.elementCreator.getElement()?.addEventListener('change', () => {
      if (nameInput?.value && surnameInput?.value) {
        this.buttonSumbit.getElement()?.classList.remove('button-submit_active');
      } else if (!nameInput?.value || !surnameInput?.value) {
        this.buttonSumbit.getElement()?.classList.add('button-submit_active');
      }
    });
    this.elementCreator.getElement()?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!nameInput?.value.match(nameRegex)) {
        nameTextError.textContent = '';
        nameTextError.textContent =
          'First letter need to Uppercase, only English alphabhet and the hyphen, min length 3';
      } else {
        nameTextError.textContent = '';
      }
      if (!surnameInput?.value.match(surnameRegex)) {
        surnameTextError.textContent = '';
        surnameTextError.textContent =
          'First letter need to Uppercase, only English alphabhet and the hyphen, min length 4';
      } else {
        surnameTextError.textContent = '';
      }
      if (nameInput?.value.match(nameRegex) && surnameInput?.value.match(surnameRegex)) {
        localStorage.setItem('login', JSON.stringify({ name: nameInput.value, surname: surnameInput.value }));
        nameInput.value = '';
        surnameInput.value = '';
      }
    });
  }
}
