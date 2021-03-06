import {USER_RATING_COUNT} from '../../mocks/consts';

export const generateUserRatingMarkup = (rating) => {
  return new Array(USER_RATING_COUNT)
    .fill(``)
    .map((_, index) => `<input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="${index + 1}" id="rating-${index + 1}" ${rating === index + 1 ? `checked` : ``}>
    <label class="film-details__user-rating-label" for="rating-${index + 1}">${index + 1}</label>`)
    .join(`\n`);
};
