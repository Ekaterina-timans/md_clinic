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