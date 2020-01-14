document.querySelectorAll('.description-btn').forEach(btn => {
  btn.addEventListener('click', showMenuInfo)
});

document.querySelectorAll('.nutrition-btn').forEach(btn => {
  btn.addEventListener('click', showMenuInfo)
});

window.addEventListener('scroll', toggleNav);

function toggleNav() {
  navbar = document.querySelector('nav');
  header = document.querySelector('header');
  if(window.scrollY > (header.clientHeight - navbar.clientHeight)) {
    navbar.classList.add('nav-stick');
  } else {
    navbar.classList.remove('nav-stick');
  }
}

function showMenuInfo(e) {
  // Update active button
  if (!(e.target.classList.contains('active'))) {
    oldActive = e.target.parentElement.querySelector('.active').classList.remove('active');
    e.target.classList.add('active');

    // Show description or nutrition info
    desc = e.target.parentElement.parentElement.querySelector('.card-description');
    nutrition = e.target.parentElement.parentElement.querySelector('.card-nutrition');

    if(desc.style.display == "block" || desc.style.display === "") {
      desc.style.display = "none";
      nutrition.style.display = "block";
    } else {
      desc.style.display = "block";
      nutrition.style.display = "none";
    }
  }
}