/* Apply the saved palette before the page paints; light is the default. */
(function () {
  'use strict';
  var key = 'livelearndo-theme';
  var root = document.documentElement;
  var theme = 'light';
  try {
    if (localStorage.getItem(key) === 'dark') theme = 'dark';
  } catch (_) { /* The switch still works when browser storage is blocked. */ }
  root.dataset.theme = theme;

  function updateButton() {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;
    var dark = root.dataset.theme === 'dark';
    var label = dark ? 'Switch to light theme' : 'Switch to dark theme';
    button.setAttribute('aria-label', label);
    button.title = label;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var button = document.querySelector('.theme-toggle');
    if (!button) return;
    button.hidden = false;
    updateButton();
    button.addEventListener('click', function () {
      root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
      try { localStorage.setItem(key, root.dataset.theme); } catch (_) {}
      updateButton();
    });
  });
  window.addEventListener('storage', function (event) {
    if (event.key === key || event.key === null) {
      root.dataset.theme = event.newValue === 'dark' ? 'dark' : 'light';
      updateButton();
    }
  });
}());
