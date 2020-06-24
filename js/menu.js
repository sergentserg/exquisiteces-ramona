window.addEventListener("load", async (e) => {
  const response = await fetch("./js/menu.json");
  const menuData = await response.json();

  const cartData = JSON.parse(localStorage.getItem("cartData"));
  if (cartData) {
    let totalItemQuantity = 0;
    cartData.forEach((cartItem) => (totalItemQuantity += cartItem.quantity));
    if (totalItemQuantity > 9) {
      document.querySelector("#cart-count").innerHTML = "9+";
    } else {
      document.querySelector("#cart-count").innerHTML = totalItemQuantity;
    }
  }

  let menuContent = "";
  menuData.forEach((item) => {
    // Check for the item's allergens.
    let allergensContent = "";
    if (item.vegan) {
      allergensContent = `
            <li class="px">
              <span class="vegan">
                <i class="fas fa-seedling"></i>
              </span>
            </li>
          `;
    }
    if (item.dairy) {
      allergensContent += `
            <li class="px">
              <span class="dairy">
                <i class="fas fa-blender"></i>
              </span>
            </li>
          `;
    }
    if (!item.gluten) {
      allergensContent += `
            <li class="px">
              <span class="gluten-free">
                GF
              </span>
            </li>
          `;
    }
    if (allergensContent) {
      allergensContent = `
        <div class="mb-1">
          <ul class="allergens">
            ${allergensContent}
          </ul>
        </div>`;
    }

    let added = false;
    if (cartData) {
      added = cartData.some((cartItem) => cartItem.name === item.name);
    }

    menuContent += `
    <div class="card">
      <a href="${item.credit}" rel="noopener" target="_blank">
        <img src="${item.image}" alt="${item.name}">
      </a>
      <div class="card-body p-1">
        <div class="card-description">
          <h3 class="fs-2 mb">${item.name}</h3>
          <p class="mb-1 text-grey">${item.description}</p>
          ${allergensContent}
          <h4 class="fs-2 mb">$${item.price}</h4>
        </div>
        <div class="card-nutrition">
          <h4 class="fs-2 mb">Calories:</h4>
        </div>
        <div class="item-buttons">
          <div class="btn-group">
            <button class="btn-outline-dark description-btn active">Description</button>
            <button class="btn-outline-dark nutrition-btn">Nutrition</button>
          </div>
          <div class="item-save"><i class="fas fa-${
            added ? "check" : "plus"
          }-circle"></i></div>     
        </div>
      </div>
    </div>
    `;
  });

  const menu = document.querySelector(".menu-items");
  menu.innerHTML = menuContent;

  document.querySelectorAll(".description-btn").forEach((btn) => {
    btn.addEventListener("click", showMenuInfo);
  });

  document.querySelectorAll(".nutrition-btn").forEach((btn) => {
    btn.addEventListener("click", showMenuInfo);
  });

  document.querySelectorAll(".item-save").forEach((btn) => {
    btn.addEventListener("click", saveItem);
  });
});

function showMenuInfo(e) {
  // Update active button
  if (!e.target.classList.contains("active")) {
    e.target.parentElement.querySelector(".active").classList.remove("active");
    e.target.classList.add("active");

    // Show description or nutrition info
    const desc = e.target.parentElement.parentElement.parentElement.querySelector(
      ".card-description"
    );
    const nutrition = e.target.parentElement.parentElement.parentElement.querySelector(
      ".card-nutrition"
    );

    if (desc.style.display == "block" || desc.style.display === "") {
      desc.style.display = "none";
      nutrition.style.display = "block";
    } else {
      desc.style.display = "block";
      nutrition.style.display = "none";
    }
  }
}

const saveItem = (e) => {
  if (e.target.classList.contains("fa-plus-circle")) {
    // Create the new item.
    const cardBody = e.target.parentElement.parentElement.parentElement;
    let newItem = {
      name: cardBody.querySelector(".card-description h3").innerHTML,
      image: cardBody.parentElement.querySelector("img").src,
      price: cardBody.querySelector(".card-description h4").innerHTML.slice(1),
      quantity: 1,
    };

    // Save the item to local storage.
    let cartData = localStorage.getItem("cartData");
    !cartData ? (cartData = []) : (cartData = JSON.parse(cartData));
    cartData.push(newItem);

    localStorage.setItem("cartData", JSON.stringify(cartData));

    // Update item-save in UI.
    e.target.parentElement.innerHTML = `<i class="fas fa-check-circle"></i>`;

    // Update cart count
    const cartCount = document.querySelector("#cart-count");
    if (cartCount.innerHTML === "9+" || cartCount.innerHTML == "9") {
      cartCount.innerHTML = "9+";
    } else {
      cartCount.innerHTML = parseInt(cartCount.innerHTML) + 1;
    }
  }
};
