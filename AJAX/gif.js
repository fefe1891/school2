console.log("Let's get this party started!");

$(document).ready(function(){
    $('#giphy-form').on('submit', function(e) {
        e.preventDefault();

        let searchTerm = $('#search').val();
        console.log("Search Term:", searchTerm);

        axios.get('http://api.giphy.com/v1/gifs/search', {
            params: {
                q: searchTerm,
                api_key: 'XM6MehoJ3dtX4Y4Il8xepDQz8nrrYUjD'
            }
        })
            .then(function (response) {
                console.log(response.data.data);
                let imageURL = response.data.data[0].images.fixed_height.url;
                $('#gif-area').append(`<div><img src="${imageURL}"><button class="remove-gif">Remove GIF</button></div>`);
            })
            .catch(function (error) {
                console.error(error);
            });
    });

    $('#gif-area').on('click', '.remove-gif', function() {
        $(this).parent().remove();
    });

    $('#remove-gifs').on('click', function(e) {
        $('#gif-area').empty();
    });
});