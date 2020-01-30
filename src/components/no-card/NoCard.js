import {createNoCardTemplate} from './template';
import AbstractComponent from '../abstract-components/component';

export default class NoCard extends AbstractComponent {
  getTemplate() {
    return createNoCardTemplate();
  }
}
