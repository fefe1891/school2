"use strict";

// So we don't have to keep re-finding things on page, find DOM elements once:



const $body = $("body");

const $storiesLoadingMsg = $("#stories-loading-msg");
const $allStoriesList = $("#all-stories-list");
const $addStoryForm = $("#add-story-form");

const $navLogin = $("#nav-login");
const $navUserProfile = $("#nav-user-profile");
const $navLogOut = $("#nav-logout");
let $myStoriesList = $("#myStoriesList");

/** To make it easier for individual components to show just themselves, this
 * is a useful function that hides pretty much everything on the page. After
 * calling this, individual components can re-show just what they want.
 */

function hidePageComponents() {
    const components = [
        $allStoriesList,
        $loginForm,
        $signupForm,
    ];
    components.forEach(c => c.hide());
}

/** Overall function to kick off the app. */

async function start() {
    console.debug("start");

    // "Remember logged-in user" and log in, if credentials in localStorage
    await checkForRememberedUser();
    await getAndShowStoriesOnStart();

    // if we got a logged-in user
    if (currentUser) updateUIOnUserLogin();
}

// Once the DOM is entirely loaded, begin the app

console.warn("HEY STUDENT: This program sends many debug messages to" +
    " the console. If you don't see the message 'start' below this, you're not" +
    " seeing those helpful debug messages. In your browser console, click on" +
    " menu 'Default Levels' and add Verbose");
$(start);


async function submitNewStory(evt) {
    evt.preventDefault();
    console.debug("submitNewStory", evt);

    // get the form data
    const author = $("#submit-author").val();
    const title = $("#submit-title").val();
    const url = $("#submit-url").val();

    const newStory = { title, author, url };

    await storyList.addStory(currentUser, newStory);

    /*Re-fetch and re-render stories, this includes the new one*/
    await fetchAndRenderStories();

    /*clear form*/
    $addStoryForm.trigger("reset");
}

async function fetchAndRenderStories() {
    /*fetch new list*/
    let newStories = await StoryList.getStories();
    /*remove loading message*/
    $storiesLoadingMsg.remove();

    /*clear current stories*/
    $allStoriesList.empty();

    /*loop through all stories and generate HTML for them*/
    for (let story of newStories.stories) {
        const $story = generateStoryMarkup(story);
        $allStoriesList.append($story);
    }

    $allStoriesList.show();
}

$addStoryForm.on("submit", submitNewStory);

$('body').on('click', '.delete-btn', async function(e) {
    /*get stories id*/
    const $tgt = $(e.target);
    const $closestLi = $tgt.closest("li");
    const storyId = $closestLi.attr("id");
    /*remove story*/
    await currentUser.deleteStory(storyId);
    /*remove story from DOM*/
    $closestLi.remove();
});

function navSubmitClick(evt) {
    console.debug("navSubmitClick", evt);
    hidePageComponents();
    $addStoryForm.show();
}
$body.on("click", "#nav-submit", navSubmitClick);