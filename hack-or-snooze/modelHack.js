"use strict";

const BASE_URL = "https://hack-or-snooze-v3.herokuapp.com";
let currentUser = null;

/******************************************************************************
 * Story: a single story in the system
 */

class Story {

    /** Make instance of Story from data object about story:
     *   - {title, author, url, username, storyId, createdAt}
     */

    constructor({ storyId, title, author, url, username, createdAt }) {
        this.storyId = storyId;
        this.title = title;
        this.author = author;
        this.url = url;
        this.username = username;
        this.createdAt = createdAt;

        console.log('Story Id: ', this.storyId);
    }

    /** Parses hostname out of URL and returns it. */

    getHostName() {
        /*parse the hostname from URL*/
        const hostname = new URL(this.url).hostname;
        return "hostname.com";
    }
}


/******************************************************************************
 * List of Story instances: used by UI to show story lists in DOM.
 */

class StoryList {
    constructor(stories) {
        this.stories = stories;
    }

    /** Generate a new StoryList. It:
     *
     *  - calls the API
     *  - builds an array of Story instances
     *  - makes a single StoryList instance out of that
     *  - returns the StoryList instance.
     */

    static async getStories() {
        // Note presence of `static` keyword: this indicates that getStories is
        //  **not** an instance method. Rather, it is a method that is called on the
        //  class directly. Why doesn't it make sense for getStories to be an
        //  instance method?

        // query the /stories endpoint (no auth required)
        const response = await axios({
            url: `${BASE_URL}/stories`,
            method: "GET",
        });

        // turn plain old story objects from API into instances of Story class
        const stories = response.data.stories.map(story => new Story(story));

        // build an instance of our own class using the new array of stories
        return new StoryList(stories);
    }

    /** Adds story data to API, makes a Story instance, adds it to story list.
     * - user - the current instance of User who will post the story
     * - obj of {title, author, url}
     *
     * Returns the new Story instance
     */

    async addStory(  user, newStory ) {
        const response = await axios({
            url: `${BASE_URL}/stories`,
            method: "POST", data: {
                token: user.loginToken,
                story: newStory
            }
        });
        /*build new story*/
        const story = new Story(response.data.story);
        this.stories.unshift(story); /*not sure why I added*/

        user.ownStories.unshift(story);/*Add new story to start of user's own story list*/
        console.log('User Stories after add: ', user.ownStories);

        return story;
    }
}


/******************************************************************************
 * User: a user in the system (only used to represent the current user)
 */

class User {
    /** Make user instance from obj of user data and a token:
     *   - {username, name, createdAt, favorites[], ownStories[]}
     *   - token
     */

    constructor({
                    username,
                    name,
                    createdAt,
                    favorites = [],
                    ownStories = []
                },
                token) {
        this.username = username;
        this.name = name;
        this.createdAt = createdAt;

        // instantiate Story instances for the user's favorites and ownStories
        this.favorites = favorites.map(s => new Story(s));
        this.ownStories = ownStories.map(s => new Story(s));

        // store the login token on the user so it's easy to find for API calls.
        this.loginToken = token;
    }

    async deleteStory(storyId) {
        /*delete request to API*/
        let result = await axios({
            url: `${BASE_URL}/stories/${storyId}`, method: "DELETE", data: {token: this.loginToken}
        });
        /*filter removed story out of user's own stories*/
        this.ownStories = this.ownStories.filter((s) => s.storyId !== storyId);
        return result;
    }


    /** Register new user in API, make User instance & return it.
     *
     * - username: a new username
     * - password: a new password
     * - name: the user's full name
     */

    static async signup(username, password, name) {
        const response = await axios({
            url: `${BASE_URL}/signup`,
            method: "POST",
            data: {user: {username, password, name}},
        });

        let {user} = response.data

        return new User(
            {
                username: user.username,
                name: user.name,
                createdAt: user.createdAt,
                favorites: user.favorites,
                ownStories: user.stories
            },
            response.data.token
        );
    }

    /** Login in user with API, make User instance & return it.

     * - username: an existing user's username
     * - password: an existing user's password
     */

    static async login(username, password) {
        const response = await axios({
            url: `${BASE_URL}/login`,
            method: "POST",
            data: {user: {username, password}},
        });

        let {user} = response.data;

        return new User(
            {
                username: user.username,
                name: user.name,
                createdAt: user.createdAt,
                favorites: user.favorites,
                ownStories: user.stories
            },
            response.data.token
        );
    }

    /** When we already have credentials (token & username) for a user,
     *   we can log them in automatically. This function does that.
     */

    static async loginViaStoredCredentials(token, username) {
        try {
            const response = await axios({
                url: `${BASE_URL}/users/${username}`,
                method: "GET",
                params: {token},
            });

            let {user} = response.data;

            return new User(
                {
                    username: user.username,
                    name: user.name,
                    createdAt: user.createdAt,
                    favorites: user.favorites,
                    ownStories: user.stories
                },
                token
            );
        } catch (err) {
            console.error("loginViaStoredCredentials failed", err);
            return null;
        }
    }

    /*This is comment out as it is code to change the users profile but API blocked my requests*/
   /* async updateUser(name, password) {
        const response = await fetch(`https://hack-or-snooze-v3.herokuapp.com/users/${this.username}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: this.loginToken,
                user: {name, password}
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        } else {
            const data = await response.json();
            this.name = data.user.name;
            this.password = data.user.password;
        }
    }*/

    async addFavorite(storyId) {
        await axios({
            url: `${BASE_URL}/users/${this.username}/favorites/${storyId}`,
            method: "POST",
            data: {token: this.loginToken}
        });

        const newFavoriteStory = storyList.stories.find(story => story.storyId === storyId);
        this.favorites.push(newFavoriteStory);

        console.log("Story added to favorites: ", newFavoriteStory);
    }

    async removeFavorite(storyId) {
        await axios({
            url: `${BASE_URL}/users/${this.username}/favorites/${storyId}`,
            method: "DELETE", data: {token: this.loginToken}
        });

        this.favorites = this.favorites.filter(story => story.storyId !== storyId);

        console.log("Story removed from favorites: ", storyId);
    }
}


$(function() {
    async function checkLoginStatus() {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('username');

        if (username && token) {
            currentUser = await User.loginViaStoredCredentials(token, username);
        }
    }

    /*check users login status*/
    checkLoginStatus();

    /*handle form submission*/
    $("edit-profile-form").on("submit", function(evt) {
        evt.preventDefault();

        const username = $("#edit-username").val();
        const name = $("#edit-name").val();
        const password = $("#edit-password").val();

        currentUser.updateUser(name, password).then(() => {
            alert("Profile updated successfully!");
        })
            .catch(error => {
                alert("Failed to update profile. Please try again.");
                console.error("Failed to update profile", error);
            });
    });
});





