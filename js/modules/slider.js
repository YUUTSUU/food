function slider({sliderSelector, slidesSelector, prevSelector, nextSelector,
    totalSelector, currentSelector, wrapperSelector, innerSelector}) {

    const slider = document.querySelector(sliderSelector),
        slides = document.querySelectorAll(slidesSelector),
        prev = document.querySelector(prevSelector),
        next = document.querySelector(nextSelector),
        total = document.querySelector(totalSelector),
        current = document.querySelector(currentSelector),
        wrapper = document.querySelector(wrapperSelector),
        inner = document.querySelector(innerSelector),
        style = window.getComputedStyle(wrapper).width;

    let index = 1;
    let offset = 0;

    totalNumber(slides);
    currentNumber(index);

    inner.style.width = 100 * slides.length + '%';
    slides.forEach(item => item.style.width = style);
    prev.classList.add('mod');
    next.classList.add('mod');
    inner.style.display = 'flex';
    inner.style.transition = '0.5s all';
    wrapper.style.overflow = 'hidden';
    slider.style.position = 'relative';

    const indicators = document.createElement('ol');
    const dots = [];
    indicators.classList.add('carousel-indicators');
    slider.append(indicators);

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);
        dots.push(dot);
        if (i == 0) {
            dot.style.opacity = '1';
        }
    }

    next.addEventListener('click', function() {
        if (offset == deleteStringStyle(style) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset = offset + deleteStringStyle(style);
        }

        offsetInner(inner);
        numberNextSlides(index);
        currentNumber(index);
        activeDot(dots);
    });

    prev.addEventListener('click', function() {
        if (offset == 0) {
            offset = deleteStringStyle(style) * (slides.length - 1);
        } else {
            offset = offset - deleteStringStyle(style);
        }

        offsetInner(inner);
        numberPrevSlides(index);
        currentNumber(index);
        activeDot(dots);
    });

    dots.forEach(function(item) {
        item.addEventListener('click', function(event) {
            const attribute = event.target.getAttribute('data-slide-to');
            index = attribute;
            offset = deleteStringStyle(style) * (index - 1);

            offsetInner(inner);
            activeDot(dots);
            currentNumber(index);
        });
    });

    function deleteStringStyle(style) {
        return +style.replace(/\D/g, '');
    }

    function activeDot(dots) {
        dots.forEach(function(item) {
            item.style.opacity = '0.5';
        });
        dots[index - 1].style.opacity = '1';
    }

    function offsetInner(inner) {
        inner.style.transform = `translateX(-${offset}px)`;
    }

    function numberNextSlides(n) {
        if (n == slides.length) {
            index = 1;
        } else {
            index++;
        }
    }

    function numberPrevSlides(n) {
        if (n == 1) {
            index = slides.length;
        } else {
            index--;
        }
    }

    function totalNumber(slides) {
        if (slides.length < 10) {
            total.innerHTML = `0${slides.length}`;
        } else {
            total.innerHTML = slides.length;
        }
    }

    function currentNumber(index) {
        if (index < 10) {
            current.innerHTML = `0${index}`;
        } else {
            current.innerHTML = index;
        }
    }

}

export default slider;