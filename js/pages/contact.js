import { initFormValidation } from '../modules/form-check.js';

export default function initContactPage() {
    initFormValidation();

    const calendar = $('.calendar')[0];
    const dobInput = $('#birthdate')[0];
    const monthSelect = $('#month-select')[0];
    const yearSelect = $('#year-select')[0];
    const calendarDays = $('.calendar__dates')[0];

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Заполняем селекторы месяца и года
    months.forEach((m, i) => {
        const opt = $('<option>', { value: i, text: m });
        $(monthSelect).append(opt);
    });

    for (let y = 1900; y <= new Date().getFullYear(); y++) {
        const opt = $('<option>', { value: y, text: y });
        $(yearSelect).append(opt);
    }

    let selectedDate = new Date();

    function renderCalendar() {
        const month = parseInt(monthSelect.value);
        const year = parseInt(yearSelect.value);

        // День недели 1-го числа
        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        calendarDays.innerHTML = "";

        // Добавляем пустые div'ы перед первым днем месяца
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = $('<div>', { class: 'calendar__date calendar__date--empty' });
            $(calendarDays).append(emptyDiv);
        }

        // Добавляем дни
        for (let d = 1; d <= lastDate; d++) {
            const dayDiv = $('<div>', { class: 'calendar__date', text: d });
            dayDiv.on('click', () => {
                const day = String(d).padStart(2, '0');
                const mon = String(month + 1).padStart(2, '0');
                const dateStr = `${day}.${mon}.${year}`;
                $(dobInput).val(dateStr);
                $(calendar).removeClass('calendar--active');
            });
            $(calendarDays).append(dayDiv);
        }
    }

    $(monthSelect).on('change', () => {
        renderCalendar();
    });

    $(yearSelect).on('change', () => {
        renderCalendar();
    });

    // При фокусе на поле открываем календарь
    $(dobInput).on('focus', () => {
        $(calendar).addClass('calendar--active');
        $(monthSelect).val(selectedDate.getMonth());
        $(yearSelect).val(selectedDate.getFullYear());
        renderCalendar();
    });

    // При клике вне календаря — закрываем
    $(document).on('click', (e) => {
        if (!$(e.target).closest('.calendar, #birthdate').length) {
            $(calendar).removeClass('calendar--active');
        }
    });
}
