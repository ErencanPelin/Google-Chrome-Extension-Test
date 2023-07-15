import { getNews } from "./../scripts/newsAPI.js";

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

//find articles in those keywords
var getArticles = async (keywords) => {
  var q = keywords.replace(' ', '-');
  q = "https://themilsource.com/tag/" + q;
  console.log(q);

  //request
  var response = await fetch(q);
    switch (response.status) {
        // status "OK"
        case 200:
            var template = await response.body.getReader().read();

            console.log(template);
            break;
        // status "Not Found"
        case 404:
            console.log('Not Found');
            break;
    }
}

//find keywords in heading
function getKeywords(head) {
  var keywords = "";
  const regex = /(([A-Z]|[0-9])(([A-Z]|[a-z]|[0-9])*))/g;
  const found = head.toString().match(regex);
  found.forEach(element => {
    keywords += element + ", ";
  });

  document.getElementById("articleKeywords").textContent = keywords;//.replace(" ", "', '");
  return keywords;
}

//read heading from page
const readH1 = () => {
  var articleHead = document.querySelector("p").textContent;
  return articleHead;
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
        document.getElementById("articleHeadingOut").textContent = "No article found.";
        return;
      }
      let keywords = getKeywords(out);
      getArticles(keywords);
      document.getElementById("articleHeadingOut").textContent = '"' + out + '"';
    })
});