import RankComponent from './components/user-rank.js';
import FilterComponent from './components/filters.js';
import SortComponent from './components/sort.js';
import ContainerComponent from './components/film-container.js';
import PosterComponent from './components/poster.js';
import CardComponent from './components/card.js';
import ButtonComponent from './components/show-more-button.js';
import TopListComponent from './components/top-list.js';
import PopupComponent from './components/detail.js';
import NoCardComponent from './components/no-card.js';
import {generateCards} from './mocks/card.js';
import {generateFilters, generateNoCardFilters} from './mocks/filter.js';
import {rubricsForTop} from './mocks/consts.js';
import {getRandomNumber, getConditionFilms, render, RenderPosition} from './mocks/utils.js';

const FILM_COUNT = 15;
const SHOWING_CARD = 5;
const CARD_COUNT_BY_BUTTON = 5;
const FILM_POPULAR = 2;
const TOP_LIST_AMOUNT = 2;
let showingCardCount = SHOWING_CARD;

const headerElement = document.querySelector(`.header`);
const bodyElement = document.querySelector(`body`);
const mainElement = document.querySelector(`.main`);

const renderCard = (cardListElement, card) => {
  const cardComponent = new CardComponent(card);
  const cardPosterElement = cardComponent.getElement().querySelector(`.film-card__poster`);
  const cardTitleElement = cardComponent.getElement().querySelector(`.film-card__title`);
  const cardCommentElement = cardComponent.getElement().querySelector(`.film-card__comments`);
  const cardElements = [cardPosterElement, cardTitleElement, cardCommentElement];

  render(cardListElement, cardComponent.getElement(), RenderPosition.BEFOREEND);

  const createPopupElement = (card) => {
    const popupComponent = new PopupComponent(card);
    const popupButtonClose = popupComponent.getElement().querySelector(`.film-details__close-btn`);

    const onEscKeyDown = (evt) => {
      const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

      if (isEscKey) {
        popupComponent.getElement().remove();
        popupComponent.removeElement();
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    document.addEventListener(`keydown`, onEscKeyDown);

    popupButtonClose.addEventListener(`click`, () => {
      popupComponent.getElement().remove();
      popupComponent.removeElement();
    })

    return popupComponent;
  };

  cardElements.forEach((el) => {
    el.addEventListener(`click`, () => {
      const isPopup = document.querySelector(`.film-details`);
      if (isPopup) {
        isPopup.remove();
        render(bodyElement, createPopupElement(card).getElement(), RenderPosition.BEFOREEND);
      } else {
        render(bodyElement, createPopupElement(card).getElement(), RenderPosition.BEFOREEND);
      }
    });
  });
};


// Randomly generate a number for getting Rate of user
const randomRate = getRandomNumber(90);
render(headerElement, new RankComponent(randomRate).getElement(), RenderPosition.BEFOREEND);

const cards = generateCards(FILM_COUNT);

const isCards = cards.length;

if (!isCards) {
  const filter = generateNoCardFilters();
  render(mainElement, new FilterComponent(filter).getElement(), RenderPosition.BEFOREEND);
  render(mainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);
  render(mainElement, new NoCardComponent().getElement(), RenderPosition.BEFOREEND);
} else {
const filters = generateFilters(cards);

render(mainElement, new FilterComponent(filters).getElement(), RenderPosition.BEFOREEND);
render(mainElement, new SortComponent().getElement(), RenderPosition.BEFOREEND);


const filmsContainerElement = new ContainerComponent();
render(mainElement, filmsContainerElement.getElement(), RenderPosition.BEFOREEND);

const filmsPosterElement = new PosterComponent();
render(filmsContainerElement.getElement(), filmsPosterElement.getElement(), RenderPosition.BEFOREEND);

const filmsListElement = filmsPosterElement.getElement().querySelector(`.films-list__container`);

cards.slice(0, showingCardCount).forEach((card) => renderCard(filmsListElement, card));

render(filmsPosterElement.getElement(), new ButtonComponent().getElement(), RenderPosition.BEFOREEND);

new Array(TOP_LIST_AMOUNT)
  .fill(``)
  .forEach((it, i) => {
    render(filmsContainerElement.getElement(), new TopListComponent(rubricsForTop[i]).getElement(), RenderPosition.BEFOREEND);
  })

const ratedContainerElements = filmsContainerElement.getElement().querySelectorAll(`section.films-list--extra > .films-list__container`);

Array.from(ratedContainerElements).forEach((it) => {
  const card = new CardComponent();
  switch(it.previousElementSibling.firstChild.data) {
    case `Top rated`:
      getConditionFilms(cards, FILM_POPULAR, 'rate').forEach((card) => renderCard(it, card));
      break;
    case `Most commented`:
      getConditionFilms(cards, FILM_POPULAR, 'comments').forEach((card) => renderCard(it, card));
      break;
  };
});

const buttonLoadMore = filmsPosterElement.getElement().querySelector(`.films-list__show-more`);
buttonLoadMore.addEventListener(`click`, () => {
  const showedCards = showingCardCount;
  showingCardCount += CARD_COUNT_BY_BUTTON;

  cards.slice(showedCards, showingCardCount).forEach((card) => {
    return renderCard(filmsListElement, card);
  });

  if (showingCardCount >= cards.length) {
    buttonLoadMore.remove();
  }
});

const totalFilms = document.querySelector(`.footer__statistics p`);
totalFilms.textContent = `${cards.length} movies inside`;
}
