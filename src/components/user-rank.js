import {ranks} from '../mocks/const.js';

const getRank = (count) => {
  let rank = ranks[Object.keys(ranks).find((it) => count <= it)];
  return rank;
};

export const createUserRankTemplate = (amount) => {
  return `<section class="header__profile profile">
    <p class="profile__rating">${getRank(amount)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
};
