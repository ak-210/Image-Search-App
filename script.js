var key = "RjdhsLCnDjRzH-YohEPCL9rrQ2z5KoqiR3VxMZwnX_s";

var form = document.querySelector("form");
var input = document.getElementById("searchInput");
var cont = document.getElementById("result-container");
var moreBtn = document.getElementById("more-btn");

let page = 1;

async function showResults(){
    const url = `https://api.unsplash.com/search/photos?query=${input.value}&page=${page}&client_id=${key}`;

    const res = await fetch(url)
    const data = await res.json()

    const results = data.results

    if (page === 1){
        cont.innerHTML = ''
    }
    var final_html = ''

    results.map((result) => {
        var html = `
        <div class="card">
            <a href=${result.links.html} target="_blank">
                <img src=${result.urls.small} alt=${result.alt_description}>
                <span>${result.alt_description}</span>
            </a>
        </div>
        `
        final_html += html;
    })

    cont.innerHTML += final_html
    page++;
    moreBtn.style.opacity = 1;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    showResults();
});

moreBtn.addEventListener("click", showResults);



