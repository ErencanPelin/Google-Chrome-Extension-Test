import { newsAPI_Key } from "./../secrets.js";

var apiKey = newsAPI_Key;

var getNews = async (keywords) => {
    let requestURL = 'https://newsapi.org/v2/everything?q=' + keywords + '&apiKey=' + apiKey;
    let response = await fetch(requestURL);
    console.log(response);
    if (!response.ok) {
        console.log(response.status);
        switch (response.status) {
            case 426:
                alert("You have exceeded the number of free NewsAPI requests available. Please wait before trying again, or upgrade to a commercial plan.");
                break;
            case 429:
                alert("Too many requests. Please wait before trying again");
                break;
            case 400:
                alert("Bad request. Please wait before trying again");
                break;
            case 500:
                alert("Server error. Please wait before trying again");
                break;
        }
        return null;
    }
    let data = await response.json();
    return data;
};

export { getNews };