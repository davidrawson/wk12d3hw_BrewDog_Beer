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

  loopThroughBeers(beers);
}

const loopThroughBeers = function(beers){
  beers.forEach(function(beer){
    displayDetails(beer);
  })
}

const displayDetails = function(beer){
  const ul = document.getElementById("beers-list");
  const name_li = document.createElement("li");
  name_li.innerText = beer.name;

  const image = document.createElement("img");
  image.src = beer.image_url;
  // image.setAttribute("height", 400);
  image.height = 400;

  const ingredients = formIngredients(beer);
  // const ingredients = document.createElement("ul");
  // const hops = document.createElement("li");
  // hops.innerText =


  ul.appendChild(name_li);
  ul.appendChild(image);
  ul.appendChild(ingredients);

  // displayImage(beer);
}

const formIngredients = function(beer){
  const ingredients = document.createElement("ul");
  ingredients.innerText = "Ingredients";

  const maltsList = document.createElement("ul");
  maltsList.innerText = "Malts";

  const malts = beer.ingredients.malt;
  malts.forEach(function(type){
    const malt = document.createElement("li")
    malt.innerText = type.name;
    maltsList.appendChild(malt);
  })

  const hopsList = document.createElement("ul");
  hopsList.innerText = "Hops";

  const hops = beer.ingredients.hops;
  hops.forEach(function(type){
    const hop = document.createElement("li");
    hop.innerText = type.name;
    hopsList.appendChild(hop);
  })

  const yeast = document.createElement("li");
  yeast.innerText = "Yeast: " + beer.ingredients.yeast;

  ingredients.appendChild(maltsList);
  ingredients.appendChild(hopsList);
  ingredients.appendChild(yeast);

  return ingredients;
}


document.addEventListener('DOMContentLoaded', app);
