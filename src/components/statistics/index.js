import AbstractComponent from '../abstract-components/component';
import {createStatisticTemplate} from './template';

export default class Statistics extends AbstractComponent {
  getTemplate() {
    return createStatisticTemplate();
  }
}
