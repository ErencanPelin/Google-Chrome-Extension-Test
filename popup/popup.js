var tab_title = '';
function display_h1(results) {
    h1 = results;
    document.querySelector("#id1").innerHTML = "<p>tab title: " + tab_title + "</p><p>dom h1: " + h1 + "</p>";
}

const functionToExecute = () => {
    return document.querySelector("h1").textContent;
};

chrome.tabs.query({ active: true }, function (tabs) {
    var tab = tabs[0];
    tab_title = tab.title;

    chrome.scripting.executeScript(
        {
            target: { tabId: tab.id },
            function: functionToExecute
        },
        (res) => { 
            var out = res[0].result;
            if (out == null) out = "Nothing relevant found.";
            document.getElementById("output").textContent = out; 
        })

    /*document.querySelector("h1").textContent*/
});