'use strict';

const store = (function(){
  const setError = function(error) {
    this.error = error;
  };
  
  const toggleExpand = function(id){
    const item = this.findById(id);
    item.expanded = !item.expanded;
  };

  const addItem = function(item) {
    item.expanded = false;
    console.log(item);
    this.items.push(item);
  };

  const initializeStore = function(items) {
    this.items = items;
  };

  const findById = function(id) {
    return this.items.find(item => item.id === id);
  };

  const findAndDelete = function(id) {
    this.items = this.items.filter(item => item.id !== id);
  };

  const findAndUpdate = function(id, newData) {
    const item = this.findById(id);
    Object.assign(item, newData);
  };

  const filterByMinimumRating = function(minRating){
    this.minRating = minRating;
  };


  
  
  return {
    items: [],
    minRating: 1,
    error: null,
    addItem,
    findById,
    findAndUpdate,
    findAndDelete,
    filterByMinimumRating,
    initializeStore,
    setError,
    toggleExpand,
    
  };

}());
