<<<<<<< HEAD
const mysql = require("mysql");
const artistData = require("../../../controllers/api/artistRoutes");
const eventData = require("../../../controllers/api/eventRoutes");
const userData = require("../../../controllers/api/userRoutes");
const connection = require("../../../config/connection");

=======
>>>>>>> 6f74116fed82c4d0fb9ac4d14904820a223bd0f8
var artistInput = document.querySelector("#search-input");
var searchArtistEl = document.querySelector("#search-artist");
var artistListEl = document.querySelector("#artist-list");
var resultContentEl = document.querySelector("#result-content");
var artists = [];
var events = [];

<<<<<<< HEAD
function getShows() {
  $.get("/api/event", function (data) {
    events = data;
  });
}

function showEvents(resultObj) {
  console.log(resultObj);

  fetch("/api/event", (event) => {
    "SELECT artist_name, location, venue_name, date, time, event_url FROM myconcertsDB WHERE ?";

  });

  resultTextEl.textContent = resultObj.lineup;

  // set up `<div>` to hold result content
  var resultCard = document.createElement("div");
  resultCard.classList.add(
    "col",
    "s2",
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
  titleEl.textContent = resultObj.venue.name;

  var time = resultObj.datetime.slice(11, 16);
  console.log(time);
  var date = resultObj.datetime.slice(0, 10);
  console.log(date);

  var bodyContentEl = document.createElement("p");
  bodyContentEl.innerHTML =
    "<strong>Date: </strong> " +
    date +
    "<br />" +
    "<strong>Time: </strong>" +
    time +
    "<br />";

  if (resultObj.venue.location) {
    bodyContentEl.innerHTML +=
      "<strong>Location:</strong> " + resultObj.venue.location + "<br/>"; //.join(', ') +
  } else {
    bodyContentEl.innerHTML +=
      "<strong>Subjects:</strong> No subject for this entry.";
  }

  var longRet = parseFloat(dataLong);
  var latRet = parseFloat(dataLat);
  console.log(longRet);
  console.log(latRet);

  // write frunction to grab location in google api to map out lat long
  var mapsLink = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";

  mapsLink = mapsLink + latRet + "," + longRet + "&key=" + myKey;
  console.log(mapsLink);

  var linkButtonEl = document.createElement("a");
  linkButtonEl.textContent = "Read More";
  linkButtonEl.setAttribute("href", resultObj.url);
  linkButtonEl.classList.add("btn-large", "btn-dark");

  linkButtonEl.setAttribute("target", "_blank");

  var directionsBtn = document.createElement("a");
  directionsBtn.textContent = "Directions";
  directionsBtn.setAttribute(
    "href",
    "https://www.google.com/maps/search/?api=1&query=" +
      resultObj.venue.latitude +
      "," +
      resultObj.venue.longitude,
    "_blank"
  );
  directionsBtn.classList.add("btn-large", "btn-dark");
  directionsBtn.setAttribute("target", "_blank");

  resultContentEl.append(resultCard);
  console.log(resultObj.venue.longitude);

  dataLong = resultObj.venue.longitude;
  dataLat = resultObj.venue.latitude;
  console.log(dataLat);
  console.log(dataLong);

  function getDirections() {
    var longRet = dataLong;
    var latRet = dataLat;
    console.log(longRet);
    console.log(latRet);

    window.open(
      "https://www.google.com/maps/search/?api=1&query=" +
        latRet +
        "," +
        longRet,
      "_blank"
    );
  }
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var artistText = artistInput.value.trim();

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

  // Store updated cities in database, re-render the list
  //   storeCities();
  renderArtists();
  //   searchApi(artistText);
}

function renderArtists() {
  // Clear cityList element and update userCityRes
  artistListEl.innerHTML = "";

  // Render a new li for each city
  for (var i = 0; i < artists.length; i++) {
    const artist = artists[i];

    var li = document.createElement("li");
    var button = document.createElement("button");
    button.textContent = artist;
    button.className = "artist-btn";
    // button.setAttribute("artist-index", i);
    li.appendChild(button);

    button.addEventListener("click", function (event) {
      artistInput.value = artist;
    });

    artistListEl.appendChild(li);
  }
}

function searchApi(query) {
  var locQueryUrl = "https://rest.bandsintown.com/v4/artists";

  locQueryUrl = locQueryUrl + query + "events/?app_id=" + BIT_KEY;
  console.log(locQueryUrl);

  fetch(locQueryUrl)
    .then(function (response) {
      console.log(response);
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })

    .catch(function (error) {
      console.error(error);
    });
}

      location: concert.venue.location,
      date: date,
      time: time,
      event_url: concert.url,
    }),
  });
}

