import AbstractComponent from './abstract-component';

const createTopListTemplate = (caption) => {
  return `<section class="films-list--extra">
    <h2 class="films-list__title">${caption}</h2>
    <div class="films-list__container"></div>
  </section>`;
};

export default class TopList extends AbstractComponent {
  constructor(caption) {
    super();
    this._caption = caption;
  }

  getTemplate() {
    return createTopListTemplate(this._caption);
  }
}
