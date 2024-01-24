/* Fetching images upon search from the unsplash API */
/* Accesskey variable to store the key */
const accessKey = "98AGLZ6vWR34pZmdZfwovaaABvN0g7ZQsbYWS8RXrvM"

/* Importing important elements from HTML stored in this js file as variables, input form, search bar input, search, images, show more button */

const formEl = document.querySelector("form") /* storing the form section */
const inputEl = document.getElementById("search-input") /* id name, storing the input sec */
const searchResults = document.querySelector(".search-results") /* store images, etc. section, if using a CLASS name (not id) in querySelector, must put a . first */
const showMore = document.getElementById("show-more-button") /* Store the value of the show more button */

/* Working on the variables */
let inputData = "" /* Store the keywords that the user is typing/inputting into the search bar */
let page = 1; /* Default page # is 1, If a user clicks on the show more button, then the page number will be increased */

async function searchImages(){ /* async because response and fetch are used */
    inputData = inputEl.value; /* Input section is stores in the inputEl */
    /* URL below will fetch images from the unsplash API depending on what the user types after they press enter or click search */
    /* With a dynamic URL/variable */
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`
    /* We want the page # to be the first page so we initalize the page # with the page variable ${} gets info from line 14, `` and ${} for dynamic var inside url, &query = keyword/search for what the user typed in */
    /*  After inputid, use api, client_id also dynamic, get client id from accessKey */

    /* Fetch images based on the user query */
    const response = await fetch(url)
    /* Get data which is in response variable above, and convert it into JSON format */
    const data = await response.json()

    /*  Data is now holding the json format data, next convert it into the images and text, by storing json conversion into results var below  */
    const results = data.results /* all image data/results from data var are now in this results var */

    /* Initialize page #, if page # is 1 then the searchResults will be the 3 default images for the home page */
    if(page === 1){
        searchResults.innerHTML = ""
    }

    /* Pushing/mapping data from user search into searchResults temp, display new images from search w prebuilt template from html file, the home pg image boxes are the template */
    /* Creating var's from the SEARCH-RESULT DIV to push into the html template */
    /* Line 20-22 in html */
    results.map((result) => {
        /* Container for the images, creating the search-result div with all of its elements */
        const imageWrapper = document.createElement("div")
        /* Pushing the class name from the div in html */
        imageWrapper.classList.add("search-result")
        /* img inside the search-result class, creating the img ele */
        const image = document.createElement("img")
        /* img src and alt data, creating src and alt attributes */
        image.src = result.urls.small /* small is for the thumbnail size */
        image.alt = result.alt_description
        /* a tag */
        const imageLink = document.createElement("a")
        /* href and target */
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        /* Push the image name text */
        imageLink.textContent = result.alt_description

        /* append images to HTML page */
        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)
        searchResults.appendChild(imageWrapper)
    });

    /* Increase page # after showing first phrase of images */
    page++
    /* If image query has more than one page of results, show the show more button */
    if(page > 1){
        showMore.style.display = "block" /* Because display is auto none in style.css, change it to show the button if the query results is more than one page */
    }
}

/* Event listener to take the keyword the user has searched and run the above function */
/* Ev listener name is submit, event listener will pass the event, initialize page 1 */
formEl.addEventListener("submit", (event) =>{
    event.preventDefault() /* prevents default submit button / link behavior, used for adding custom functionality or handle certain actions differently */
    page = 1;
    /* Calling the searchImages function, line 16 */
    searchImages()
})

/* Call searchImages function again for the show more button */
showMore.addEventListener("click", () =>{
    /* Calling the searchImages function, line 16 */
    searchImages()
})