import AbstractSmartComponent from '../abstract-components/smart-component';
import {createStatisticTemplate, renderChart} from './template';

const FilterTypes = {
  ALL_TIME: `all-time`,
  MONTH: `month`,
  WEEK: `week`,
  TODAY: `today`,
  YEAR: `year`
};

const UnixTime = {
  DAY: 86400000,
  WEEK: 604800000,
  MONTH: 2629743000,
  YEAR: 31556926000
};

export default class Statistics extends AbstractSmartComponent {
  constructor(statistic) {
    super();
    this._model = statistic.model;
    this._rank = statistic.rank;
    this._date = Math.round(new Date().getTime());
    this._filteredCards = null;

    this._chart = null;
    this._filterType = FilterTypes.ALL_TIME;

    this._renderChart();
  }

  getTemplate() {
    return createStatisticTemplate(this._model.getAllCards(), this._rank);
  }

  recoverListeners() {}

  show() {
    super.show();

    this.rerender(this._model.getAllCards());
  }

  rerender() {

    super.rerender();

    this._renderChart();
  }

  _renderChart() {
    const element = this.getElement();
    const ctx = element.querySelector(`.statistic__chart`);
    const cards = this._model.getAllCards();
    let filteredCards = cards;

    element.querySelector(`.statistic__filters`).addEventListener(`change`, (evt) => {
      this._filterType = evt.target.value;

      switch (this._filterType) {
        case FilterTypes.ALL_TIME:
          filteredCards = cards;

          this._resetChart();

          this._chart = renderChart(ctx, filteredCards);
          break;
        case FilterTypes.TODAY:
          filteredCards = cards.slice().filter((card) => {
            if (card.userDetails.watching_date) {
              return (this._date - UnixTime.DAY) < Date.parse(card.userDetails.watching_date);
            }
            return false;
          });

          this._resetChart();

          this._chart = renderChart(ctx, filteredCards);
          break;
        case FilterTypes.WEEK:
          filteredCards = cards.slice().filter((card) => {
            if (card.userDetails.watching_date) {
              return (this._date - UnixTime.WEEK) < Date.parse(card.userDetails.watching_date);
            }
            return false;
          });

          this._resetChart();

          this._chart = renderChart(ctx, filteredCards);
          break;
        case FilterTypes.MONTH:
          filteredCards = cards.slice().filter((card) => {
            if (card.userDetails.watching_date) {
              return (this._date - UnixTime.MONTH) < Date.parse(card.userDetails.watching_date);
            }
            return false;
          });

          this._resetChart();

          this._chart = renderChart(ctx, filteredCards);
          break;
        case FilterTypes.YEAR:
          filteredCards = cards.slice().filter((card) => {
            if (card.userDetails.watching_date) {
              return (this._date - UnixTime.YEAR) < Date.parse(card.userDetails.watching_date);
            }
            return false;
          });

          this._resetChart();

          this._chart = renderChart(ctx, filteredCards);
          break;
      }

    });

    this._resetChart();

    this._chart = renderChart(ctx, filteredCards);
  }

  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }
}
