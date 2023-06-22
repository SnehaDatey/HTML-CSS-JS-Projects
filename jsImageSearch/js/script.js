/* Goto unsplash.com -> create an account ->  on top right find menu Product -> 
Developers/API -> Your apps -> New Application  -> allow all check boxes -> create application name and desc ->
find accessKey 

*/

const accessKey = "uTHrbJMz4Dd9LGx04eehE27FhekQ4nmlSAHBJmbz3Ts";
const formEl = document.querySelector("form");
const inputEl = document.getElementById("search-image");
const searchRes = document.getElementsByClassName(".search-results-row");
const showMore = document.getElementById("show-more-btn");

let inputData = "";
let page = 1;


async function searchImages() {
    inputData = inputEl.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

    const response = await fetch(url);
    const data = await response.json();

    const results  = data.results;

    if(page === 1){
        searchRes.innerHTML = "";

    }

    results.map((result)=>{
        const imageWrapper = document.createElement('div');
              imageWrapper.classList.add("search-result-cols");
        const imageContainer = document.createElement('img');
              imageContainer.src = result.urls.small;
              imageContainer.alt = result.alt_desc;
        const imageLink = document.createElement('a');
              imageLink.href = result.links.html;
              imageLink.target = "_blank";
              imageLink.textContent = result.alt_desc;

        imageWrapper.appendChild(imageContainer);
        imageWrapper.appendChild(imageLink);
        imageWrapper.appendChild(imageWrapper);
    });

    page++
    if (page > 1){
        showMore.style.display = "block";
    }
}

formEl.addEventListener("submit", (event)=> {
    event.preventDefault();
    page = 1;
    searchImages();
})


formEl.addEventListener("click", (event)=> {
    searchImages();
})

