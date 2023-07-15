import { getNews } from "../scripts/newsAPI";

var tab_title = '';
var articleHeading = "";

//generate summary button click event
document.getElementById('summarizeBtn').addEventListener('click', function (event) {
  console.log("generating summary");
  document.getElementById("summaryOut").textContent = "Generating Summary. Please wait...";
  document.getElementById('summarizeBtn').remove();
  //send query to newsAPI
  let q = articleHeading;
  getNews();
});

//read heading from page
const readH1 = () => {
  return document.querySelector("h1").textContent;
};

//executed when extension is opened
chrome.tabs.query({ active: true }, function (tabs) {
  var tab = tabs[0];
  tab_title = tab.title;
  chrome.scripting.executeScript(
    {
      target: { tabId: tab.id },
      function: readH1
    },
    (res) => {
      var out = res[0].result;
      articleHeading = out;
      if (out == null) {
        articleHeading = null;
        document.getElementById("articleHeadingOut").textContent = "No other relevant news articles found.";
        return;
      }
      document.getElementById("articleHeadingOut").textContent = '"' + out + '"';
    })
});