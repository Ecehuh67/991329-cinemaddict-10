import {getRank} from '../../utils/common';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

export const renderChart = (ctx, cards) => {
  const watchedFilms = cards.slice().filter((card) => card.userDetails.already_watched);
  const genreList = getGenresListFromCards(watchedFilms);
  let genresCategories = uniqueGenres(genreList);
  const counterGenres = countSimmilarGenres(genresCategories, genreList);
  let values = genresCategories.map((genre) => counterGenres[genre]);
  if (watchedFilms.length === 0) {
    genresCategories = [];
    values = [];
  }

  const columnColor = new Array(genresCategories.length).fill(`rgba(255,207,64,1)`)

  Chart.defaults.global.defaultFontFamily = "Open Sans";
  Chart.defaults.global.defaultFontSize = 16;
  Chart.defaults.global.defaultFontColor = 'white';

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: genresCategories,
      datasets: [{
        data: values,
        backgroundColor: columnColor,
        barThickness: 26,
        datalabels: {
          font: {
            size: 16
          },
          anchor: `start`,
          align: `end`,
          offset: -38
        },
      }]
    },
    options: {
      layout: {
        padding: {
          bottom: 0, //control
        }
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      },
      scales: {
            xAxes: [{
                stacked: true,
                display: false,
            }],
            yAxes: [{
                stacked: true,
                ticks: {
                  padding: 40
                }
            }]
        }
    }
  });
}

const getGenresListFromCards = (cards) => cards.slice().map((card) => card.filmInfo.genre).join().split(`,`);

const uniqueGenres = (listOfGenres) => listOfGenres.slice().filter((genre, i) => listOfGenres.indexOf(genre) === i);

const countSimmilarGenres = (list, uniqueValues) => {
  let counterGenres = {};
  list.forEach((item) => counterGenres[item] = 0);
  uniqueValues.forEach((genre) => counterGenres[genre] += 1);

  return counterGenres;
}

const getTopGenre = (cards) => {
  const genreList = getGenresListFromCards(cards);
  const genresCategories = uniqueGenres(genreList);

  const counterGenres = countSimmilarGenres(genresCategories, genreList);

  let topGenre = ``;

  Object.keys(counterGenres).forEach((item) => {
    if (topGenre === ``) {
      topGenre = item;
    } else if (counterGenres[item] > counterGenres[topGenre]) {
        topGenre = item;
    }
  });

  return topGenre;
};

export const convertTime = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = Math.round((duration / 60 - hours) * 60);

  return (
    {
      hours: hours,
      minutes: minutes
    }
  );
};

export const createStatisticTemplate = (cards, rank) => {
  const listOfFilms = cards;
  const totalWatched = listOfFilms.slice().filter((card) => card.userDetails.already_watched);
  let hours = `0`;
  let minutes = `0`;
  let totalDuration = `0`;

  if (totalWatched.length > 0) {

      totalDuration = totalWatched.map((it) => it.filmInfo.runtime).reduce((acc, num) => acc + num);
    // totalDuration = totalWatched
    //   .map((card) => card.duration
    //     .split(' ')
    //     .map((it) => parseInt(it, 10))
    //       .map((number, i) => {
    //         let duration = 0;
    //         if (i === 0) {
    //           duration += number * 60;
    //         } else if (i === 1) {
    //           duration += number;
    //         }
    //
    //         return duration;
    //       })
    //       .reduce((acc, num) => acc + num))
    //   .reduce((acc, film) => acc + film);

      hours = convertTime(totalDuration).hours;
      minutes = convertTime(totalDuration).minutes;
  }

  const topGenre = getTopGenre(listOfFilms);

  return (
    `<section class="statistic">
      <p class="statistic__rank">
        Your rank
        <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        <span class="statistic__rank-label">${rank}</span>
      </p>

      <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
        <p class="statistic__filters-description">Show stats:</p>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
        <label for="statistic-all-time" class="statistic__filters-label">All time</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
        <label for="statistic-today" class="statistic__filters-label">Today</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
        <label for="statistic-week" class="statistic__filters-label">Week</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
        <label for="statistic-month" class="statistic__filters-label">Month</label>

        <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
        <label for="statistic-year" class="statistic__filters-label">Year</label>
      </form>

      <ul class="statistic__text-list">
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">You watched</h4>
          <p class="statistic__item-text">${totalWatched.length} <span class="statistic__item-description">movies</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Total duration</h4>
          <p class="statistic__item-text">${hours}<span class="statistic__item-description">h</span> ${minutes} <span class="statistic__item-description">m</span></p>
        </li>
        <li class="statistic__text-item">
          <h4 class="statistic__item-title">Top genre</h4>
          <p class="statistic__item-text">${totalWatched.length > 0 ? topGenre : `-`}</p>
        </li>
      </ul>

      <div class="statistic__chart-wrap">
        <canvas class="statistic__chart" width="1000"></canvas>
      </div>

    </section>`
  );
}
