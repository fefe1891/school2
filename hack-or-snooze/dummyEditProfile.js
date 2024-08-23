/*This file contains code portions that were intended to support the editing of user profiles in the web application.
However, due to restrictions on certain API request, the following code snippets were removed from the final application.*/

/*This function was designed to send a POST request to update user information. Unfortunately, these API requests were blocked.*/
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

/*This function and event listener were written to trigger profile updates upon form submission*/
/*async function updateProfile(evt) {
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

/*$("#edit-profile-form").on("submit", updateProfile);*/

/*This line of code was meant to displaying the updated version of user's profile.*/
/*$navUserProfile.text(`${currentUser.username}`).show();*/