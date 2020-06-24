window.addEventListener("scroll", toggleNav);
document.querySelector("#hamburger").addEventListener("click", (e) => {
  const navMenu = document.querySelector(".nav-container ul");

  // if (navMenu.classList.contains("max-height-0")) {
  //   navMenu.classList.remove("max-height-0");
  //   navMenu.classList.add("max-height-1000");
  // } else {
  //   navMenu.classList.add("max-height-0");
  //   navMenu.classList.remove("max-height-1000");
  // }

  if (navMenu.style.maxHeight === "1000px") {
    navMenu.style.maxHeight = "0px";
  } else {
    navMenu.style.maxHeight = "1000px";
  }
});

function toggleNav() {
  const navbar = document.querySelector("nav");
  const header = document.querySelector("header");
  if (window.scrollY > header.clientHeight - navbar.clientHeight) {
    navbar.classList.add("nav-stick");
  } else {
    navbar.classList.remove("nav-stick");
  }
}

const cartData = JSON.parse(localStorage.getItem("cartData"));
if (cartData) {
  let totalItemQuantity = 0;
  cartData.forEach((cartItem) => (totalItemQuantity += cartItem.quantity));
  document.querySelector("#cart-count").innerHTML = totalItemQuantity;
}
