/**
 * Add keyboard shortcuts accessible from Tweets by the Twitter account.
 * "w": Last Week
 * "s": Last Month
 * "a": Random ("r" triggers reply)
 * "q": Back ("b" triggers block)
 * @return {null}
 */
 document.addEventListener("keydown", function (event) {
  let tweetPrefix = `https://twitter.com/${USERNAME}/status/`;
  if (window.location.href.startsWith(tweetPrefix)) {
    switch(event.key) {
      case "w":
        navigateToTweet(TweetLinkType.LAST_WEEK);
        break;
      case "s":
        navigateToTweet(TweetLinkType.LAST_MONTH);
        break;
      case "a":
        navigateToTweet(TweetLinkType.RANDOM);
        break;
      case "q":
        history.back();
        break;
    }
  }
});


/**
 * The username of the Twitter account.
 * @const {string}
 */
 const USERNAME = "mandarin_daily";

 /**
  * Types of links in the body of a Tweet.
  * @enum {string}
  */
 const TweetLinkType = {
   LAST_WEEK: "Last Week",
   LAST_MONTH: "Last Month",
   RANDOM: "Random",
 };


/**
 * Navigate to the Tweet having the given type, which should be
 * from TweetLinkType, if possible.
 * @return {null}
 */
function navigateToTweet(tweetLinkType) {
  const hrefPrefix = `/${USERNAME}/statuses/`;
  const selector = `a[href^="${hrefPrefix}"]`
  let anchors = document.querySelectorAll(selector);
  for (let anchor of anchors) {
    let labelText = anchor.previousSibling.textContent;
    if (labelText.includes(tweetLinkType)) {
      anchor.click();
      return;
    }
  }
}
