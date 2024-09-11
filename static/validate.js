document.querySelector('form').addEventListener('submit', function(event) {
    let inputs = document.querySelectorAll('input[type=text]');
    inputs.forEach(input => {
        if (input.value.length < 3 || input.value !== input.value.toLowerCase()) {
            event.preventDefault();
            alert('Please ensure all answers are at least 3 characters long and all lowercase');
        }
    });
});