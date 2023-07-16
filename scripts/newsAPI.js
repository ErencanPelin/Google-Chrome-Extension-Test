import { newsAPI_Key } from "./../secrets.js";

var apiKey = newsAPI_Key;

var getNews = async (keywords) => {
    let requestURL = 'https://newsapi.org/v2/everything?q=' + keywords + '&apiKey=' + apiKey;
    let response = await fetch(requestURL);
    console.log(response);
    if (!response.ok) {
        alert("Data unavailable at the moment. Please try again later");
        return null;
    }
    let data = await response.json();
    return data;
};

export { getNews };