"use strict";

movies.splice(50);

// ============================= NORMALIZE ALL MOVIES =========================//

let allMovies = movies.map((item) => {
  return {
    id: item.imdbId,
    year: item.year,
    category: item.categories,
    rating: item.imdbRating,
    lang: item.language,
    link: `https://youtube.com/embed/${item.youtubeId}`,
    title: item.title,
    summary: item.summary,
    maxImg: item.bigThumbanil,
    minImg: item.smallThumbnail,
    time: `${Math.trunc(item.runtime / 60)}h ${item.runtime % 60}m`,
  };
});

// console.log(allMovies);

// ============================= NORMALIZE ALL MOVIES END =========================//

// ============================= NORMALIZE ALL MOVIES END =========================//

function renderMovies(movies) {
  if (movies && movies.length) {
    movies.forEach((item) => {
      const card = createElement(
        "div",
        "card",
        `
       <div class="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src="${item.minImg}"class="img-fluid w-100" />
                    <a href="#!">
                    <divclass="mask"></divclass=>
                    </a>
                  </div>
                  <div class="card-body">
                    <h5 class="card-title">${item.title}</h5>
                    <ul class="card-text list-unstyled">
                    <hr>
                     <li><strong> Language : </strong> ${item.lang}</li>
                    <hr>

                       <li><strong>Category: </strong> ${item.category}</li>
                    <hr>

                       <li><strong>Year: </strong> ${item.year}</li>
                    <hr>

                       <li><strong>Rating: </strong> ${item.rating}</li>
                    <hr>

                       <li><strong>Runtime: </strong> ${item.time}</li>
                    <hr>

                       <li><strong>YouTube: </strong> <a href="${item.link}" target="_blank">Watch</a> </li>
                    <hr>

                    </ul>
                    <div class="d-flex gap-4"> 
                         <a href="#!" class="btn btn-primary">Read more</a>
                         <a href="#!" class="btn btn-warning" data-info=${item.id}>Add bookmark</a>
                    </div>
                  </div>
    `
      );

      $(".wrapper").append(card);
    });
  } else {
    $(".wrapper").innerHTML =
      "<h1 class='text-center text-danger'> NOT FOUND </h1>";
  }
}

renderMovies(allMovies);

// ----------------------------- RENDER MOVIES END -----------------------------

// ----------------------------- DYNAMIC CATEGORY -----------------------------

function dynamicCategory(data) {
  const categories = [];

  if (data) {
    data.forEach((item) => {
      item.category.forEach((el) => {
        if (!categories.includes(el)) {
          categories.push(el);
        }
      });
    });
  }

  if (categories.length) {
    categories.forEach((item) => {
      const option = createElement("option", "item", item);
      $("#category").append(option);
    });
  }
}

dynamicCategory(allMovies);

// ----------------------------- DYNAMIC CATEGORY END -----------------------------

// -----------------------------  GLOBAL SEARCH START -----------------------------

$("#global-search").addEventListener("keyup", (e) => {
  $(".wrapper").innerHTML = "";

  const result = allMovies.filter((item) => {
    return item.title.toLowerCase().includes(e.target.value);
  });
  if (result.length) {
    renderMovies(result);
  } else {
    $(".wrapper").innerHTML =
      "<h1 class='text-center text-danger'> NOT FOUND </h1>";
  }
});

// -----------------------------  GLOBAL SEARCH END -----------------------------

// ----------------------------- MULTI SEARCH FILM   -----------------------------

//1- START MULTI SEARCH

function search() {
  $(".wrapper").innerHTML = "";

  let byTitle = $("#name");
  let byRating = $("#rating");
  let byCategory = $("#category");

  const findFilms = (filmtitle, rating, category) => {
    return allMovies.filter((item) => {
      return (
        item.title.includes(filmtitle) &&
        item.rating >= rating &&
        item.category.includes(category)
      );
    });
  };

  const res = findFilms(
    byTitle.value.toLowerCase(),
    byRating.value.toLowerCase(),
    byCategory.value.toLowerCase()
  );

  if (res && res.length) {
    renderMovies(res);
  } else {
    $(
      ".wrapper"
    ).innerHTML = `<h1 class='text-center text-warning'> SEARCH res ${res.length} </h1>`;
  }
  byTitle.value = "";
  byRating.value = "";
  byCategory.value = "";
}

$("#searchFilm").addEventListener("submit", () => {
  search();
});

// ----------------------------- MULTI SEARCH FILM  END  -----------------------------

//------------------------------- BOOKMARK SATRT ---------------------------------

let bookmark = [];

$(".wrapper").addEventListener("click", (e) => {
  $(".bookmark").innerHTML = "";
  if (e.target.classList.contains("btn-warning")) {
    let id = e.target.getAttribute("data-info");

    const select = allMovies.filter((el) => el.id === id)[0];

    if (!bookmark.includes(select)) {
      bookmark.push(select);
    }

    getBookmark(bookmark);

    const books = JSON.stringify(bookmark);

    console.log(books);

    localStorage.setItem("bookmark", books);
  }
});

function getBookmark(data) {
  if (data.length) {
    data.forEach((item, index) => {
      const bookCard = createElement(
        "div",
        "card",
        `
            
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="${item.minImg}"
                  alt="Trendy Pants and Shoes"
                  class="img-fluid rounded-start" />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    ${item.title}
                  </h5>

                  <span  data-item="${index}" class="bg-danger rounded-circle cursor-pointer del">
                    x
                  </span>
                </div>
              </div>
            </div>
    
            `
      );

      $(".bookmark").append(bookCard);
    });
  }
}

let data = JSON.parse(localStorage.getItem("bookmark"));

getBookmark(data);

$(".bookmark").addEventListener("click", (e) => {
  $(".bookmark").innerHTML = "";

  let bookmark = JSON.parse(localStorage.getItem("bookmark"));

  if (e.target.classList.contains("del")) {
    let id = e.target.getAttribute("data-item");

    bookmark.splice(id, 1);

    console.log(bookmark);
    getBookmark(bookmark);

    localStorage.setItem("bookmark", JSON.stringify(bookmark));
  }
});
