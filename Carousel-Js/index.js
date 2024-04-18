const slides = document.querySelectorAll('.slides img')
let slideIndex = 0;




const showSlide = (index) => {
    slides.forEach(slide => slide.classList.remove('displaySlide'))
    document.getElementById('text').innerText = `Image ${index + 1}`
    slides[index].classList.add('displaySlide')
}

document.addEventListener('DOMContentLoaded', showSlide(slideIndex))


document.querySelector('.next').addEventListener('click', () => {
    slideIndex++;
    if (slideIndex > slides.length - 1) slideIndex = 0;
    showSlide(slideIndex);
})

document.querySelector('.prev').addEventListener('click', () => {
    slideIndex--;
    if (slideIndex < 0) slideIndex = slides.length - 1;
    showSlide(slideIndex    )
})