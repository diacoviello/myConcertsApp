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
    var cardId = document.createElement("p");
    cardId.textContent = `${item.id}`;
    cardId.classList.add("card-id");
    cardId.style.display = "none";

    console.log(`${item.id}`);
    var resultBody = document.createElement("div");
    resultBody.classList.add("card-body");
    resultCard.append(resultBody);

    var titleEl = document.createElement("h3");
    titleEl.textContent = `${item.artist_name}` + " @ " + `${item.venue_name}`;
    titleEl.setAttribute("class", "venue_name");

    var showTime = `${item.time}`;
    console.log(showTime);
    // showTime.setAttribute("class", "event_time");
    var showDate = `${item.date}`;
    // showDate.setAttribute("class", "event_date");
    console.log(showDate);

    var dateEl = document.createElement("p");
    dateEl.setAttribute("class", "date-details");
    dateEl.innerHTML = showDate;
    var timeEl = document.createElement("p");
    timeEl.setAttribute("class", "time-details");
    timeEl.innerHTML = showTime;

    var locationEl = document.createElement("p");
    locationEl.setAttribute("class", "loc-details");
    locationEl.innerHTML = `${item.location}`;
    console.log(`${item.location}`);

    var linkButtonEl = document.createElement("a");
    linkButtonEl.textContent = "Read More";
    linkButtonEl.setAttribute("href", `${item.event_url}`);
    linkButtonEl.setAttribute("class", "eventUrl");
    linkButtonEl.classList.add("btn-large", "btn-dark");

    linkButtonEl.setAttribute("target", "_blank");
    console.log(`${item.event_url}`);

    resultContentEl.append(resultCard);
    var deleteBtn = document.createElement("a");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("btn-large", "btn-dark");
    deleteBtn.addEventListener("click", deleteEvent);
    deleteBtn.addEventListener("click", deleteCard);
    console.log("its working!!!");

    var directionsBtn = document.createElement("a");
    directionsBtn.textContent = "Directions";
    directionsBtn.setAttribute("href", `${item.directions_url}`);
    directionsBtn.classList.add("btn-large", "btn-dark");
    directionsBtn.setAttribute("target", "_blank");

    resultContentEl.append(resultCard);

    function getDirections() {
      window.open(
        `${item.directions_url}`,
        "_blank"
      );
    }

    resultBody.append(
      titleEl,
      dateEl,
      timeEl,
      locationEl,
      linkButtonEl,
      deleteBtn,
      directionsBtn,
      cardId
    );
  }

  function deleteCard() {
    var hideCard = $(this).parent(".card-body").parent(".card-panel")[0];
    if (hideCard.style.display === "none") {
      hideCard.style.display = "block";
    } else {
      hideCard.style.display = "none";
    }
  }
  async function deleteEvent() {
    var id = $(this).siblings(".card-id")[0].textContent;
    console.log(id);

    await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });
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

}

function handleSearchFormSubmit(event) {
  event.preventDefault();

  var artistText = document.querySelector("#add-artist").value;
  console.log(artistText);
  // Return from function early if submitted citytext is blank
  if (artistText === "") {
    return;
  }

  // // print to the page
  artistListEl.append(artistText);
  console.log(artistListEl);

  
  // Add new cityText to cities array, clear the input
  if (!artists.includes(artistText)) {
    artists.push(artistText);
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

  var artistObj = {artist_name: artistText};
  console.log(artistObj);

  fetch("/api/artists", {
    method: "POST",
    body: JSON.stringify(artistObj),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Success:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
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


