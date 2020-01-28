import {formateDate} from '../../utils/common';

export const createCommentsMarkup = (comments, buttonName, idElement) => {

  let buttonValue = `Delete`;

  return (comments
    .map(({author, emotion, comment, date, id}) => {

      if (idElement === id) {
        buttonValue = `${buttonName}`;
      }

      return (
        `<li class="film-details__comment">
          <span class="film-details__comment-emoji">
            <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji">
          </span>
          <div>
            <p class="film-details__comment-text" data-id="${id}">${comment}</p>
            <p class="film-details__comment-info">
              <span class="film-details__comment-author">${author}</span>
              <span class="film-details__comment-day">${formateDate(date)}</span>
              <button class="film-details__comment-delete">${buttonValue}</button>
            </p>
          </div>
        </li>`
      );
    }));
};
