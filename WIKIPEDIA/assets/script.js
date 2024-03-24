let searchInputEl = document.getElementById('searchInput');
let searchResultDisplay = document.getElementById('searchResults');
let spinnerEl = document.getElementById('spinner');
let createAndAppendSeachResults = (result) => {
    // create result element
    let resultItemEl = document.createElement('div');
    resultItemEl.classList.add('result-item', 'col-12');

    // create result title
    let { link, title, description } = result;
    let titleEl = document.createElement('a');
    titleEl.href = link;
    titleEl.target = '_blank';
    titleEl.textContent = title;
    titleEl.classList.add('result-title');
    resultItemEl.appendChild(titleEl);

    // create break element 
    let titleBreakEl1 = document.createElement('br');
    resultItemEl.appendChild(titleBreakEl1);

    // create url element 
    let urlEl = document.createElement('a');
    urlEl.href = link;
    urlEl.target = '_blank';
    urlEl.classList.add('result-url');
    urlEl.textContent = link;
    resultItemEl.appendChild(urlEl);

    // create break element 
    let titleBreakEl2 = document.createElement('br');
    resultItemEl.appendChild(titleBreakEl2);

    // create description element
    let descriptionEl = document.createElement('p');
    descriptionEl.classList.add('link-description');
    descriptionEl.textContent = description;
    resultItemEl.appendChild(descriptionEl);
    // create line element 
    let lineEl = document.createElement('hr');
    resultItemEl.appendChild(lineEl);

    searchResultDisplay.appendChild(resultItemEl);
};

let displayResults = (searchResults) => {
    for (let result of searchResults) {
        createAndAppendSeachResults(result);
        spinnerEl.classList.add('d-none');
    };
};

let searchWikipedia = (event) => {
    if (event.key === "Enter") {
        searchResultDisplay.textContent = "";
        spinnerEl.classList.remove('d-none');
        let searchInputValEl = searchInputEl.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchInputValEl;
        let options = {
            method: "GET"
        }
        fetch(url, options)
            .then(function (response) {
                return response.json();
            })
            .then(function (jsonData) {
                let { search_results } = jsonData;
                displayResults(search_results);
            });
    }
};
searchInputEl.addEventListener('keydown', searchWikipedia);