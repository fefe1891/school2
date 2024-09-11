"use strict";


$addStoryForm.on("submit", async function(evt) {
    evt.preventDefault();
    console.log("Form has been submitted!");
})

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

function generateStoryMarkup(story) {
    // console.debug("generateStoryMarkup", story);

    const hostName = story.getHostName();
    const isFavorite = currentUser ? currentUser.favorites.some(s => s.storyId === story.storyId) : false;
    const deleteBtn = currentUser && currentUser.username === story.username ? `<span class="delete-btn">(delete)</span>` : "";
    const editBtn = currentUser && currentUser.username === story.username ? `<span class="edit-btn">(edit)</span>` : "";
    return $(`
      <li id="${story.storyId}">
      ${isFavorite ? `<i class="fas fa-star"></i>` : `<i class="far fa-star"></i>`}
      ${deleteBtn}
      ${editBtn}
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
}

$('body').on('click', '.edit-btn', function(e) {
    console.log('edit button clicked');
    /*Get storyId from data attribute*/
    const storyId = $(this).closest("li").attr("id");
    console.log(`Story Id: ${storyId}`);
    /*Get current stories from storyList*/
    let story = storyList.stories.find(s => s.storyId === storyId);

    if (!story) {
        console.log(`No story found with id: ${storyId}`);
        return;
    }
    /*Simple prompt for edits*/
    story.title = prompt("Enter a new title:", story.title);
    story.author = prompt("Enter a new author:", story.author);
    story.url = prompt("Enter a new url:", story.url);

    $(this).siblings('.story-link').text(story.title);
});

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
    console.debug("putStoriesOnPage");

    $allStoriesList.empty();

    // loop through all of our stories and generate HTML for them
    for (let story of storyList.stories) {
        const $story = generateStoryMarkup(story);
        console.log($story);
        $allStoriesList.append($story);
        console.log($('#favorites-list').children().length);
        console.log($('#favorites-list').is(":visible"));
        console.log($('#favorites-section').is(":visible"));
    }

    $allStoriesList.show();
}

$('body').on('click', '.fa-star', async function(e) {
    console.log("Star clicked");

    const $tgt = $(e.target);
    const $closestLi = $tgt.closest("li");
    const storyId = $closestLi.attr("id");

    /*switch star appearance immediately*/
    $tgt.toggleClass("fas far");

    if ($tgt.hasClass("fas")) {
        /*story now favorited, call addFavorite*/
        try {
            console.log(`Attempting to add favorite story with id: ${storyId}`);
            await currentUser.addFavorite(storyId);
            console.log(`Successfully added favorite story with id: ${storyId}`);
        } catch (error) {
            console.error('Error adding favorite story:', error);
            /*If something went wrong, undo the UI update.*/
            $tgt.toggleClass("fas far");
        }
    } else {
        /*Item no longer favorited, call removeFavorite.*/
        try {
            console.log(`Attempting to remove favorite story with id: ${storyId}`);
            await currentUser.removeFavorite(storyId);
            console.log(`Successfully removed favorite story with id: ${storyId}`);
        } catch (error) {
            console.error('Error removing favorite story:', error);
            /*If something went wrong, undo the UI update.*/
            $tgt.toggleClass("fas far");
        }
    }
});

async function putFavoritesOnPage() {
    console.log("putFavoritesOnPage-entrance");
    console.log(currentUser.favorites);
    console.log(`${currentUser.favorites.length} favorites(s) to display.`);

    await checkForRememberedUser();
    hidePageComponents();

    $('#favorites-list').empty();

    if(Array.isArray(currentUser.favorites)) {
        console.log(`${currentUser.favorites.length} favorites(s) to display.`);
        /*loop through all user's favorite stories and generate HTML for them*/
        console.log($('#favorites-list'));
        for (let story of currentUser.favorites) {
            const $story = generateStoryMarkup(story);
            console.log($story);
            console.log($('#favorites-list'));
            $('#favorites-list').append($story);
        }
        console.log("Stories appended to the favorites list");

        $('#favorites-list').show();
        $('#favorites-section').removeClass('hidden');
        $('#favorites-section').show();
    } else {
        console.log("currentUser.favorites is not an array or doesn't exist");
    }
}

/*displays favorites when favorites link clicked*/
$(window).on('load', function() {
    console.log("Document is ready");
    $("#nav-favorites").on("click", function(e) {
        console.log("Favorites link clicked");
        putFavoritesOnPage();
    });
});
