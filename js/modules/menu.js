export function initMenu() {

    const burger = $('.burger');
    const nav = $('.header__nav');

    if (!burger || !nav) return;

     $(burger).on('click', function() {
        $(nav).toggleClass('active');
        $(burger).toggleClass('active');
    });


    $('.nav__link').each(function() {
        if ($(this).hasClass('nav__link--active')) return;
        $(this).on('mouseenter', function() {
            $(this).find('.nav__icon').css({
                fill: getComputedStyle(document.documentElement).getPropertyValue('--color-hover'),
                transition: 'fill 0.3s',
                transform: 'scale(1.2) rotate(5deg)'
            });
        });
        $(this).on('mouseleave', function() {
            $(this).find('.nav__icon').css({
                fill: getComputedStyle(document.documentElement).getPropertyValue('--color-primary'),
                transform: 'scale(1) rotate(0deg)'
            });
        });
    });

    const dropdownItem = $('.nav__item--dropdown');
    if (dropdownItem.length === 0) return;

    const dropdown = $('<div>', { class: 'nav__dropdown-block' }).html(`
            <ul class="nav__dropdown-list">
                <li class="nav__dropdown-item"><a href="interests.html#hobbies" class='nav__link'>Хобби</a></li>
                <li class="nav__dropdown-item"><a href="interests.html#books" class='nav__link'>Книги</a></li>
                <li class="nav__dropdown-item"><a href="interests.html#music" class='nav__link'>Музыка</a></li>
                <li class="nav__dropdown-item"><a href="interests.html#movies" class='nav__link'>Фильмы</a></li>
            </ul>
        `);
    dropdownItem.append(dropdown);

    dropdownItem.on('mouseenter', () => {
        $(dropdown).css('display', 'block');
    });

    dropdownItem.on('mouseleave', () => {
        $(dropdown).css('display', 'none');
    });

    const months = [
        "января", "февраля", "марта", "апреля", "мая", "июня",
        "июля", "августа", "сентября", "октября", "ноября", "декабря"
    ];

    function updateDateTime() {
        if ($(".header__date").length === 0) return;
        const now = new Date();
        const day = now.getDate();
        const month = months[now.getMonth()];
        const year = now.getFullYear();

        const dateStr = `${day} ${month} ${year}`;

        $(".header__date").text(`${dateStr}`);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);
}