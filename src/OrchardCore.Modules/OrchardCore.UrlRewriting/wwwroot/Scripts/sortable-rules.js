/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

sortingListManager = function () {
  var saveOrders = function saveOrders(evt, url, errorMessage) {
    var data = {
      oldIndex: evt.oldIndex,
      newIndex: evt.newIndex
    };
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })["catch"](function (error) {
      console.log(error);
      alert(errorMessage || 'Unable to sort the list');
    });
  };
  var create = function create(selector, sortUrl, errorMessage) {
    var sortable = document.querySelector(selector);
    if (!sortable) {
      console.log('Unable to find the sortable element. The given selector is: ' + selector);
      return;
    }
    if (sortUrl) {
      orderUrl = sortUrl;
    } else {
      orderUrl = sortable.getAttribute('data-sort-uri');
    }
    if (!orderUrl) {
      console.log('Unable to determine the sort post URI. Either pass it to the create function or set it as data-sort-uri to the sorting element.');
      return;
    }
    var sortable = Sortable.create(sortable, {
      handle: ".ui-sortable-handle",
      animation: 150,
      filter: ".ignore-elements",
      draggable: ".item",
      onUpdate: function onUpdate(evt) {
        saveOrders(evt, orderUrl, errorMessage);
      }
    });
  };
  return {
    create: create
  };
}();