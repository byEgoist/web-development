export function initMenu() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.header__nav');

    if (!burger || !nav) return;

    burger.addEventListener('click', () => {
        nav.classList.toggle('active');
        burger.classList.toggle('active');
    });

    document.querySelectorAll('.nav__link').forEach(link => {
        if (link.classList.contains('nav__link--active')) return;
        link.addEventListener('mouseenter', () => {
            link.querySelector('.nav__icon').style.fill = getComputedStyle(document.documentElement).getPropertyValue('--color-hover');
            link.querySelector('.nav__icon').style.transition = 'fill 0.3s';
            link.querySelector('.nav__icon').style.transform = 'scale(1.2) rotate(5deg)';
        });
        link.addEventListener('mouseleave', () => {
            link.querySelector('.nav__icon').style.fill = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
            link.querySelector('.nav__icon').style.transform = 'scale(1) rotate(0deg)';
        });
    });

    const dropdownItem = document.querySelector('.nav__item--dropdown');
    if (!dropdownItem) return;

    const dropdown = document.createElement('div');
    dropdown.classList.add('nav__dropdown-block');
    dropdown.innerHTML = `
            <ul class="nav__dropdown-list">
                <li class="nav__dropdown-item"><a href="interests.html#hobbies" class='nav__link'>Хобби</a></li>
                <li class="nav__dropdown-item"><a href="interests.html#books" class='nav__link'>Книги</a></li>
                <li class="nav__dropdown-item"><a href="interests.html#music" class='nav__link'>Музыка</a></li>
                <li class="nav__dropdown-item"><a href="interests.html#movies" class='nav__link'>Фильмы</a></li>
            </ul>
        `;
    dropdownItem.appendChild(dropdown);

    dropdownItem.addEventListener('mouseenter', () => {
        dropdown.style.display = 'block';
    });

    dropdownItem.addEventListener('mouseleave', () => {
        dropdown.style.display = 'none';
    });

    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    function updateDateTime() {
        if (!document.querySelector(".header__date")) return;
        const now = new Date();
        const day = now.getDate();
        const month = months[now.getMonth()];
        const year = now.getFullYear();

        const dateStr = `${day} ${month} ${year}`;

        document.querySelector(".header__date").textContent = `${dateStr}`;
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
}