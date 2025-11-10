// 2. Модифицировать страницу «Мои интересы», реализовав вывод
// списков с использованием JavaScript-функции с переменным числом аргументов.

function createList(className, listTitle, ...items) {
    let interestsContainer = $('.interests__container')[0];
    if (!interestsContainer) return;
    const section = $('<section>', { class: `interests__section interests__section--${className}`, id: className })[0];

    let linksList = $('.interests__links-list')[0];
    if (linksList) {
        const linkItem = $('<li>', { class: 'interests__links-list-item' })[0];
        linkItem.innerHTML = `<a href="#${className}" class="interests__link">${listTitle}</a>`;
        $(linksList).append(linkItem);
    }

    const title = $('<h2>', { class: 'interests__subtitle', text: listTitle })[0];
    $(section).append(title);

    const list = $('<ol>', { class: 'interests__numeric-list' })[0];
    items.forEach(item => {
        const listItem = $('<li>', { class: 'interests__numeric-list-item', text: item })[0];
        $(list).append(listItem);
    });
    $(section).append(list);

    $(interestsContainer).append(section);
}

export default function initInterests() {
    createList('favorite-horrors', 'Мой топ-10 лучших фильмов ужасов', '«Крик» (1996)', '«Реинкарнация» (2018)', '«Х» (2022)', '«Ведьма» (2015)', '«Верни ее из мертвых» (2025)', '«Паранормальное явление» (2007)', '«Мгла» (2007)', '«Варвар» (2022)', '«Оно следует» (2014)', '«Сияние» (1980)');
    // createList('favorite-movies', 'Любимые фильмы', 'Властелин колец', 'Начало', 'Матрица', 'Интерстеллар', 'Темный рыцарь');
    // createList('favorite-books', 'Любимые книги', '1984 - Джордж Оруэлл', 'Убить пересмешника - Харпер Ли', 'Великий Гэтсби - Фрэнсис Скотт Фицджеральд', 'Мастер и Маргарита - Михаил Булгаков');
    // createList('favorite-music', 'Любимая музыка', 'Классика', 'Рок', 'Джаз', 'Поп', 'Инди');
}