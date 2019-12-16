import AbstractComponent from './abstract-component';

const createContainerPageTemplate = () => {
  return `<section class="films"></section>`;
};


export default class Container extends AbstractComponent {
  getTemplate() {
    return createContainerPageTemplate();
  }
}
