import AbstractComponent from '../abstract-components/component';
import {createTopListTemplate} from './template';

export default class TopList extends AbstractComponent {
  constructor(caption) {
    super();
    this._caption = caption;
  }

  getTemplate() {
    return createTopListTemplate(this._caption);
  }
}
