var tab_title = '';
var articleHeading = "";

const functionToExecute = () => {
  return document.querySelector("h1").textContent;
};

chrome.tabs.query({ active: true }, function (tabs) {
  var tab = tabs[0];
  tab_title = tab.title;

  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      //files: ["/scripts/content.js"],
      function: functionToExecute
    },
    (res) => {
      var out = res[0].result;
      articleHeading = out;
      if (out == null) {
        articleHeading = null;
        document.getElementById("output").textContent = "No other relevant news articles found.";
        return;
      }
      document.getElementById("output").textContent = '"' + out + '"';
    })
});