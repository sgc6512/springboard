"use strict";

const $showsList = $("#shows-list");
const $episodesArea = $("#episodes-area");
const $searchForm = $("#search-form");

/** Given a search term, search for tv shows that match that query.
 *
 *  Returns (promise) array of show objects: [show, show, ...].
 *    Each show object should contain exactly: {id, name, summary, image}
 *    (if no image URL given by API, put in a default image URL)
 */

async function getShowsByTerm(term) {
  // Make request to TVMaze search shows API.
  if (!term) {
    term = "bletchley";
  }
  const show = await axios.get("http://api.tvmaze.com/search/shows", {
    params: { q: term },
  });
  console.log(show);

  // Build the array of show objects the method requires
  let showArr = [
    {
      id: show.data[0].show.id,
      name: show.data[0].show.name,
      summary: show.data[0].show.summary,
      image: show.data[0].show.image.medium,
    },
  ];
  if (showArr[0].image === undefined) {
    showArr[0].image === "https://tinyurl.com/tv-missing";
  }
  return showArr;
}

/** Given list of shows, create markup for each and to DOM */

function populateShows(shows) {
  $showsList.empty();

  for (let show of shows) {
    const $show = $(
      `<div data-show-id="${show.id}" class="Show col-md-12 col-lg-6 mb-4">
         <div class="media">
           <img 
              src="${show.image}" 
              alt="Bletchly Circle San Francisco" 
              class="w-25 mr-3">
           <div class="media-body">
             <h5 class="text-primary">${show.name}</h5>
             <div><small>${show.summary}</small></div>
             <button class="btn btn-outline-light btn-sm Show-getEpisodes">
               Episodes
             </button>
           </div>
         </div>  
       </div>
      `
    );
    $showsList.append($show);
    // Add event listener to episodes button and call the getEpisodesOfShow function there
    // had to add event listener inside here as the button is created dynamically
    const $episodesButton = $(".btn.btn-outline-light.btn-sm.Show-getEpisodes");
    console.log($episodesButton);
    $episodesButton.on("click", async function (evt) {
      let episodes = await getEpisodesOfShow(show.id);
      populateEpisodes(episodes);
    });
  }
}

/** Handle search form submission: get shows from API and display.
 *    Hide episodes area (that only gets shown if they ask for episodes)
 */

async function searchForShowAndDisplay() {
  const term = $("#search-query").val();
  const shows = await getShowsByTerm(term);

  $episodesArea.hide();
  populateShows(shows);
}

$searchForm.on("submit", async function (evt) {
  evt.preventDefault();
  await searchForShowAndDisplay();
});

/** Given a show ID, get from API and return (promise) array of episodes:
 *      { id, name, season, number }
 */

async function getEpisodesOfShow(id) {
  // use a axios get to get all the shows episodes using its id we passed in
  let episodes = await axios.get(`https://api.tvmaze.com/shows/${id}/episodes`);
  let episodesArr = [];
  // Add all the data to the array and then return it
  for (let episode of episodes.data) {
    episodesArr.push({
      id: episode.id,
      name: episode.name,
      season: episode.season,
      number: episode.number,
    });
  }
  return episodesArr;
}

/** Write a clear docstring for this function... */

function populateEpisodes(episodes) {
  // initialize variable
  let episode = "";
  // set the css of the episodes area to block so that it displays
  $episodesArea.css("display", "block");
  // go through the entire array appending all the info to the episodes area
  for (let i = 0; i < episodes.length; i++) {
    episode = $(
      `<li>${episodes[i].name}, (Season ${episodes[i].season}, Episode ${episodes[i].number})</li>`
    );
    $episodesArea.append(episode);
  }
}
