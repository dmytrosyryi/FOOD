function slider () {
    // SLIDERS

  const slides = document.querySelectorAll(".offer__slide"),
  slider = document.querySelector(".offer__slider"),
  prev = document.querySelector(".offer__slider-prev"),
  next = document.querySelector(".offer__slider-next"),
  total = document.querySelector("#total"),
  current = document.querySelector("#current"),
  slidesWrapper = document.querySelector(".offer__slider-wrapper"),
  slidesField = document.querySelector(".offer__slider-inner"),
  width = window.getComputedStyle(slidesWrapper).width;

let slideIndex = 1;
let offset = 0;

if (slides.length < 10) {
  total.textContent = `0${slides.length}`;
  current.textContent = `0${slideIndex}`;
} else {
  total.textContent = slides.length;
  current.textContent = slideIndex;
}

slidesField.style.width = 100 * slides.length + "%";
slidesField.style.display = "flex";
slidesField.style.transition = "0.5s all";
slidesWrapper.style.overflow = "hidden";

slides.forEach((slide) => {
  slide.style.width = width;
});

slider.style.position = "relative";
const indicators = document.createElement("ol"),
      dots = [];
indicators.classList.add("carousel-inicators");
indicators.style.cssText = `
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 15;
    display: flex;
    justify-content: center;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;
  `;
slider.append(indicators);

for (let i = 0; i < slides.length; i++) {
  const dot = document.createElement("li");
  dot.setAttribute("data-slide-to", i + 1);
  dot.style.cssText = `
    box-sizing: content-box;
    flex: 0 1 auto;
    width: 30px;
    height: 6px;
    margin-right: 3px;
    margin-left: 3px;
    cursor: pointer;
    background-color: #fff;
    background-clip: padding-box;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    opacity: .5;
    transition: opacity .6s ease;
    `;
  indicators.append(dot);
  if (i == 0) {
    dot.style.opacity = 1;
  }
  dots.push(dot);
}

function dotsChange() {
  dots.forEach((dot) => (dot.style.opacity = ".5"));
  dots[slideIndex - 1].style.opacity = 1;
}

function slidePlusZero() {
  if (slides.length < 10) {
    current.textContent = `0${slideIndex}`;
  } else {
    current.textContent = slideIndex;
  }
}

function slideMove() {
  slidesField.style.transform = `translateX(-${offset}px)`;
}

function deleteNoDigits(str){
  return +str.replace(/\D/g, '')
}

next.addEventListener("click", () => {
  if (offset ==  deleteNoDigits(width) * (slides.length - 1)) {
    offset = 0;
  } else {
    offset +=  deleteNoDigits(width);
  }

  slideMove();

  if (slideIndex == slides.length) {
    slideIndex = 1;
  } else {
    slideIndex++;
  }

  slidePlusZero();
  dotsChange();
});



prev.addEventListener("click", () => {
  if (offset == 0) {
    offset = deleteNoDigits(width) * (slides.length - 1);
  } else {
    offset -= deleteNoDigits(width);
  }

  slideMove();

  if (slideIndex == 1) {
    slideIndex = slides.length;
  } else {
    slideIndex--;
  }

  slidePlusZero();
  dotsChange();
});

dots.forEach((dot) => {
  dot.addEventListener("click", (e) => {
    const slideTo = e.target.getAttribute("data-slide-to");

    slideIndex = slideTo;
    offset = deleteNoDigits(width) * (slideTo - 1);

    slideMove();
    slidePlusZero();
    dotsChange();
  });
});

// showSlides(slideIndex);

// if(slides.length < 10){
//   total.textContent = `0${slides.length}`;
// } else {
//   total.textContent = slides.length;
// }

// function showSlides(n){
//   if (n > slides.length){
//     slideIndex = 1;
//   }
//   if (n < 1){
//     slideIndex = slides.length;
//   }
// slides.forEach(item => item.style.display = 'none');
// slides[slideIndex - 1].style.display = 'block';

// if(slides.length < 10){
//   current.textContent = `0${slideIndex}`;
// } else {
//   current.textContent = slideIndex;
// }
// }

// function plusSlides(n){
//   showSlides(slideIndex += n);
// }

// prev.addEventListener('click', () =>{
//   plusSlides(-1);
// });
// next.addEventListener('click', () =>{
//   plusSlides(1);
// });
}
module.exports = slider;