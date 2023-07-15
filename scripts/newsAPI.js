import { newsAPI_Key } from "./../secrets.js";

var apiKey = newsAPI_Key;

let requestURL = 'https://newsapi.org/v2/everything?apiKey=' + apiKey;
var getNews = async () => {
    let response = await fetch(requestURL);
    console.log(response);
    if (!response.ok) {
        alert("Data unavailable at the moment. Please try again later");
        return null;
    }
    let data = await response.json();
    console.log(data);
    return data.articles;
};

export { getNews };