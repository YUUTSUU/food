function tabs(tabSelector, contentSelector, tabsSelector, avtiveSelector) {

    let tab = document.querySelectorAll(tabSelector), 
        content = document.querySelectorAll(contentSelector),
        tabs = document.querySelector(tabsSelector);

    function hideTabContent() {
        content.forEach(function(item) {
            item.classList.add('hide');
            item.classList.remove('show','fade');
        });
        tab.forEach(function(item) {
            item.classList.remove(avtiveSelector);
        });
    }

    function showTabContent(i = 0) {
        content[i].classList.add('show', 'fade');
        content[i].classList.remove('hide');
        tab[i].classList.add(avtiveSelector);
    }

    hideTabContent();
    showTabContent();

    tabs.addEventListener('click', function(event) {
        let target = event.target;
        if (target && target.classList.contains(tabSelector.slice(1))) { 
            tab.forEach(function(item, i) {
                if (target === item) {
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });

}

export default tabs;