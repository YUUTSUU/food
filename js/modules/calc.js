function calc() {

    const result = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')) {
        sex = localStorage.getItem('sex');
    } else {
        sex = 'male';
        localStorage.setItem('sex', 'male');
    }

    if (localStorage.getItem('ratio')) {
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function calcTotal() {
        if (!sex || !height || !weight || !age || !ratio) {
            result.textContent = '0';
            return;
        }
        if (sex === 'male') {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        } else {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        }
    }

    calcTotal();

    function initActiveClass(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(function(item) {
            item.classList.remove('calculating__choose-item_active');
            if (item.getAttribute('id') === localStorage.getItem('sex')) {
                item.classList.add('calculating__choose-item_active');
            }
            if (item.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
                item.classList.add('calculating__choose-item_active');
            }
        });
    }

    initActiveClass('#gender div');
    initActiveClass('.calculating__choose_big div');

    function addActiveClass(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(function(item) {
            item.addEventListener('click', function() {
                if (item.getAttribute('data-ratio')) {
                    ratio = +item.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +item.getAttribute('data-ratio'));
                } else {
                    sex = item.getAttribute('id');
                    localStorage.setItem('sex', item.getAttribute('id'));
                }
                elements.forEach(function(item) {
                    item.classList.remove('calculating__choose-item_active');
                });
                item.classList.add('calculating__choose-item_active');

                calcTotal();
            });
        });
    }

    addActiveClass('#gender div');
    addActiveClass('.calculating__choose_big div');

    function getInputValue(selector) {
        const input = document.querySelector(selector);
        input.addEventListener('input', function() {
            if(input.value.match(/\D/g)) {
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }
            switch (input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }
    getInputValue('#height');
    getInputValue('#weight');
    getInputValue('#age');

}

export default calc;