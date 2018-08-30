'use strict';


const API = (function(){

  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/chris';



  const getItems = function(callback) {
    $.getJSON(BASE_URL + '/items', callback);
  };

  const createItem = function(title, success, error) {
    const newItem = JSON.stringify({title});
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
  };
}());



