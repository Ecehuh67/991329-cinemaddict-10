import RankComponent from './components/user-rank';
import FilterComponent from './components/filters';
import SortComponent, {SortType} from './components/sort';
import ContainerComponent from './components/film-container';
import PageController, {renderCards, showingCardCount} from './controllers/page';
import {generateCards} from './mocks/card';
import {generateFilters} from './mocks/filter';
import {getRandomNumber} from './utils/common';
import {render, RenderPosition, replaceSort} from './utils/render';

const FILM_COUNT = 15;

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

// Randomly generate a number for getting Rate of user
const randomRate = getRandomNumber(90);
render(headerElement, new RankComponent(randomRate), RenderPosition.BEFOREEND);

const cards = generateCards(FILM_COUNT);
const filters = generateFilters(cards);

render(mainElement, new FilterComponent(filters), RenderPosition.BEFOREEND);

const containerComponent = new ContainerComponent();
render(mainElement, containerComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(containerComponent);

pageController.render(cards);

replaceSort(mainElement);

const totalFilms = document.querySelector(`.footer__statistics p`);
totalFilms.textContent = `${cards.length} movies inside`;
