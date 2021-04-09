function openModal(modalSelector, modalTimer) {
    const modal = document.querySelector(modalSelector);
    document.body.style.overflow = 'hidden';
    modal.classList.add('show');
    modal.classList.remove('hide');
    if (modalTimer) {
        clearTimeout(modalTimer);
    }
}

function closeModal(modalSelector) {
    const modal = document.querySelector(modalSelector);
    document.body.style.overflow = '';
    modal.classList.add('hide');
    modal.classList.remove('show');
}


function modal(openSelector, closeSelector ,modalSelector, modalTimer) {

    let open = document.querySelectorAll(openSelector),
        modal = document.querySelector(modalSelector);

    open.forEach(function(elem) {
        elem.addEventListener('click', () => openModal(modalSelector, modalTimer));
    });

    modal.addEventListener('click', function(event) {
        if (event.target === modal || event.target.getAttribute(closeSelector) == '') {
            closeModal(modalSelector);
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal(modalSelector);
        }
    });

    function showScroll() {
        if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            openModal(modalSelector, modalTimer);
            window.removeEventListener('scroll', showScroll);
        }
    }

    window.addEventListener('scroll', showScroll);
}

export default modal;
export {openModal};
export {closeModal};