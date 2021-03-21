var BITKey = config.BIT_KEY;
var myKey = config.MY_KEY;
var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");
var dataLong = [];
var dataLat = [];
var RSVPEvent = { artist_name, location, venue_name, date, time, event_url };
var artistCard = document.querySelector(".artistCard");

function getParams() {
  // Get the search params out of the URL (i.e. `?q=london&format=photo`) and convert it to an array (i.e. ['?q=london', 'format=photo'])
  var searchParamsArr = document.location.search; //.split('&');
  console.log(searchParamsArr);

  // Get the query and format values
  var query = searchParamsArr.split("=").pop();
  console.log(query);

  searchApi(query);
}

function printResults(resultObj) {
  console.log(resultObj);

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
  titleEl.setAttribute("class", "venue_name");

  var time = resultObj.datetime.slice(11, 16);
  console.log(time);
  time.setAttribute("class", "event_time");
  var date = resultObj.datetime.slice(0, 10);
  date.setAttribute("class", "event_date");
  console.log(date);

  var bodyContentEl = document.createElement("p");
  bodyContentEl.setAttribute("class", "details");
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
  linkButtonEl.setAttribute("class", "eventUrl");
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

  const saveEvent = async (event) => {
    event.preventDefault();
    // var artist_name: resultObj.artist.name,
    var venue = $(this).siblings(".venue_name").val();
    var location = $(this).siblings(".details").find(".eventUrl").val();
    var date = $(this).siblings("event_date").val();
    var time = $(this).siblings("event_time").val();
    var eventUrl = $(this).siblings("eventUrl").val();
    await fetch("/api/events", {
      method: 'POST',
      body: {
        venue_name: venue,
        date: date,
        time: time,
      }

    // fetch("/api/events", {
    //   method: "POST",
    //   body: {
    //     artist_name: resultObj.artist.name,
    //     location: resultObj.venue.location,
    //     venue_name: resultObj.venue.name,
    //     date: date,
    //     time: time,
    //     event_url: resultObj.url,
    //   },
    // });
  }

  var rsvpBtn = document.createElement("a");
  rsvpBtn.textContent = "~*~ RSVP ~*~";
  //send event information to user's database
  // rsvpBtn.setAttribute("href", resultObj.url);
  rsvpBtn.classList.add("btn-large", "btn-dark");
  rsvpBtn.addEventListener("click", saveEvent);
  console.log('its working!!!')

  resultBody.append(
    titleEl,
    bodyContentEl,
    linkButtonEl,
    directionsBtn,
    rsvpBtn
  );
}

function loginRegisterReturn() {
  alert("You must be logged in to do that");
}

function searchApi(query) {
  artistCard.innerHTML = "";

  var locQueryUrl = "https://rest.bandsintown.com/v4/artists/";

  locQueryUrl = locQueryUrl + query + "/events/?app_id=" + BITKey;

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }

      return response.json();
      console.log(response);
    })

    .then(function (locRes) {
      console.log(locRes);

      // write query to page so user knows what they are viewing
      resultTextEl.textContent = query;
      var newImg = document.createElement("img");
      newImg.classList.add("img");
      newImg.setAttribute("src", locRes[0].artist.thumb_url);
      artistCard.append(newImg);

      if (!locRes.length) {
        console.log("No results found!");
        resultContentEl.innerHTML = "<h3>No results found, search again!</h3>";
      } else {
        resultContentEl.textContent = "";
        for (let i = 0; i < locRes.length; i++) {
          printResults(locRes[i]);
        }
      }
    })
    .catch(function (error) {
      console.error(error);
    });
}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var searchInputVal = document.querySelector("#search-input").value;

  if (!searchInputVal) {
    console.error("You need a search input value!");
    return;
  }

  searchApi(searchInputVal);
}

searchFormEl.addEventListener("submit", handleSearchFormSubmit);

getParams();