searchArtistEl.addEventListener("search", handleSearchFormSubmit);
console.log(searchArtistEl);
=======
async function getShows() {

  const response = await fetch('/api/event');
  const data = await response.json();

  for (item  of data) {
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
    var showDate = `${item.date}`
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
    console.log(`${item.location}`)
   
  
    // var longRet = parseFloat(dataLong);
    // var latRet = parseFloat(dataLat);
    // console.log(longRet);
    // console.log(latRet);
  
    // write frunction to grab location in google api to map out lat long
    // var mapsLink = "https://maps.googleapis.com/maps/api/geocode/json?latlng=";
  
    // mapsLink = mapsLink + latRet + "," + longRet + "&key=" + myKey;
    // console.log(mapsLink);
  
    var linkButtonEl = document.createElement("a");
    linkButtonEl.textContent = "Read More";
    linkButtonEl.setAttribute("href", `${item.event_url}`);
    linkButtonEl.setAttribute("class", "eventUrl");
    linkButtonEl.classList.add("btn-large", "btn-dark");
  
    linkButtonEl.setAttribute("target", "_blank");
    console.log(`${item.event_url}`)

  
    // var directionsBtn = document.createElement("a");
    // directionsBtn.textContent = "Directions";
    // directionsBtn.setAttribute(
    //   "href",
    //   "https://www.google.com/maps/search/?api=1&query=" +
    //     resultObj.venue.latitude +
    //     "," +
    //     resultObj.venue.longitude,
    //   "_blank"
    // );
    // directionsBtn.classList.add("btn-large", "btn-dark");
    // directionsBtn.setAttribute("target", "_blank");
  
    resultContentEl.append(resultCard);
    // console.log(resultObj.venue.longitude);
  

  }

  resultBody.append(
    titleEl,
    dateEl,
    timeEl,
    locationEl,
    linkButtonEl,
    // directionsBtn,
    // rsvpBtn
  );
}
    // $.get("/api/event", function(data) {
    //     events = data
    // } )



// function handleSearchFormSubmit(event) {
//   event.preventDefault();

//   var artistText = artistInput.value.trim();

//   // Return from function early if submitted citytext is blank
//   if (artistText === "") {
//     return;
//   }

//   // // print to the page
//   artistListEl.append(artistText);

//   // Add new cityText to cities array, clear the input
//   if (!artist.includes(artistText)) {
//     artist.push(artistText);
//   }
//   // cityInput.value = "";

//   console.log(artistText);

//   // Store updated cities in database, re-render the list
//   //   storeCities();
//   renderArtists();
// //   searchApi(artistText);
// }

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

//     button.addEventListener("click", function (event) {
//       artistInput.value = artist;
//     });

//     artistListEl.appendChild(li);
//   }
// }

// function searchApi(query) {
//   var locQueryUrl = "https://rest.bandsintown.com/v4/artists";

//   locQueryUrl =
//     locQueryUrl + query + "events/?app_id=" + BIT_KEY;
//   console.log(locQueryUrl);

//   fetch(locQueryUrl)
//     .then(function (response) {
//       console.log(response);
//       if (!response.ok) {
//         throw response.json();
//       }
//       return response.json();
//     })

//     fetch("/api/event", () => {
//         var venue = response.venue.name,
//         var location = response.venue.location,
//         var dateTime = response.datetime,
//         var artist = response.artist.name,
//     })

//     function updateDB(event) {
//     $.ajax({
//       method: 'PUT',
//       url: '/api/events/:id',
//       data: event
//     }).then(getEvent);
//   }

//     .catch(function (error) {
//       console.error(error);
//     });
// }



// searchArtistEl.addEventListener("search", handleSearchFormSubmit);
// console.log(searchArtistEl);
getShows()
>>>>>>> 6f74116fed82c4d0fb9ac4d14904820a223bd0f8
