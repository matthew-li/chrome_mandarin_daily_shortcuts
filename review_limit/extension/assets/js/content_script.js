/**
 * Maintain a set of unique Tweet IDs by the Twitter account. The first
 * time its size exceeds the user-configured limit, raise an alert.
 * 
 * The set covers various ways in which the user could navigate to other
 * Tweets, including clicking on back and forward buttons, clicking on
 * Tweet-embedded URLs, and going back to an arbitrary point in history.
 * 
 * The set is reset if the user changes the URL in the address bar or
 * navigates to a non-Tweet URL.
 */
defaults = {limit: Number.MAX_SAFE_INTEGER};
chrome.storage.local.get(defaults, function(items) {
  var limit = parseInt(items.limit);

  var seenIds = new Set();
  var lastUrl = location.href;
  if (lastUrl.startsWith(TWEET_PREFIX)) {
    seenIds.add(getTweetId(lastUrl));
  }

  const observer = new MutationObserver(function() {
    let url = location.href;
    if (url !== lastUrl) {
      lastUrl = url;
      if (url.startsWith(TWEET_PREFIX)) {
        const id = getTweetId(url);
        if (!seenIds.has(id)) {
          seenIds.add(id);
          if (seenIds.size === limit + 1) {
            alert(`Review limit (${limit}) reached.`);
          }
        }
      } else {
        seenIds = new Set();
      }
    }
  });
  observer.observe(document, {subtree: true, childList: true});
});


/**
 * The username of the Twitter account.
 * @const {string}
 */
 const USERNAME = "mandarin_daily";


/**
 * The prefix that Tweets by the Twitter account begin with.
 * @const {string};
 */
const TWEET_PREFIX = `https://twitter.com/${USERNAME}/status/`;


/**
 * Return the Tweet ID from a pre-validated URL pointing to a Tweet by
 * the Twitter account.
 * @return {string}
 */
function getTweetId(url) {
  return url.split(TWEET_PREFIX)[1].split("?")[0].replace("/", "");
}
