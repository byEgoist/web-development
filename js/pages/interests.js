// 2. Модифицировать страницу «Мои интересы», реализовав вывод
// списков с использованием JavaScript-функции с переменным числом аргументов.

function createList(className, listTitle, ...items) {
    let interestsContainer = document.querySelector('.interests__container');
    if (!interestsContainer) return;
    const section = document.createElement('section');
    section.classList.add(className, 'interests__section');
    section.id = className;

    let linksList = document.querySelector('.interests__links-list');
    if (linksList) {
        const linkItem = document.createElement('li');
        linkItem.classList.add('interests__links-list-item');
        linkItem.innerHTML = `<a href="#${className}" class="interests__link">${listTitle}</a>`;
        linksList.appendChild(linkItem);
    }

    const title = document.createElement('h2');
    title.classList.add('interests__subtitle');
    title.textContent = listTitle;
    section.appendChild(title);

    const list = document.createElement('ol');
    list.classList.add('interests__numeric-list');
    items.forEach(item => {
        const listItem = document.createElement('li');
        listItem.classList.add('interests__numeric-list-item');
        listItem.textContent = item;
        list.appendChild(listItem);
    });
    section.appendChild(list);

    interestsContainer.appendChild(section);
}

export default function initInterests() {
    createList('favorite-horrors', 'Мой топ-10 лучших фильмов ужасов', '«Крик» (1996)', '«Реинкарнация» (2018)', '«Х» (2022)', '«Ведьма» (2015)', '«Верни ее из мертвых» (2025)', '«Паранормальное явление» (2007)', '«Мгла» (2007)', '«Варвар» (2022)', '«Оно следует» (2014)', '«Сияние» (1980)');
    // createList('favorite-movies', 'Любимые фильмы', 'Властелин колец', 'Начало', 'Матрица', 'Интерстеллар', 'Темный рыцарь');
    // createList('favorite-books', 'Любимые книги', '1984 - Джордж Оруэлл', 'Убить пересмешника - Харпер Ли', 'Великий Гэтсби - Фрэнсис Скотт Фицджеральд', 'Мастер и Маргарита - Михаил Булгаков');
    // createList('favorite-music', 'Любимая музыка', 'Классика', 'Рок', 'Джаз', 'Поп', 'Инди');
}