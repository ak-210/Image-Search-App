var key = "RjdhsLCnDjRzH-YohEPCL9rrQ2z5KoqiR3VxMZwnX_s";

var form = document.querySelector("form");
var input = document.getElementById("searchInput");
var cont = document.getElementById("result-container");
var moreBtn = document.getElementById("more-btn");
var topBtn = document.getElementById("top");
var temp = ''

let page = 1;

function fillHTML(result){
    return( `
    <div class="card">
        <a href=${result.links.html} target="_blank">
            <img src=${result.urls.small} alt=${result.alt_description}>
            <span>${result.alt_description}</span>
        </a>
    </div>
    `)
}

async function showResults(value){
    const url = `https://api.unsplash.com/search/photos?query=${value}&page=${page}&orientation=landscape&client_id=${key}`;

    const res = await fetch(url)
    const data = await res.json()

    const results = data.results

    if (page === 1){
        cont.innerHTML = ''
    }
    var final_html = ''

    results.map((result) => {
        var html = fillHTML(result);
        final_html += html;
    })

    cont.innerHTML += final_html
    page++;
    moreBtn.style.scale = 1;
    topBtn.style.scale = 1;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (input.value != ''){
        temp = input.value;
        page = 1;
        showResults(input.value);
        form.reset();
        document.getElementById("hide").focus();
    };
});

moreBtn.addEventListener("click", () => {showResults(temp)});

async function randomPhoto(){
    const url = `https://api.unsplash.com/photos/random?count=3&orientation=landscape&client_id=${key}`;

    const res = await fetch(url)
    const results = await res.json()
    var final_html = ''

    results.map((result) => {
        var html = fillHTML(result)
        final_html += html;
    })

    cont.innerHTML += final_html
};
randomPhoto()

topBtn.onclick = ()=>{window.scrollTo(0, 0)}