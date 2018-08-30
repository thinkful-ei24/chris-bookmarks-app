'use strict';


const api = (function(){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/chris';

  const store = {
    items: [{
      id: "cjlgs3rci000n0ky8ou4g1xg4",
      title: "I like cats",
      expanded: false
    }]
      
    
  };

  const getItems = function(callback) {
    $.getJSON(BASE_URL + '/items', callback);
  };

  const createItem = function(name, success, error) {
    const newItem = JSON.stringify({name});
    $.ajax({
      url: BASE_URL + '/items',
      method: 'POST',
      contentType: 'application/json',
      data: newItem,
      success: success,
      error: error
    });
  };

  const updateItem = function(id, updateData, callback) {
    $.ajax({
      url: BASE_URL + '/items/' + id,
      method: 'PATCH',
      contentType: 'application/json',
      data: updateData,
      success: callback
    });
  };

  const deleteItem = function(id, callback) {
    $.ajax({
      url: BASE_URL + '/items/' + id,
      method: 'DELETE',
      success: callback
    });
  };


  return {
    getItems,
    createItem,
    updateItem,
    deleteItem,
    store

  };

}());

api.deleteItem(api.store.items[0].id, callback => {
  console.log('delete ran');
});
console.log(api.store);

