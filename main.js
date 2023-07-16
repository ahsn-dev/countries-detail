import "./src/style/style.css";
import ElementGenerator from "./src/library/ElementGernerator";

const search = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const card = document.getElementById("parent");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const countPage = document.getElementById("countPage");
let counter = 1;

const BASE_URL = "http://localhost:3000/all";

searchBtn.addEventListener("click", () => {
  //   fetch(filter_country)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //       const filterItems = data.filter((item) => {
  //         return item.name.common.toLowerCase() === search.value.toLowerCase();
  //       });
  //       card.innerHTML = "";
  //       card.append(renderCard(filterItems[0]));
  //     })
  //     .catch((error) => console.log(error));
  const URL = `http://localhost:3000/all?name.common=${
    search.value.charAt(0).toUpperCase() + search.value.slice(1)
  }`;
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      card.innerHTML = "";
      card.append(renderCard(data[0]));
    });
});

function renderCard(obj) {
  let neighbours;
  if (obj.borders) {
    neighbours = obj.borders.slice(0, 3);
  }
  return ElementGenerator({
    element: "div",
    className: "mt-20 relative rounded-lg bg-opacity-80 bg-red-200",
    style: "width: 300px",
    child: [
      ElementGenerator({
        element: "div",
        className: "w-28 h-24",
        child: ElementGenerator({
          element: "img",
          className: "w-full h-full",
          src: obj.flags.png,
          onload: (e) => {
            e.target.style.height = "200px";
            e.target.style.width = "300px";
          },
        }),
      }),
      ElementGenerator({
        element: "h2",
        className: "font-bold text-center pt-20",
        child: obj.name.common,
        style: "width: 100%; font-size: 1.2rem",
      }),
      ElementGenerator({
        element: "div",
        className: "mt-10 p-3",
        child: [
          ElementGenerator({
            element: "p",
            className: "mb-3 text-lg",
            child: `Capital: ${obj.capital}`,
          }),
          ElementGenerator({
            element: "p",
            className: "mb-3 text-lg",
            child: `Prefix Number: ${obj.idd.root}`,
          }),
          ElementGenerator({
            element: "p",
            child: [
              ElementGenerator({ element: "span", child: "Neighbours:" }),
              ElementGenerator({
                element: "div",
                className: "flex flex-wrap text-xs",
                child: `${neighbours || "ISLAND"}`,
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function showCards(count) {
  const URL = `http://localhost:3000/all?_sort=name.common&&_order=asc&&_page=${count}&&_limit=3`;
  console.log(URL);
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      data.map((item) => {
        if (item.name.common === "Israel") {
          return;
        }
        card.append(renderCard(item));
      });
    });
}

showCards(counter);

prevBtn.addEventListener("click", () => {
  card.innerHTML = "";
  counter > 1 ? counter-- : counter;
  showCards(counter);
  countPage.textContent = `PAGE: ${counter}`;
  return counter;
});

nextBtn.addEventListener("click", () => {
  card.innerHTML = "";
  counter > 0 ? counter++ : counter;
  countPage.textContent = `PAGE: ${counter}`;
  showCards(counter);
  return counter;
});

//fetch
// const BASE_URL = 'http://localhost:5174/all';
// searchBtn.addEventListener('click', () => {
//   fetch(BASE_URL)
//     .then((response) => console.log(response.json()))
//     .then((data) => {
//       const filterItems = data.filter((item) => {
//         return item.name.common.toLowerCase() === search.value.toLowerCase();
//       });
//       card.innerHTML = renderCard(filterItems[0]);
//     });
// });

////async, await
// const BASE_URL = "http://localhost:3000/all";
// searchBtn.addEventListener("click", async () => {
//   try {
//     const response = await fetch(BASE_URL);
//     const data = await response.json();

//     const filterItems = data.filter((item) => {
//       return item.name.common.toLowerCase() === search.value.toLowerCase();
//     });
//     card.innerHTML = renderCard(filterItems[0]);
//   } catch (error) {
//     console.error(error);
//   }
// });
// function renderCard(obj) {
//   return `<div class="absolute bottom-48 left-24"><img class="w-5 h-4" src="${obj.flags.png}" /></div>
//   <h2 class="text-3xl font-bold text-center pt-20">${obj.name.common}</h2>
//   <div class="mt-10 p-3">
//     <p class="mb-3 text-lg">Capital: ${obj.capital}</p>
//     <p class="mb-3 text-lg">Prefix Number: ${obj.idd.root}</p>
//     <p class="mb-3">Neighbors:<span class="text-xs">${obj.borders}</span></p>
//   </div>`;
// }
