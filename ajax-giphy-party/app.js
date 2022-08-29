const key = "kjxug64iuduZyzxyPCpeMlRCNVmXuqFH";

// Uses axios to search through giphy with the provided search term
async function searchGiphy(searchTerm, key) {
  const gif = await axios.get("http://api.giphy.com/v1/gifs/search", {
    params: { api_key: key, q: searchTerm },
  });
  console.log(gif);
  // Call add gif here so that we can async await it so it runs properly
  addGif(gif);
}

// Variables to contain the HTML elements in the submit form
const submitBtn = document.querySelector("button");
const search = document.querySelector("#search");
const body = document.querySelector("#imgContainer");
const removeBtn = document.querySelector("#remove");

// Add event listener to the submit button
submitBtn.addEventListener("click", function (e) {
  // Stop default behavior
  e.preventDefault();
  // Get value in search box
  let searchTerm = search.value;
  // Pass this to the searchGiphy method and add it to the document
  searchGiphy(searchTerm, key);
  // Reset the search box back to blank
  search.value = "";
});

// Function to append the gifs we get from the API to the HTML page
function addGif(gifData) {
  // Get gif out of the JSON
  let gif = gifData.data.data[0].images.original.url;
  // Create HTML elements to put the gifs in
  let img = document.createElement("img");
  // Set the img to the source of the gif iamge
  img.setAttribute("src", gif);
  // Append the div to the body
  body.append(img);
}

// Event listener to remove all the gifs on the page
removeBtn.addEventListener("click", function (e) {
  body.innerHTML = "";
});
