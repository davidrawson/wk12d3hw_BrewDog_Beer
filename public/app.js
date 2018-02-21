const app = function () {
  const url = "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json";
  makeRequest(url, requestComplete);
};

const makeRequest = function(url, callbackComplete){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.eventListener("load", callbackComplete);
  request.send();
}


document.addEventListener('DOMContentLoaded', app);
