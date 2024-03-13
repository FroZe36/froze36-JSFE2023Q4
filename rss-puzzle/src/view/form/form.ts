import { View } from '../view';
import { InputCreator } from '../../utils/input-element/createInput';
import { BaseElement } from '../../utils/createElement';
import './form.css';

export class Form extends View {
  constructor() {
    super({
      tagName: 'form',
      classNames: ['form-login'],
    });
    this.configureView();
  }

  configureView() {
    const nameDivWrapper = new InputCreator({
      tagName: 'div',
      classNames: ['login'],
      text: 'First Name',
    });
    const surnameDivWrapper = new InputCreator({
      tagName: 'div',
      classNames: ['login'],
      text: 'Surname',
    });
    const nameInput = nameDivWrapper.getElement()?.querySelector('input');
    const surnameInput = surnameDivWrapper.getElement()?.querySelector('input');
    const buttonSumbit = new BaseElement({
      tagName: 'button',
      classNames: ['button-submit', 'button-submit_active'],
      text: 'Login In',
    });
    this.elementCreator.addInnerElement(nameDivWrapper.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(surnameDivWrapper.getElement() as HTMLElement);
    this.elementCreator.addInnerElement(buttonSumbit.getElement() as HTMLElement);
    this.elementCreator.getElement()?.addEventListener('change', () => {
      if (nameInput?.value && surnameInput?.value) {
        buttonSumbit.getElement()?.classList.remove('button-submit_active');
      } else if (!nameInput?.value || !surnameInput?.value) {
        buttonSumbit.getElement()?.classList.add('button-submit_active');
      }
    });
    this.elementCreator.getElement()?.addEventListener('submit', (event) => {
      event.preventDefault();
      if (nameInput?.value && surnameInput?.value) {
        localStorage.setItem('login', JSON.stringify({ name: nameInput.value, surname: surnameInput.value }));
        nameInput.value = '';
        surnameInput.value = '';
      }
    });
  }
}
