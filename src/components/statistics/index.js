import AbstractSmartComponent from '../abstract-components/smart-component';
import {createStatisticTemplate, renderChart} from './template';

export default class Statistics extends AbstractSmartComponent {
  constructor(model, rank) {
    super();

    this._model = model;
    this._rank = rank;

    this._chart = null;

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

    this._resetChart();

    this._chart = renderChart(ctx, this._model.getAllCards());
  }

  _resetChart() {
    if (this._chart) {
      this._chart.destroy();
      this._chart = null;
    }
  }
}
