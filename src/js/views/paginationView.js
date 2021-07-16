import View from './View.js';

import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', e => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1 and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupBtn('next', curPage);
    }
    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupBtn('prev', curPage);
    }
    // Some other page
    if (curPage < numPages) {
      return `${this._generateMarkupBtn(
        'prev',
        curPage
      )}${this._generateMarkupBtn('next', curPage)}`;
    }
    // Page 1 and there are no other pages
    return '';
  }

  _generateMarkupBtn(type, curPage) {
    return `
      <button data-goto="${
        type === 'next' ? curPage + 1 : curPage - 1
      }" class="btn--inline pagination__btn--${type}">
        ${type === 'next' ? `<span>Page ${curPage + 1}</span>` : ''}
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-${
      type === 'next' ? 'right' : 'left'
    }"></use>
        </svg>
        ${type === 'prev' ? `<span>Page ${curPage - 1}</span>` : ''}
      </button>
    `;
  }
}

export default new PaginationView();
