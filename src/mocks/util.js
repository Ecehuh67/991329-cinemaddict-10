import {ranks} from '../mocks/const.js';

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

// What way Can I sent key of object like paramets of function to not use the same functions below??
export const getConditionFilms = (cards, amount, category) => {
  const values = cards.map((card) => card[category]).sort((a, b) => a - b).slice(-amount);
  const newCards = cards.filter((card) => values.find((it) => it === card[category])).slice(-amount);
  return newCards;
};

export const getRank = (count) => {
  let rank = ranks[Object.keys(ranks).find((it) => count <= it)];
  return rank;
};
