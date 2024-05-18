/**
 * Allow the user to configure the number of Tweets to review.
 * Source: https://developer.chrome.com/docs/extensions/mv3/options/
 */


/**
 * Pre-populate the form with the value in Chrome storage. Default to
 * the maximum possible integer.
 * @return {null}
 */
function restoreOptions() {
  let defaults = {
    limit: Number.MAX_SAFE_INTEGER,
  };
  chrome.storage.local.get(defaults, function(items) {
    document.getElementById("limit").value = parseInt(items.limit);
  });
}


/**
 * Save the value from the form in Chrome storage.
 * @return {null}
 */
function saveOptions() {
  var status = document.getElementById("status");

  let limit = parseInt(document.getElementById("limit").value);
  if (isNaN(limit) || limit < 1 || limit > Number.MAX_SAFE_INTEGER) {
    status.textContent = "Invalid limit.";
    return;
  }

  let data = {limit: limit};
  chrome.storage.local.set(data, function() {
    status.textContent = "Limit set.";
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}


document.addEventListener("DOMContentLoaded", restoreOptions);
document.getElementById("save").addEventListener("click", saveOptions);
