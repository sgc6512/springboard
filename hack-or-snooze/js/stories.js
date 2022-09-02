"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();

  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story, trash = false) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  const showStar = Boolean(currentUser);

  return $(`
      <li id="${story.storyId}">
      ${trash ? getDeleteBtnHTML() : ""}
      ${showStar ? getStarHTML(story, currentUser) : ""}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

// Get star html
function getStarHTML(story, user) {
  const isFavorite = user.isFavorite(story);
  const starType = isFavorite ? "fas" : "far";
  return `
  <span class="star">
    <i class="${starType} fa-star"></i>
    </span>`;
}

function getDeleteBtnHTML() {
  return `
      <span class="trash-can">
        <i class="fas fa-trash-alt"></i>
      </span>`;
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  $allStoriesList.show();
}

// Called when users submit the new story form
async function getNewStory() {
  // get data from the form
  let title = $("#submit-title").val();
  let author = $("#submit-author").val();
  let url = $("#submit-url").val();
  // call the add story method
  let story = await storyList.addStory(currentUser, { title, author, url });
  // Add the new story to the current users story list
  currentUser.ownStories.push(story);
  // Call get and show stories on start
  getAndShowStoriesOnStart();
}

$submitFormButton.on("click", getNewStory);

// toggle favorite and unfavorite a story
async function toggleFavorite(evt) {
  console.debug("toggleFavorite");

  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  const story = storyList.stories.find((s) => s.storyId === storyId);
  if ($tgt.hasClass("fas")) {
    await currentUser.removeFavorite(story);
    $tgt.closest("i").toggleClass("fas far");
  } else {
    await currentUser.addFavorite(story);
    $tgt.closest("i").toggleClass("far fas");
  }
}

$storiesLists.on("click", ".star", toggleFavorite);

// Delete button is pressed
async function deleteStory(evt) {
  console.debug("deleteStory");
  const $tgt = $(evt.target);
  const $closestLi = $tgt.closest("li");
  const storyId = $closestLi.attr("id");
  // Remove story from API and users personal list
  await currentUser.deleteStory(storyId);
  // Remove story from storyList
  storyList.stories = storyList.stories.filter((s) => s.storyId !== storyId);
  // Refresh all the stories again
  putPersonalListOnPage();
}

$storiesLists.on("click", ".trash-can", deleteStory);

function putFavoritesListOnPage() {
  console.debug("putFavoritesListOnPage");

  $favoriteStoriesList.empty();

  if (currentUser.favorites.length === 0) {
    $favoriteStoriesList.append("<h5>No favorites added!</h5>");
  } else {
    // loop through all of users favorites and generate HTML for them
    for (let story of currentUser.favorites) {
      const $story = generateStoryMarkup(story);
      $favoriteStoriesList.append($story);
    }
  }

  $favoriteStoriesList.show();
}

// Put own stories on page and only own stories
function putPersonalListOnPage() {
  console.debug("putPersonalListOnPage");

  $personalList.empty();

  if (currentUser.ownStories.length === 0) {
    $personalList.append("<h5>No stories added by user yet!</h5>");
  } else {
    // loop through all the users personal stories and generate html for them
    for (let story of currentUser.ownStories) {
      const $story = generateStoryMarkup(story, true);
      $personalList.append($story);
    }
  }

  $personalList.show();
}
