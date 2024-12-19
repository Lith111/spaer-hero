const allTabsHead = document.querySelectorAll(`.tab-head-single`);
const allTabsBody = document.querySelectorAll(`.tab-body-single`);
const saerchfrom = document.querySelector(".app-header-search");
let searchList = document.getElementById("search-list");
let activeTab = 1,
  allData;
const init = () => {
  showActiveTabBody();
  showActiveTabhead();
};
const showActiveTabhead = () => {
  allTabsHead[activeTab - 1].classList.add("show-tab");
};
const showActiveTabBody = () => {
  allTabsBody[activeTab - 1].classList.add("show-tab");
};

const hideAllTabBody = () => {
  allTabsBody.forEach((singleTabBody) => {
    singleTabBody.classList.remove("show-tab");
  });
};
const hideAllTabhead = () => {
  allTabsHead.forEach((singleTabHead) =>
    singleTabHead.classList.remove("show-tab")
  );
};
// TODO: even listeners
window.addEventListener("DOMContentLoaded", () => init());
allTabsHead.forEach((singleTabHead) => {
  singleTabHead.addEventListener("click", () => {
    hideAllTabhead();
    hideAllTabBody();
    activeTab = singleTabHead.dataset.id;
    showActiveTabhead();
    showActiveTabBody();
  });
});
const getInputValue = (event) => {
  event.preventDefault();
  let searchValue = saerchfrom.search.value;
  fetchAllSuperHero(searchValue);
};
// 2294066754102825
saerchfrom.addEventListener("submit", getInputValue);
const fetchAllSuperHero = async (saerchtext) => {
  let url = `https://superheroapi.com/api.php/2294066754102825/search/${saerchtext}`;
  try {
    const response = await fetch(url);
    allData = await response.json();
    if (allData.response === "success") {
      // console.log(allData);
      showSaerchrelist(allData.results);
    }
  } catch (error) {
    console.log(error);
  }
};
const showSaerchrelist = (data) => {
  searchList.innerHTML = "";
  data.forEach((dataItem)=>{
    const divElem = document.createElement("div");
    divElem.classList.add("search-list-item");
    divElem.innerHTML = `<div class = "search-list-item">
    <img src = "${dataItem.image.url ? dataItem.image.url : ""}">
    <p data-id="${dataItem.id}">${dataItem.name}</p>`;
    searchList.appendChild(divElem);
  });
};
saerchfrom.search.addEventListener('keyup', () => {
    if(saerchfrom.search.value.length > 1){
        fetchAllSuperHero(saerchfrom.search.value);
    } else {
        searchList.innerHTML = "";
    }
});
searchList.addEventListener('click',(event)=>{
    let searchId = event.target.dataset.id;
    let singleData =  allData.results.filter(singleData =>{
        return searchId === singleData.id;
    });
    showSuperoDatails(singleData);
    searchList.innerHTML = "";
});
const showSuperoDatails = (data)=>{
    console.log(data);
    document.querySelector('.app-body-content-thumbnail').innerHTML = `
    <img src = "${data[0].image.url}">`;
    document.querySelector('.name').textContent = data[0].name;
    document.querySelector('.name').textContent = data[0].name;
    document.querySelector('.powerstats').innerHTML = `
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>intelligence</span>
        </div>
        <span>${data[0].powerstats.intelligence}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>strength</span>
        </div>
        <span>${data[0].powerstats.strength}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>speed</span>
        </div>
        <span>${data[0].powerstats.speed}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>durability</span>
        </div>
        <span>${data[0].powerstats.durability}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>power</span>
        </div>
        <span>${data[0].powerstats.power}</span>
    </li>
    <li>
        <div>
            <i class = "fa-solid fa-shield-halved"></i>
            <span>combat</span>
        </div>
        <span>${data[0].powerstats.combat}</span>
    </li>
    `;

    document.querySelector('.biography').innerHTML = `
    <li>
        <span>full name</span>
        <span>${data[0].biography['full-name']}</span>
    </li>
    <li>
        <span>alert-egos</span>
        <span>${data[0].biography['alter-egos']}</span>
    </li>
    <li>
        <span>aliases</span>
        <span>${data[0].biography['aliases']}</span>
    </li>
    <li>
        <span>place-of-birth</span>
        <span>${data[0].biography['place-of-birth']}</span>
    </li>
    <li>
        <span>first-apperance</span>
        <span>${data[0].biography['first-appearance']}</span>
    </li>
    <li>
        <span>publisher</span>
        <span>${data[0].biography['publisher']}</span>
    </li>
    `;

    document.querySelector('.appearance').innerHTML = `
    <li>
        <span>
            <i class = "fas fa-star"></i> gender
        </span>
        <span>${data[0].appearance['gender']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> race
        </span>
        <span>${data[0].appearance['race']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> height
        </span>
        <span>${data[0].appearance['height'][0]}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> weight
        </span>
        <span>${data[0].appearance['weight'][0]}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> eye-color
        </span>
        <span>${data[0].appearance['eye-color']}</span>
    </li>
    <li>
        <span>
            <i class = "fas fa-star"></i> hair-color
        </span>
        <span>${data[0].appearance['hair-color']}</span>
    </li>
    `;

    document.querySelector('.connections').innerHTML = `
    <li>
        <span>group--affiliation</span>
        <span>${data[0].connections['group-affiliation']}</span>
    </li>
    <li>
        <span>relatives</span>
        <span>${data[0].connections['relatives']}</span>
    </li>
    `;
}    