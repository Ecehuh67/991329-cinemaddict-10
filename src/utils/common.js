import moment from 'moment';

const RATED_POINTS = {
  RATING: `total_rating`,
  COMMENTS: `comments`
};

export const getRandomArrayItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

export const getRandomNumber = (max) => {
  return 1 + Math.floor(Math.random() * max);
};

export const getRandomArray = (array) => {
  const firstValue = Math.floor(array.length * Math.random());
  const maxOdds = array.length - firstValue;
  const maxValue = maxOdds > 1 ? firstValue + (Math.floor(Math.random() * 3) + 1)
    : array.length;

  return [firstValue, maxValue];
};

export const getRandomNumberPointNotation = (number) => number.toFixed(1);

export const getRandomArrayNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max - min));
};

const getHours = () => 1 + Math.floor(Math.random() * 3);
const getMinutes = () => Math.floor(Math.random() * 60);

export const getTime = () => {
  return `${getHours()}h ${getMinutes()}m`;
};

export const getConditionFilms = (cards, amount, category) => {
  const values = cards.map((card) => {
    return category === RATED_POINTS.RATING ? card.filmInfo[category] : card[category].length;
  }).sort((a, b) => a - b).slice(-amount).sort((a, b) => b - a);

  const newCards = cards.filter((card) => values.find((value) => {
    return category === RATED_POINTS.RATING ? value === card.filmInfo[category] : value === card[category].length;
  })).slice(-amount);

  return newCards;
};

export const getRank = (count) => {
  let rank;

  switch (true) {
    case count === 0:
      rank = ``;
      break;
    case count > 0 && count <= 10:
      rank = `novice`;
      break;
    case count > 10 && count <= 20:
      rank = `fan`;
      break;
    case count > 20:
      rank = `movie buff`;
      break;
  }

  return rank;
};

export const formateDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const formateDateForComments = (date) => {
  return moment(date).format(`YYYY/MM/DD/h:m`);
};

export const formateDateToYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const formatTime = (date) => {
  return moment(date).format(`h[h] m[m]`);
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

export const getRandomDate = () => {
  const targetDate = new Date();
  // 50% chance randomly generate minus or plus
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 10000);

  targetDate.setDate(targetDate.getDate() + diffValue);
  return targetDate;
};
