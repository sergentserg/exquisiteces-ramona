const IMAGE_TIMER = 5000
setInterval(slideImage, IMAGE_TIMER);

// Carousel div
const carouselImages = Array.from(document.querySelector('.carousel').children);

// First image
let currentIndex = carouselImages.indexOf(document.querySelector('carousel-current'));

const SLIDE_DURATION = 1000;

function slideImage() {
  let currentImage = carouselImages[currentIndex];
  currentIndex = (currentIndex + 1) % carouselImages.length;
  let nextImage = carouselImages[currentIndex];

  // Slide out
  currentImage.animate([
    {left: 0},
    {left: '-100%'}
  ],{
  duration: SLIDE_DURATION,
  easing: 'ease-in'
  });

  // Slide in
  nextImage.animate([
    {left: '100%'},
    {left: 0}
  ],{
  duration: SLIDE_DURATION,
  easing: 'ease-out'
  });

  currentImage.classList.remove('carousel-current');
  nextImage.classList.add('carousel-current');
}
