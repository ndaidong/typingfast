/**
 * storage.js
 * @ndaidong
 */

import {
  hasProperty,
  isFunction,
  isString
} from '@ndaidong/bellajs'

Box.Application.addService('storage', () => {

  var _store = {};

  var already = 0;
  var onReadyCallbacks = [];

  var onready = () => {
    already = 1;
    let exec = (fn) => {
      fn();
    };
    onReadyCallbacks.map(exec);
  };

  var ready = (fn) => {
    if (isFunction(fn)) {
      if (already) {
        setTimeout(fn, 0);
      } else {
        onReadyCallbacks.push(fn);
      }
    }
  };

  var getCache = (data) => {
    let o;
    if (data) {
      o = isString(data) ? JSON.parse(data) : data;
    }
    _store = o || {};
    onready();
  };

  var updateStore = () => {
    localStorage.setItem('store', JSON.stringify(_store));
  };

  var set = (key, value) => {
    _store[key] = value;
    updateStore();
  };

  var get = (key) => {
    return _store[key];
  };

  var remove = (key) => {
    if (hasProperty(_store, key)) {
      _store[key] = null;
      delete _store[key];
      updateStore();
    }
  };

  realdom.ready(() => {
    return getCache(localStorage.getItem('store'));
  });

  return {
    ready,
    get,
    set,
    remove
  };
});
