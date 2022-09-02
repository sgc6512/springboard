"use strict";

/******************************************************************************
 * Handling navbar clicks and updating navbar
 */

/** Show main list of all stories when click site name */

function navAllStories(evt) {
  console.debug("navAllStories", evt);
  hidePageComponents();
  putStoriesOnPage();
}

$body.on("click", "#nav-all", navAllStories);

/** Show login/signup on click on "login" */

function navLoginClick(evt) {
  console.debug("navLoginClick", evt);
  hidePageComponents();
  $loginForm.show();
  $signupForm.show();
}

$navLogin.on("click", navLoginClick);

/** When a user first logins in, update the navbar to reflect that. */

function updateNavOnLogin() {
  console.debug("updateNavOnLogin");
  $(".main-nav-links").show();
  $navLogin.hide();
  $navLogOut.show();
  $navUserProfile.text(`${currentUser.username}`).show();
}

// When users click the submit navbar link
function navSubmitClick(evt) {
  console.debug("navSubmitClick", evt);
  $submitForm.show();
}

$navSubmit.on("click", navSubmitClick);

// when users click the favorites navbar link
function navFavoritesClick(evt) {
  console.debug("navFavoritesClick", evt);
  // Hide the stories
  hidePageComponents();
  // Display the favorites list
  putFavoritesListOnPage();
}

$navFavorites.on("click", navFavoritesClick);

// when users click the my stories navbar link
function navPersonalClick(evt) {
  console.debug("navPersonalClick");
  // Hide the stories
  hidePageComponents();
  // Display the personal stories
  putPersonalListOnPage();
}

$navPersonalList.on("click", navPersonalClick);
