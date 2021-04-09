import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalSelector, modalTimer, messageSelector) {

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: "img/form/spinner.svg",
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach((item) => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (event) => {
            event.preventDefault();
            const statusMessage = document.createElement('img');
            statusMessage.classList.add('status');
            statusMessage.src = message.loading;
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formData.entries()));
            postData('http://localhost:3000/requests', json)
            .then(function(data) {
                console.log(data); //выводит в консоль ответ от сервера
                showThanksModal(message.success);
                statusMessage.remove();
            })
            .catch(function() {
                showThanksModal(message.failure);
            })
            .finally(function() {
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        const prevModaldialog = document.querySelector(messageSelector);
        openModal(modalSelector, modalTimer);

        prevModaldialog.classList.add('hide');
        prevModaldialog.classList.remove('show');

        const thanksModal = document.createElement('div');
        thanksModal.classList.add(messageSelector.slice(1));
        thanksModal.innerHTML = ` 
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>
        `;
        const modal = document.querySelector(modalSelector);
        modal.append(thanksModal);

        setTimeout(() => {
            thanksModal.remove();
            prevModaldialog.classList.add('show');
            prevModaldialog.classList.remove('hide');
            closeModal(modalSelector);
        }, 4000);
    }

}

export default forms;