"use strict";

// global to hold the User instance of the currently-logged-in user

const $loginForm = $("#login-form");
const $signupForm = $("#signup-form");
const $navLogout = $("#navLogout");

/******************************************************************************
 * User login/signup/login
 */

/** Handle login form submission. If login ok, sets up the user instance */

async function login(evt) {
    console.debug("login", evt);
    evt.preventDefault();

    // grab the username and password
    const username = $("#login-username").val();
    const password = $("#login-password").val();

    try {
        // User.login retrieves user info from API and returns User instance
        // which we'll make the globally-available, logged-in user.
        currentUser = await User.login(username, password);

        $loginForm.trigger("reset");

        saveUserCredentialsInLocalStorage();
        updateUIOnUserLogin();
    } catch (err) {
        // Handle incorrect login credential error here
        console.error("Failed to log in:", err);
        alert(`Failed to log in: ${err}`);
    }
}
$loginForm.on("submit", login);

async function signup(evt) {
    console.debug("signup", evt);
    evt.preventDefault();

    const name = $("#signup-name").val();
    const username = $("#signup-username").val();
    const password = $("#signup-password").val();

    try {
        // User.signup retrieves user info from API and returns User instance
        // which we'll make the globally-available, logged-in user.
        currentUser = await User.signup(username, password, name);

        saveUserCredentialsInLocalStorage();
        updateUIOnUserLogin();

        $signupForm.trigger("reset");
    } catch (err) {
        // Handle existing username error here
        console.error("Failed to sign up:", err);
        alert(`Failed to sign up: ${err}`);
    }
}
$signupForm.on("submit", signup);

async function checkForRememberedUser() {
    console.debug("checkForRememberedUser");
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if (!token || !username) return false;

    // try to log in with these credentials (will be null if login failed)
    currentUser = await User.loginViaStoredCredentials(token, username);
}

/*this is more code to update user profile that API is blocking
async function updateProfile(evt) {
    if (evt.type === "submit") {
        evt.preventDefault();
        const name = $("#edit-name").val();
        const password = $("#edit-password").val();

        try {
            currentUser.updateUser(name, password);
            console.log("Profile updated successfully!");
        } catch (err) {
            console.error('Failed to update profile:', err);
        }
    }
}*/

// Event listeners
$loginForm.on("submit", login);
$signupForm.on("submit", signup);
$navLogout.on("mousedown", logout);
/*commented out event listener for editing the profile*/
/*$("#edit-profile-form").on("submit", updateProfile);*/

/*async function testAddStory() {
    // Assume currentUser is your logged-in User instance.

    // Define a new story
    const newStory = {
        author: "Test Author",
        title: "Test Title",
        url: "http://testUrl.com"
    };

    // Get an instance of the StoryList class
    const storyList = await StoryList.getStories();

    // Add the new story
    const story = await storyList.addStory(currentUser, newStory);

    // Log the results
    console.log(story);
    console.log(story instanceof Story);  // This should log: true
}*/  /*only used for testing purposes*/


/** Handle click of logout button
 *
 * Remove their credentials from localStorage and refresh page
 */


    function logout(evt) {
        console.debug("logout", evt);
        console.log("Logout function called");
        localStorage.clear();
        location.reload();
    }

    $(document).ready(function() {
        var $navLogout = $("#nav-logout");

    $navLogout.on("mousedown", function(evt) {
        console.log('logout button pressed.');
        logout(evt); // Trigger the logout function
    });
});

/******************************************************************************
 * Storing/recalling previously-logged-in-user with localStorage
 */

/** If there are user credentials in local storage, use those to log in
 * that user. This is meant to be called on page load, just once.
 */


/** Sync current user information to localStorage.
 *
 * We store the username/token in localStorage so when the page is refreshed
 * (or the user revisits the site later), they will still be logged in.
 */

function saveUserCredentialsInLocalStorage() {
    console.debug("saveUserCredentialsInLocalStorage");
    if (currentUser) {
        localStorage.setItem("token", currentUser.loginToken);
        localStorage.setItem("username", currentUser.username);
    }
}

/******************************************************************************
 * General UI stuff about users
 */

/** When a user signs up or registers, we want to set up the UI for them:
 *
 * - show the stories list
 * - update nav bar options for logged-in user
 * - generate the user profile part of the page
 */

function updateUIOnUserLogin() {
    console.debug("updateUIOnUserLogin");

    $allStoriesList.show();

    updateNavOnLogin();
    /*testAddStory();*/
}

/*more code commented out for editing profile*/
/*$(document).ready(function() {
    /* Add event listener for showing and pre-filling the form */
    /*$('#user-profile-display').on('click', function () {
        // Fill fields with current user's details
        $("#edit-username").val(currentUser.username);
        $("#edit-name").val(currentUser.name);

        // Show the form
        $("#edit-profile-form").toggleClass('hidden');
    });
});*/
