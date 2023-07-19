import { getNews } from "./../scripts/newsAPI.js";
import * as keyword_extractor from "./../scripts/lib/keyword_extractor.js";

var keywords = '';
var tab_title = '';
var articleHeading = "";

//generate summary button click event
document.getElementById('summarizeBtn').addEventListener('click', async function (event) {
  console.log("generating summary");
  document.getElementById("summaryOut").textContent = "Generating Summary. Please wait...";
  document.getElementById('summarizeBtn').remove();
  //send query to newsAPI
  let q = articleHeading;
  var articlesResult = await getNews(keywords.toString().replaceAll(',', '-'));
  if (articlesResult == null) return;
  console.log(articlesResult);
  articlesResult.articles.forEach((a) => {
    const fragment = document.createDocumentFragment();
    var div = document.createElement("div");
    div.classList.add("article-link-div");
    var link = document.createElement("a");
    link.classList.add("article-link");
    const li = fragment
      .appendChild(div)
      .appendChild(link);
    li.textContent = a.title + ' by ' + a.author;
    li.href = a.url;

    document.getElementById("articleList").appendChild(fragment);
    document.getElementById("summaryOut").textContent = "Here's what we found on the web:";
  })
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
  var keywords =
    keyword_extractor.extract(head, {
      language: "english",
      remove_digits: true,
      return_changed_case: true,
      remove_duplicates: true
    });

  document.getElementById("articleKeywords").textContent = keywords.toString().replaceAll(',', ', ');
  return keywords;
}

//read heading from page
const readH1 = () => {
  var articleHead = document.querySelector("h1").textContent;
  articleHead += ". " + document.querySelector("p").textContent;
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
      keywords = getKeywords(out);
      document.getElementById("articleHeadingOut").textContent = '"' + out + '"';
    })
});