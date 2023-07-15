var tab_title = '';

/* document.getElementById('summarizeBtn').addEventListener("click", function (event) {

});
 */
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
          if (out == null) out = "Nothing relevant found.";
          document.getElementById("output").textContent = '"' + out + '"';
      })
});