import { initFormValidation } from '../modules/form-check.js';

export default function initContactPage() {
    initFormValidation();

    const calendar = document.querySelector('.calendar');
    const dobInput = document.getElementById('birthdate');
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const calendarDays = document.querySelector('.calendar__dates');

    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Заполняем селекторы месяца и года
    months.forEach((m, i) => {
        const opt = document.createElement('option');
        opt.value = i;
        opt.textContent = m;
        monthSelect.appendChild(opt);
    });

    for (let y = 1900; y <= new Date().getFullYear(); y++) {
        const opt = document.createElement('option');
        opt.value = y;
        opt.textContent = y;
        yearSelect.appendChild(opt);
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
            const empty = document.createElement('div');
            calendarDays.appendChild(empty);
        }

        // Добавляем дни
        for (let d = 1; d <= lastDate; d++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('calendar__date');
            dayDiv.textContent = d;
            dayDiv.addEventListener('click', () => {
                const day = String(d).padStart(2, '0');
                const mon = String(month + 1).padStart(2, '0');
                dobInput.value = `${day}.${mon}.${year}`;
                calendar.classList.remove('calendar--active');
            });
            calendarDays.appendChild(dayDiv);
        }
    }

    monthSelect.addEventListener('change', renderCalendar);
    yearSelect.addEventListener('change', renderCalendar);

    // При фокусе на поле открываем календарь
    dobInput.addEventListener('focus', () => {
        calendar.classList.add('calendar--active');
        monthSelect.value = selectedDate.getMonth();
        yearSelect.value = selectedDate.getFullYear();
        renderCalendar();
    });

    // При клике вне календаря — закрываем
    document.addEventListener('click', (e) => {
        if (!calendar.contains(e.target) && e.target !== dobInput) {
            calendar.classList.remove('calendar--active');
        }
    });
}
