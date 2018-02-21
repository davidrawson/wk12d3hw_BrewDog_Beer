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
  selectBeer(beers);
}


const loopThroughBeers = function(beers){
  beers.forEach(function(beer){
    displayDetails(beer);
  })
}


const selectBeer = function(beers){

  const beerDropDown = document.getElementById("beer-select");
  const beerOption = document.createElement("option")
  beerOption.innerText = "All";
  beerDropDown.appendChild(beerOption);

  beers.forEach(function(beer){
    const beerOption = document.createElement("option")
    beerOption.innerText = beer.name;
    beerDropDown.appendChild(beerOption);
  })

  beerDropDown.addEventListener('change', function(){
    const ul = document.getElementById("beers-list");
    ul.innerHTML = "";

    if (this.value === "All"){
      loopThroughBeers(beers);
    } else {
      getBeer(this.value, beers);
    }
  });
}

const getBeer = function(beerName, beers){
  beers.forEach(function(beer){
    if (beer.name === beerName){
      displayDetails(beer);
    }
  })
}

const displayDetails = function(beer){
  console.log(beer);
  const ul = document.getElementById("beers-list");
  const name_li = document.createElement("li");
  name_li.innerText = beer.name;

  const image = document.createElement("img");
  image.src = beer.image_url;
  // image.setAttribute("height", 400);
  image.height = 400;

  const ingredients = formIngredients(beer);

  ul.appendChild(name_li);
  ul.appendChild(image);
  ul.appendChild(ingredients);
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
