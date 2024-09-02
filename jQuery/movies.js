let movies = [];

$('#movieForm').on('submit', function(event) {
    // Prevent the form from submitting as per normal browser behaviour
    event.preventDefault();

    // Capture the values from the form
    var title = $('#title').val();
    var rating = $('#rating').val();

    if (rating < 0 || rating > 10) {
        console.log('Invalid rating, it should be between 0 and 10');
        return;
    }

    if (title.length < 2) {
        console.log('Invalid title, it should be at least 2 characters long');
        return;
    }

    // Clear the form fields for the next entry
    $('#title').val('');
    $('#rating').val('');

    movies.push({title: title, rating: rating});

    displayMovies();
});

function displayMovies() {
    $('.movie-entry').remove();

    for (let movie of movies) {
        var movieEntry = `<p class="movie-entry">${movie.title} (Rating: ${movie.rating})
                <button class="delete-button">Delete</button></p>`;
        $('#movieList').append(movieEntry);
    }
}

$(document).on('click', '.delete-button', function(event) {
    let movieEntry = $(this).closest('.movie-entry');

    // Remove the clicked movie from our movies array
    let movieTitle = movieEntry.contents().get(0).nodeValue.trim();
    movies = movies.filter(movie => movie.title !== movieTitle);

    // Refresh our movie list display
    displayMovies();

    console.log('A movie entry has been removed from the DOM');
});

$('#sortTitle').on('click', function() {
    movies.sort((a, b) => a.title.localeCompare(b.title));
    displayMovies();
});

$('#sortRatingAsc').on('click', function() {
    movies.sort((a, b) => Number(a.rating) - Number(b.rating));
    displayMovies();
});

$('#sortRatingDesc').on('click', function() {
    movies.sort((a, b) => Number(b.rating) - Number(a.rating));
    displayMovies();
});



