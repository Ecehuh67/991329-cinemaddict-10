import AbstractComponent from '../abstract-components/component';
import {createFilmsPosterTemplate} from './template';


export default class Poster extends AbstractComponent {
  getTemplate() {
    return createFilmsPosterTemplate();
  }
}
