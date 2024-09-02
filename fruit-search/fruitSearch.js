const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');
const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];

function search(str) {
    let results = [];

    for (let i = 0; i < fruit.length; i++) {
        if (fruit[i].toLowerCase().includes(str.toLowerCase())) {
            results.push(fruit[i]);
        }
    }

    return results;
}

/*function searchHandler(e) { comment out since showSuggestions serves same purpose
    let inputVal = e.target.value;
    suggestions.innerHTML = '';

    if (inputVal.length > 0) {
        let results = search(inputVal);

        results.forEach(item => {
            let listItem = document.createElement('li');
            listItem.textContent = item;
            suggestions.appendChild(listItem);
        });
    }
}*/

function showSuggestions(e) {
    let inputVal = e.target.value;
    suggestions.innerHTML = '';

    if(inputVal.length > 0) {
        let results = search(inputVal);
        results.forEach(item => {
            let listItem = document.createElement('li');
            listItem.textContent = item;
            suggestions.appendChild(listItem);
        });
    }
}

function useSuggestion(e) {
    if (e.target.tagName === 'LI') {
        input.value = e.target.textContent;
        suggestions.innerHTML = '';
    }
}

input.addEventListener('input', showSuggestions);
suggestions.addEventListener('click', useSuggestion);

suggestions.addEventListener('mouseover', function(event) {
    if(event.target.tagName === 'LI') {
        event.target.style.backgroundColor = 'lightgray';
    }
});

suggestions.addEventListener('mouseout', function(event) {
    if(event.target.tagName === 'LI') {
        event.target.style.backgroundColor = '';
    }
});
