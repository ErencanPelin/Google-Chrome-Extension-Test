import { getNews } from "./../scripts/newsAPI.js";

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
  var articlesResult = await getNews(keywords.replaceAll(', ', '-'));
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
      keywords = getKeywords(out);
      document.getElementById("articleHeadingOut").textContent = '"' + out + '"';
    })
});