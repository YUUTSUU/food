'use strict';

require('es6-promise').polyfill();
import 'nodelist-foreach-polyfill';

import tabs  from './modules/tabs';
import timer  from './modules/timer';
import modal  from './modules/modal';
import cards  from './modules/cards';
import forms  from './modules/forms';
import slider  from './modules/slider';
import calc  from './modules/calc';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', function() {

    let modalTimer = setTimeout(() => openModal('[data-modal]', modalTimer), 5000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-05-20');
    modal('[data-open]', 'data-close', '[data-modal]', modalTimer);
    cards();
    forms('form', '[data-modal]', modalTimer, '.modal__dialog');
    calc();
    slider({
        sliderSelector: '.offer__slider',
        slidesSelector: '.offer__slide',
        prevSelector: '.offer__slider-prev',
        nextSelector: '.offer__slider-next',
        totalSelector: '#total',
        currentSelector: '#current',
        wrapperSelector: '.offer__slider-wrapper',
        innerSelector: '.offer__slider-inner'
    });
    
});