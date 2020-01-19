import RankComponent from './components/user-rank/index';
import {MenuItem} from './components/filters/index';
import ContainerComponent from './components/film-container/index';
import PageController, {renderCards, showingCardCount} from './controllers/page';
import FilterController from './controllers/filter';
import FilterComponent from './components/filters/index';
import MoviesModel from './models/movies';
import StatisticsComponent from './components/statistics/index';
import {generateCards} from './mocks/card';
import {generateFilters} from './mocks/filter';
import {getRandomNumber, getRank} from './utils/common';
import {render, RenderPosition, replaceSort} from './utils/render';

const FILM_COUNT = 15;

console.log([])

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);

// Randomly generate a number for getting Rate of user
const randomRate = getRandomNumber(25);
render(headerElement, new RankComponent(randomRate), RenderPosition.BEFOREEND);

const cards = generateCards(FILM_COUNT);
const moviesModel = new MoviesModel();
moviesModel.setCards(cards);

const filterController = new FilterController(mainElement, moviesModel);
filterController.render();

const containerComponent = new ContainerComponent();
render(mainElement, containerComponent, RenderPosition.BEFOREEND);

const pageController = new PageController(containerComponent, moviesModel);

pageController.render();
replaceSort(mainElement);

const statisticsComponent = new StatisticsComponent(moviesModel, getRank(randomRate));
render(mainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hide();

filterController.showScreen((menuItem) => {

  switch (menuItem) {
    case MenuItem.ALL:
    case MenuItem.WATCHLIST:
    case MenuItem.HISTOTY:
    case MenuItem.FAVORITES:
      statisticsComponent.hide();
      pageController.show();
      break;
    case MenuItem.STATS:
      statisticsComponent.show();
      pageController.hide();
      break;
  }
});

const totalFilms = document.querySelector(`.footer__statistics p`);
totalFilms.textContent = `${moviesModel.getAllCards().length} movies inside`;
