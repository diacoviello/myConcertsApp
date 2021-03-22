// const mysql = require("mysql");
// const artistData = require("../../../controllers/api/artistRoutes");
// const eventData = require("../../../controllers/api/eventRoutes");
// const userData = require("../../../controllers/api/userRoutes");
// const connection = require("../../../config/connection");

// const { query } = require("express");

var artistInput = document.querySelector("#search-artist");
var searchArtistEl = document.querySelector("#search-artist");
var artistListEl = document.querySelector("#artist-list");
var resultContentEl = document.querySelector("#result-content");
var artists = [];
var events = [];

async function getShows() {
  const response = await fetch("/api/events");
  const data = await response.json();

  for (item of data) {
    var resultCard = document.createElement("div");
    resultCard.classList.add(
      "card-panel",
      "hoverable",
      "light-blue",
      "darken-3",
      "text-dark",
      "mb-3",
      "p-3"
    );

    var resultBody = document.createElement("div");
    resultBody.classList.add("card-body");
    resultCard.append(resultBody);

    var titleEl = document.createElement("h3");
    titleEl.textContent = `${item.venue_name}`;
    titleEl.setAttribute("class", "venue_name");

    var showTime = `${item.time}`;
    console.log(showTime);
    // showTime.setAttribute("class", "event_time");
    var showDate = `${item.date}`;
    // showDate.setAttribute("class", "event_date");
    console.log(showDate);

    // var bodyContentEl = document.createElement("p");
    var dateEl = document.createElement("p");
    dateEl.setAttribute("class", "date-details");
    dateEl.innerHTML = "<strong>Date: </strong>" + showDate + "<br />";
    var timeEl = document.createElement("p");
    timeEl.setAttribute("class", "time-details");
    timeEl.innerHTML = "<strong>Time: </strong>" + showTime + "<br />";

    var locationEl = document.createElement("p");
    locationEl.setAttribute("class", "loc-details");
    locationEl.innerHTML = "Location:" + `${item.location}` + "<br/>";
    console.log(`${item.location}`);

    var linkButtonEl = document.createElement("a");
    linkButtonEl.textContent = "Read More";
    linkButtonEl.setAttribute("href", `${item.event_url}`);
    linkButtonEl.setAttribute("class", "eventUrl");
    linkButtonEl.classList.add("btn-large", "btn-dark");

    linkButtonEl.setAttribute("target", "_blank");
    console.log(`${item.event_url}`);

    resultContentEl.append(resultCard);

    resultBody.append(titleEl, dateEl, timeEl, locationEl, linkButtonEl);
  }
}

async function getArtists() {
  const response = await fetch("/api/artists");
  const data = await response.json();

  for (item of data) {
    var artistList = document.createElement("li");
    artistList.classList.add(
      "card-panel",
      "hoverable",
      "light-blue",
      "darken-3",
      "text-dark",
      "mb-3",
      "p-3"
    );
    var artistEl = document.createElement("h3");
    artistEl.textContent = `${item.artist_name}`;
    artistEl.setAttribute("class", "artist_name");

    artistListEl.append(artistEl);
  };

    await fetch("/api/artists");

}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var artistText = document.querySelector("#add-artist").value;

  // Return from function early if submitted citytext is blank
  if (artistText === "") {
    return;
  }

  // // print to the page
  artistListEl.append(artistText);

  // Add new cityText to cities array, clear the input
  if (!artist.includes(artistText)) {
    artist.push(artistText);
  }
  // cityInput.value = "";

  console.log(artistText);

  // function addArtist() {
  //   fetch("/api/artists", {
  //     method: "POST",
  //     body: {
  //       artist_name: artistText,
  //     },
  //   });
  //   // renderArtists();
  // }

  var artistObj = artistText.textContent;

  fetch("/api/artists", {
    method: "POST",
    body: artistObj,
    headers: {
      "Content-Type": "application/json",
    },
  });

}

searchArtistEl.addEventListener("search", handleSearchFormSubmit);
console.log(searchArtistEl);

getShows();
getArtists();

// function renderArtists() {
//   // Clear cityList element and update userCityRes
//   artistListEl.innerHTML = "";

//   // Render a new li for each city
//   for (var i = 0; i < artists.length; i++) {
//     const artist = artists[i];

//     var li = document.createElement("li");
//     var button = document.createElement("button");
//     button.textContent = artist;
//     button.className = "artist-btn";
//     // button.setAttribute("artist-index", i);
//     li.appendChild(button);

//     button.addEventListener("click", addArtist());

//     artistListEl.appendChild(li);
//   }
// }

// function searchApi(query) {
//   var locQueryUrl = "https://rest.bandsintown.com/v4/artists";

//   locQueryUrl = locQueryUrl + query + "events/?app_id=" + BIT_KEY;
//   console.log(locQueryUrl);

//   fetch(locQueryUrl)
//     .then(function (response) {
//       console.log(response);
//       if (!response.ok) {
//         throw response.json();
//       }
//       return response.json();
//     })

//     .catch(function (error) {
//       console.error(error);
//     });
// }


