/* global store, api */
'use strict';

const bookmarkList = (function(){

  function generateError(err) {
    let message = '';
    if(err.responseJSON && err.resonseJSON.message) {
      message = err.responseJSON.message;
    } else {
      message = `${err.code} Server Error`;
    }
    return `
      <section class="error-content">
        <button id="cancel-error">X</button>
        <p>${message}</p>
      </section>
    `;
  }
  function render(){
    store.items.forEach(item => {
      const str = `
      <li class="js-item-element" data-item-id="${item.id}">
        ${item.title}
        <button class="bookmark-list-expand">Expand Button</button>

        <div>
          <p>${item.desc}</p>
          <button class="bookmark-list-delete" data-item-id="${item.id}">Delete Bookmark</button>
          <a href="${item.url}">Go to ${item.title}</a
        </div>
      </li>
      `;
    });
  }
  // base for generateBookmarkListString finished
  // function generateBookmarkListString(bookmarkList) {
  //   const items = bookmarkList.map((item) => generateBaseHtml(item));
  //   return items.join('');
  // } 

  // base of render started
  // function render() {
  //   if(store.error) {
  //     const e1 = generateError(store.error);
  //     $('.error-container').html(e1);
  //   } else {
  //     $('.error-container').empty();
  //   }

  //sort by stars
 
  $('.star').click((element) => {
    const rating = element.target.getAttribute('data-item-id');
    $('#rating').attr('value', rating);
  });
  
    
  function handleNewItemSubmit() {
    $('#js-bookmark-list-form').submit(function (event) {
      event.preventDefault();
      const rating = $('#rating').val();
      const newTitle = $('.js-bookmark-list-title').val();
      const newUrl = $('.js-bookmark-list-url').val();
      const newDescription = $('.js-bookmark-list-description').val();
      
      console.log(rating);

      
      API.createItem(newTitle, newUrl, rating, newDescription,
        (newItem) => {
          store.addItem(newItem);
          render();
        }
      );
    });
  }

  function bindEventListeners() {
    handleNewItemSubmit();
  }

  return {
    bindEventListeners: bindEventListeners
  };
}());