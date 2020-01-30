import AbstractComponent from '../abstract-components/component';
import {createContainerPageTemplate} from './template';


export default class Container extends AbstractComponent {
  getTemplate() {
    return createContainerPageTemplate();
  }
}
