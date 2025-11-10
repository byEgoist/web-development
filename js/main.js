import { initMenu } from './modules/menu.js';
import { trackPageVisit } from './modules/historyTracker.js';

$(document).ready(function() {
    initMenu();

    // Получаем имя текущего файла (например, "photo-album.html")
    const path = window.location.pathname;
    const pageName = path.split('/').pop().replace('.html', '');

    // Если страница — корневая (index.html), дадим имя вручную
    const page = pageName === '' ? 'index' : pageName;

    // Отслеживаем посещение страницы
    trackPageVisit(pageName);

    // Динамически импортируем JS для этой страницы
    import(`./pages/${page}.js`)
        .then(module => module.default && module.default())
        .catch(() => console.warn(`Нет модуля для страницы "${page}"`));
});