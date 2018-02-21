const app = function () {
  const url = "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json";
  makeRequest(url, requestComplete);
};

const makeRequest = function(url, callbackComplete){
  const request = new XMLHttpRequest();
  request.open("GET", url);
  request.addEventListener("load", callbackComplete);
  request.send();
}

const requestComplete = function(){
  if (this.status !== 200) return;
  const jsonString = this.responseText;

  const beers = JSON.parse(jsonString);

  beers.forEach(function(beer){
    displayNames(beer);
  })
}

const displayNames = function(beer){
  const ul = document.getElementById("beers-list");
  const name_li = document.createElement("li");
  name_li.innerText = beer.name;
  ul.appendChild(name_li);
}


document.addEventListener('DOMContentLoaded', app);
