var artistInput = document.querySelector("#search-input");
var searchArtistEl = document.querySelector("#search-artist");
var artistListEl = document.querySelector("#artist-list");
var artists = [];
var events = [];

function getShows() {
    $.get("/api/events", function(data) {
        events = data
    } )
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

  locQueryUrl =
    locQueryUrl + query + "events/?app_id=" + BIT_KEY;
  console.log(locQueryUrl);

  fetch(locQueryUrl)
    .then(function (response) {
      if (!response.ok) {
        throw response.json();
      }
      return response.json();
    })

    fetch("/api/events", () => {
        var venue = response.venue.name,
        var location = response.venue.location,
        var dateTime = response.datetime,
        var artist = response.artist.name
    })

    function updateDB(todo) {
    $.ajax({
      method: 'PUT',
      url: '/api/events/' + ,
      data: todo
    }).then(getTodos);
  }

    .catch(function (error) {
      console.error(error);
    });
}



searchArtistEl.addEventListener("search", handleSearchFormSubmit);
console.log(searchArtistEl);