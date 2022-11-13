const BASE_URL = "http://localhost:5000/api";

function cupcakeHTML(cupcake) {
  return `
    <div data-cupcake-id=${cupcake.id}>
      <li>
        ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
        <button class="delete-button">X</button>
      </li>
      <img class="Cupcake-img"
            src="${cupcake.image}"
            alt="(no image provided)">
    </div>
  `;
}

async function showCupcakes() {
  const response = await axios.get(`${BASE_URL}/cupcakes`);

  for (let cupcake of response.data.cupcakes) {
    let newCc = $(cupcakeHTML(cupcake));
    $("#list").append(newCc);
  }
}

$("#cupcake-form").on("submit", async function (evt) {
  evt.preventDefault();

  let flavor = $("#flavor").val();
  let rating = $("#rating").val();
  let size = $("#size").val();
  let image = $("#image").val();

  const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
    flavor: flavor,
    rating: rating,
    size: size,
    image: image,
  });

  let newCupcake = $(cupcakeHTML(newCupcakeResponse.data.cupcake));
  $("#list").append(newCupcake);
  $("#cupcake-form").trigger("reset");
});

$("#list").on("click", ".delete-button", async function (evt) {
  evt.preventDefault();
  let $cupcake = $(evt.target).closest("div");
  let cupcakeId = $cupcake.attr("data-cupcake-id");

  await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
  $cupcake.remove();
});

$(showCupcakes);
