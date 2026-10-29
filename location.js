/* Location remains in this closure only: no storage, requests, URLs, or logging. */
(() => {
  const detect = document.getElementById('use-location');
  const form = document.getElementById('location-form');
  const input = document.getElementById('manual-location');
  const error = document.getElementById('location-error');
  const status = document.getElementById('location-status');
  const clear = document.getElementById('clear-location');
  let selection = null;
  let request = 0;

  function resetError() {
    error.textContent = '';
    input.removeAttribute('aria-invalid');
  }
  function cancelPending() {
    request += 1;
    detect.disabled = false;
    detect.textContent = 'Use my location';
  }
  function discard() {
    cancelPending();
    selection = null;
  }
  detect.addEventListener('click', () => {
    discard();
    resetError();
    input.value = '';
    if (!navigator.geolocation) {
      status.textContent = 'This browser cannot get your location. Enter a city or ZIP code instead, or continue without a location.';
      return;
    }
    const current = request;
    detect.disabled = true;
    detect.textContent = 'Getting location…';
    status.textContent = 'Your browser may ask for permission. You can decline and enter a city or ZIP code instead.';
    navigator.geolocation.getCurrentPosition(position => {
      if (current !== request) return;
      const { latitude, longitude } = position.coords;
      cancelPending();
      if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
        status.textContent = 'We could not get your location. Enter a city or ZIP code instead, or continue without a location.';
        return;
      }
      selection = { latitude, longitude };
      status.textContent = 'Device location received for this page only. It has not been sent or saved. Nearby resource results are not available yet.';
    }, failure => {
      if (current !== request) return;
      cancelPending();
      const messages = {
        1: 'Location access was not allowed.',
        2: 'Your location is unavailable right now.',
        3: 'Getting your location took too long.'
      };
      status.textContent = (messages[failure.code] || 'We could not get your location.') + ' Enter a city or ZIP code instead, or continue without a location.';
    }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 0 });
  });
  form.addEventListener('submit', event => {
    event.preventDefault();
    discard();
    resetError();
    const value = input.value.trim().replace(/\s+/g, ' ');
    const validZip = /^\d{5}(?:-\d{4})?$/.test(value);
    const validCity = value.length >= 2 && value.length <= 100 && /\p{L}/u.test(value) && /^[\p{L}\p{M}\s.,'’()-]+$/u.test(value);
    if (!validZip && !validCity) {
      error.textContent = 'Enter a city name or a 5-digit ZIP code (for example, 12345 or 12345-6789).';
      input.setAttribute('aria-invalid', 'true');
      status.textContent = 'No location chosen.';
      input.focus();
      return;
    }
    input.value = value;
    selection = { place: value };
    status.textContent = 'Location entered: ' + value + '. This has not been verified or mapped. It stays on this page only; resource connections are still being built.';
  });
  input.addEventListener('input', () => {
    discard();
    resetError();
    status.textContent = 'Location entry changed. Choose “Use this location” to use it, or continue without a location.';
  });
  clear.addEventListener('click', () => {
    discard();
    input.value = '';
    resetError();
    status.textContent = 'Location cleared. You can continue without a location.';
  });
  // Also discard on back/forward-cache navigation, where a page may be restored.
  window.addEventListener('pagehide', () => {
    discard();
    input.value = '';
    resetError();
    status.textContent = 'No location chosen.';
  });
})();
