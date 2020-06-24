// Element that displays subtotal.
const gSubTotal = document.getElementById("subtotal");
const gCartCount = document.getElementById("cart-count");

window.addEventListener("load", (e) => {
  const shoppingCart = document.getElementById("shopping-cart-items");

  // Retrieved saved items from local storage.
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  if (!cartData) {
    shoppingCart.innerHTML = "Your shopping cart is empty.";
    gSubTotal.parentElement.style.display = "none";
    document.getElementById("checkout-btn").style.display = "none";
    console.log(cartData);
    cartData = [];
    localStorage.setItem("cartData", JSON.stringify(cartData));
  } else {
    let cartContent = "";
    let cartCost = 0;
    gCartCount.innerHTML = "0";

    cartData.forEach((item) => {
      cartCost += item.price * item.quantity;
      gCartCount.innerHTML = parseInt(gCartCount.innerHTML) + item.quantity;
      cartContent += `
        <div class="cart-item">
          <div class="item-info">
            <div class="item-img">
              <img src="${item.image}" alt="${item.name}">
            </div>
            <p class="item-name p-3 text-bold fs-1">${item.name}</p>
          </div>
          <p class="item-price text-bold text-center">$${item.price}</p>
          <div class="item-quantity">
            <button class="btn-dark minus-btn">-</button>
            <input class="quantity-input" type="text" value="${
              item.quantity
            }" disabled>
            <button class="btn-dark plus-btn">+</button>
          </div>
          <p class="item-total text-bold text-center">$${
            item.price * item.quantity
          }</p>
          <span class="item-remove text-center"><i class="fas fa-times"></i></span>
        </div>
      `;
    });

    if (parseInt(gCartCount.innerHTML) > 9) {
      gCartCount.innerHTML = "9+";
    }
    // Render the cart items.
    shoppingCart.innerHTML = cartContent;

    // Update subtotal.
    gSubTotal.parentElement.style.display = "block";
    gSubTotal.innerHTML = cartCost.toFixed(2);
    document.getElementById("checkout-btn").style.display = "block";

    // Add event listeners for buttons.
    document.querySelectorAll(".minus-btn").forEach((minusBtn) => {
      minusBtn.addEventListener("click", changeQuantity);
    });

    document.querySelectorAll(".plus-btn").forEach((minusBtn) => {
      minusBtn.addEventListener("click", changeQuantity);
    });

    document.querySelectorAll(".item-remove i").forEach((removeIcon) => {
      removeIcon.addEventListener("click", removeItem);
    });

    document
      .querySelector("#checkout-btn")
      .addEventListener("click", checkoutSubmit);
  }
});

const changeQuantity = (e) => {
  const cartItem = e.target.parentElement.parentElement;

  let sign;

  e.target.classList.contains("minus-btn") ? (sign = -1) : (sign = 1);

  // Increase item quantity
  quantityInput = cartItem.querySelector(".quantity-input");
  if (parseInt(quantityInput.value) + 1 * sign >= 1) {
    // Increase quantity in UI.
    quantityInput.value = parseInt(quantityInput.value) + 1 * sign;
    console.log(quantityInput);
    const itemPrice = parseFloat(
      cartItem.querySelector(".item-price").innerHTML.slice(1)
    );

    // Increase quantity in local storage
    let cartData = JSON.parse(localStorage.getItem("cartData"));
    console.log(cartData);
    cartData.forEach((item) => {
      if (item.name === cartItem.querySelector(".item-name").innerHTML) {
        item.quantity = parseInt(quantityInput.value);
      }
    });
    localStorage.setItem("cartData", JSON.stringify(cartData));

    console.log(itemPrice * sign);
    // Increase item total and subtotal.
    const itemTotal = cartItem.querySelector(".item-total");
    itemTotal.innerHTML = `$${(
      parseFloat(itemTotal.innerHTML.slice(1)) +
      itemPrice * sign
    ).toFixed(2)}`;

    gSubTotal.innerHTML = (
      parseFloat(gSubTotal.innerHTML) +
      itemPrice * sign
    ).toFixed(2);

    // Increase cart count
    gCartCount.innerHTML = parseInt(gCartCount.innerHTML) + sign;
  } else {
    // display an alert.
  }
};

const removeItem = (e) => {
  const cartItem = e.target.parentElement.parentElement;
  const itemTotal = parseFloat(
    cartItem.querySelector(".item-total").innerHTML.slice(1)
  );

  // Update cart subtotal.
  gSubTotal.innerHTML = (parseFloat(gSubTotal.innerHTML) - itemTotal).toFixed(
    2
  );
  // Reduce item count.
  let cartData = JSON.parse(localStorage.getItem("cartData"));
  const itemQuantity = cartItem.querySelector(".quantity-input").value;

  let numItems = 0;
  cartData.forEach((item) => (numItems += item.quantity));
  if (numItems > 9) {
    gCartCount.innerHTML = "9+";
  } else {
    gCartCount.innerHTML = numItems - 1;
  }

  // Update subtotal.
  if (!parseFloat(gSubTotal.innerHTML)) {
    document.querySelector("#shopping-cart-items").innerHTML =
      "Your shopping cart is empty.";
    gSubTotal.parentElement.style.display = "none";
    document.querySelector("#checkout-btn").style.display = "none";
    localStorage.removeItem("cartData");
  } else {
    // Remove item from local storage.
    cartData = cartData.filter(
      (item) => item.name !== cartItem.querySelector(".item-name").innerHTML
    );
    localStorage.setItem("cartData", JSON.stringify(cartData));
  }

  // Remove item from UI.
  cartItem.remove();
};

const checkoutSubmit = (e) => {};
