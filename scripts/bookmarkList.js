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
    $('#bookmark-list').html('');
    store.visibleItems.forEach(item => {
      const element = generateBookmarkListString(item);
      //attach element to ul in DOM
      $('#bookmark-list').append(element);
    });
  }



  function generateBookmarkListString(item) {
    //build book item list element
    return `
      <li class="js-item-element" data-item-id="${item.id}">
        ${item.title}
        <button class="bookmark-list-expand">Expand Button</button>

        <div>
          <p>${item.desc}</p>
          <button class="bookmark-list-delete" data-item-id="${item.id}">Delete Bookmark</button>
          <a href="${item.url}">Go to ${item.title}
          </a>
        </div>
      </li>
  `;
  }
 

  
  // function render() {
  //   if(store.error) {
  //     const e1 = generateError(store.error);
  //     $('.error-container').html(e1);
  //   } else {
  //     $('.error-container').empty();
  //   }

  //sort by stars
  function handleDelete(){
    $('#bookmark-list').on('click', '.bookmark-list-delete', (event) => {
      const id = event.target.getAttribute('data-item-id');
      API.deleteItem(id, function(){
        store.findAndDelete(id);
        render();
      });
    });
  }

  function handleFilterByRating(){
    $('#filter-by-rating').on('change', (event) => {
      const minimumRating = event.target.value;
      store.filterByMinimumRating(minimumRating);
      render();
    });
  }

  function handleStarSelected(){
    $('.star').click((event) => {
      const rating = event.target.getAttribute('data-item-id');
      $('#rating').attr('value', rating);
    });
  }
    
  function handleNewItemSubmit() {
    $('#js-bookmark-list-form').submit(function (event) {
      event.preventDefault();
      const rating = $('#rating').val();
      const newTitle = $('.js-bookmark-list-title').val();
      const newUrl = $('.js-bookmark-list-url').val();
      const newDescription = $('.js-bookmark-list-description').val();
      
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
    handleStarSelected();
    handleDelete();
    handleFilterByRating();
  }

  return {
    bindEventListeners: bindEventListeners
  };
}());