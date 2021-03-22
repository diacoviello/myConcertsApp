var BITKey = config.BIT_KEY;
var myKey = config.MY_KEY;
var resultTextEl = document.querySelector("#result-text");
var resultContentEl = document.querySelector("#result-content");
var searchFormEl = document.querySelector("#search-form");
var dataLong = [];
var dataLat = [];
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

  var artist = resultObj.lineup[0];
  console.log(artist);

  resultTextEl.textContent = resultObj.lineup[0];

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

  var showTime = resultObj.datetime.slice(11, 16);
  console.log(showTime);
  // showTime.setAttribute("class", "event_time");
  var showDate = resultObj.datetime.slice(0, 10);
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
  if (resultObj.venue.location) {
    locationEl.innerHTML +=
      "Location: " + resultObj.venue.location + "<br/>"; //.join(', ') +
  } else {
    locationEl.innerHTML +=
      "Subjects: No subject for this entry.";
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

  const saveEvent = async function() {
  console.log(this);

    event.preventDefault();
  
    // console.log(artist);

    var venue = $(this).siblings(".venue_name")[0].textContent;
    console.log(venue);
    var location = $(this).siblings(".loc-details")[0].textContent;
    console.log(location);
    console.log($(this).siblings(".loc-details")[0].textContent);
    var showDate = $(this).siblings(".date-details")[0].textContent;
    console.log(showDate);
    var showTime = $(this).siblings(".time-details")[0].textContent;
    console.log(showTime);
    var eventUrl = resultObj.url;
    // var eventUrl = $(this).siblings(".eventUrl")[0];
    console.log(eventUrl);

    var obj = {
      artist_name: artist,
      location: location,
      venue_name: venue,
      date: showDate,
      time: showTime,
      event_url: eventUrl,
    };
    console.log(obj);

    await fetch("/api/event", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  var rsvpBtn = document.createElement("a");
  rsvpBtn.textContent = "~*~ RSVP ~*~";
  //send event information to user's database
  // rsvpBtn.setAttribute("href", resultObj.url);
  rsvpBtn.classList.add("btn-large", "btn-dark");
  rsvpBtn.addEventListener("click", saveEvent);
  console.log("its working!!!");

  resultBody.append(
    titleEl,
    dateEl,
    timeEl,
    locationEl,
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