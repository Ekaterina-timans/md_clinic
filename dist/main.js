document.addEventListener('DOMContentLoaded', function() {
    const input = document.querySelector('.catalog__input');

    input.addEventListener('input', function(e) {
        let value = this.value.replace(/\D/g, '');

        if (value.length > 11) {
            value = value.slice(0, 11);
        }

        let formattedValue = '+7 ';
        if (value.length > 1) {
            formattedValue += '(' + value.slice(1, 4);
            if (value.length >= 5) {
                formattedValue += ') ' + value.slice(4, 7);
                if (value.length >= 8) {
                    formattedValue += '-' + value.slice(7, 9);
                    if (value.length >= 10) {
                        formattedValue += '-' + value.slice(9, 11);
                    }
                }
            }
        }

        this.value = formattedValue;
    });

    input.addEventListener('focus', function() {
        this.value = this.value.replace(/[^+\d() -]/g, '');
    });
})

document.addEventListener('DOMContentLoaded', function() {
    const container = document.querySelector('.stocks__container');
    const cards = Array.from(document.querySelectorAll('.stocks__card'));
    const pagination = document.querySelector('.stocks__pagination');
    let currentIndex = 0;

    function updateCards() {
        cards.forEach((card, index) => {
            card.classList.toggle('hidden', index !== currentIndex);
        });

        const dots = pagination.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function createPagination() {
        for (let i = 0; i < cards.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCards();
            });
            pagination.appendChild(dot);
        }
    }

    let startX;
    let isDragging = false;

    container.addEventListener('mousedown', (e) => {
        startX = e.pageX;
        isDragging = true;
    });

    container.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diffX = e.pageX - startX;

        if (diffX > 100) {
            if (currentIndex > 0) {
                currentIndex--;
                updateCards();
            }
            isDragging = false;
        } else if (diffX < -100) {
            if (currentIndex < cards.length - 1) {
                currentIndex++;
                updateCards();
            }
            isDragging = false;
        }
    });

    container.addEventListener('mouseup', () => {
        isDragging = false;
    });

    container.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    createPagination();
    updateCards();
})

document.addEventListener('DOMContentLoaded', function() {
    const btnLeft = document.querySelector('.gallery__btn-left');
    const btnRight = document.querySelector('.gallery__btn-right');
    const sliders = document.querySelector('.gallery__sliders');
    const images = Array.from(sliders.querySelectorAll('img'));
    const pagination = document.querySelector('.gallery__pagination');
    
    let currentIndex = 0;

    function updateCarousel() {
        images.forEach((img, index) => {
            img.classList.toggle('hidden', index !== currentIndex);
        });
        btnLeft.disabled = currentIndex === 0;
        btnRight.disabled = currentIndex === images.length - 1;

        const dots = pagination.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    function createPagination() {
        for (let i = 0; i < images.length; i++) {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateCarousel();
            });
            pagination.appendChild(dot);
        }
    }

    btnLeft.addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel();
        }
    });

    btnRight.addEventListener('click', function() {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateCarousel();
        }
    });

    let startX;
    let isDragging = false;

    sliders.addEventListener('mousedown', (e) => {
        startX = e.pageX;
        isDragging = true;
    });

    sliders.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        const diffX = e.pageX - startX;

        if (diffX > 100) {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarousel();
            }
            isDragging = false;
        } else if (diffX < -100) {
            if (currentIndex < images.length - 1) {
                currentIndex++;
                updateCarousel();
            }
            isDragging = false;
        }
    });

    sliders.addEventListener('mouseup', () => {
        isDragging = false;
    });

    sliders.addEventListener('mouseleave', () => {
        isDragging = false;
    });

    createPagination();
    updateCarousel();
});

document.addEventListener('DOMContentLoaded', () => {
    const reviewsContainer = document.querySelector('.reviews__container');
    const reviewsImages = document.querySelector('.reviews__image');
    const reviewsImagesContainer = document.querySelector('.reviews__images-container');
    const button = document.querySelector('.reviews__btn');
    const paginationContainer = document.querySelector('.reviews__pagination');
    const slides = Array.from(document.querySelectorAll('.reviews__slide'));
    const totalSlides = slides.length;
    let currentIndex = 0;

    function updateSlides() {
        const currentSlide = slides[currentIndex];
        reviewsContainer.querySelectorAll('.reviews__slide').forEach(slide => {
            slide.style.display = 'none';
        });
        currentSlide.style.display = 'flex';

        const nextIndex = (currentIndex + 1) % totalSlides;
        const nextSlide = slides[nextIndex];
        const mainImage = nextSlide.querySelector('.reviews__main').cloneNode(true);
        const galleryImages = Array.from(nextSlide.querySelectorAll('.reviews__gallery img')).slice(0, 2);

        reviewsImages.innerHTML = '';
        reviewsImagesContainer.innerHTML = '';

        reviewsImages.appendChild(mainImage);

        galleryImages.forEach(img => {
            const clone = img.cloneNode(true);
            reviewsImagesContainer.appendChild(clone);
        });

        updatePagination();
    }

    button.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlides();
    });

    function createPagination() {
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.className = 'dot';
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlides();
            });
            paginationContainer.appendChild(dot);
        });
    }

    function updatePagination() {
        const dots = paginationContainer.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[currentIndex].classList.add('active');
    }

    createPagination();
    updateSlides();
});