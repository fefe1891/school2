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

function navMyStoriesClick(evt) {
    console.debug("navMyStoriesClick", evt);

    console.log(currentUser.ownStories);

    hidePageComponents();

    if (currentUser) {
        for(let story of currentUser.ownStories) {
            console.log('Generating markup for: ', story);
            const $story = generateStoryMarkup(story);
            console.log('Adding to My Stories list: ', $story);
            $myStoriesList.append($story);
        }
    }
    /*shows the My Stories section when clicked*/
    $("#my-stories-section").show();
}
/*handle click event on "My Stories"*/
$("#nav-my-stories").on("click", navMyStoriesClick);
