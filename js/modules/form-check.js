// 3. Добавить на страницах «Контакт» и «Тест по дисциплине «…»» 
// функции проверки заполненности форм. В случае если какое-либо из полей
// формы осталось незаполненным при нажатии на кнопку отправить, 
// вывести сообщение об ошибке и установить фокус на незаполненный элемент.

// Кастомные проверки по name поля
const customValidators = {
    name: (value) => {
        const parts = value.trim().split(' ').filter(word => word.length > 0);
        if (parts.length !== 3) return 'Введите фамилию, имя и отчество (три слова через пробел)';

        // Проверяем, что все символы — буквы русского алфавита
        // const validChars = 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя-';
        // for (let part of parts) {
        //     for (let char of part) {
        //         if (!validChars.includes(char)) return 'ФИО должно содержать только буквы русского алфавита';
        //     }
        // }

        return true;
    },
    // age: (value) => {
    //     const ageNum = Number(value);
    //     if (isNaN(ageNum) || ageNum < 0 || ageNum > 120) return 'Введите корректный возраст от 0 до 120';
    //     return true;
    // },

    birthdate: (value) => {
        // Проверяем формат ДД.ММ.ГГГГ
        const parts = value.split('.');
        if (parts.length !== 3) return 'Введите дату в формате ДД.ММ.ГГГГ';
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);

        const date = new Date(year, month, day);
        if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
            return 'Введите корректную дату';
        }

        return true;
    },

    telephone: (value) => {
        if (value.includes(' ')) return 'Телефон не должен содержать пробелов';
        if (!(value.startsWith('+7') || value.startsWith('+3'))) return 'Телефон должен начинаться с +7 или +3';

        // Убираем + и проверяем длину цифр
        const digits = value.slice(1);
        if (digits.length < 9 || digits.length > 11) return 'Телефон должен содержать от 9 до 11 цифр после кода';

        // Проверяем, что все символы — цифры
        for (let char of digits) {
            if (char < '0' || char > '9') return 'Телефон должен содержать только цифры после кода';
        }

        return true;
    },
    email: (value) => {
        const atPos = value.indexOf('@');
        const dotPos = value.lastIndexOf('.');
        if (atPos < 1 || dotPos < atPos + 2 || dotPos === value.length - 1) {
            return 'Введите корректный email';
        }
        return true;
    },
    'question-1': (value) => {
        const words = value.trim().split(' ').filter(word => word.length > 0);
        if (words.length < 30) return 'Пожалуйста, введите не менее 30 слов';
        return true;
    }
};

function validateField(field) {
    const name = field.name;
    const value = field.value.trim();

    removeErrorMessage(field);

    if (field.type === 'radio') {
        const radios = field.form.querySelectorAll(`input[name="${name}"]`);
        const anyChecked = Array.from(radios).some(r => r.checked);

        const fieldParent = field.closest('.test__answers-list') || field.parentElement;
        const existingError  = fieldParent.parentElement.querySelector('.error-message');

        if (!anyChecked) {
            if (!existingError) {
                addErrorMessage(fieldParent, 'Пожалуйста, выберите один из вариантов');
            }
            markInvalid(radios);
            return false;
        }

        markValid(radios);
        if (existingError) {
            existingError.remove();
        }
        return true;
    }

    // Проверка на обязательность
    if (field.hasAttribute('required') && value === '') {
        addErrorMessage(field, 'Это поле обязательно для заполнения');
        markInvalid(field);
        return false;
    }

    // Кастомная проверка
    const validator = customValidators?.[name];
    if (typeof validator === 'function') {
        const result = validator(value);
        if (result !== true) {
            addErrorMessage(field, result);
            markInvalid(field);
            return false;
        }
    }

    markValid(field);
    return true;
}

// Служебные функции 
function addErrorMessage(element, text) {
    const msg = document.createElement('p');
    msg.className = 'error-message';
    msg.textContent = text;
    element.insertAdjacentElement('afterend', msg);
}

function removeErrorMessage(field) {
    const msg = field.nextElementSibling;
    if (msg && msg.classList.contains('error-message')) msg.remove();
}

function markInvalid(fields) {
    if (fields instanceof NodeList || Array.isArray(fields)) {
        fields.forEach(f => f.classList.add('invalid'));
    } else {
        fields.classList.add('invalid');
    }
}

function markValid(fields) {
    if (fields instanceof NodeList || Array.isArray(fields)) {
        fields.forEach(f => {
            f.classList.remove('invalid');
            f.classList.add('valid');
        });
    } else {
        fields.classList.remove('invalid');
        fields.classList.add('valid');
    }
}

// Инициализация валидации формы
export function initFormValidation() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        let allValid = true;
        let firstInvalid = null;

        form.querySelectorAll('[required]').forEach(field => {
            const isValid = validateField(field);
            if (!isValid) {
                allValid = false;
                if (!firstInvalid) firstInvalid = field;
            }
        });

        if (!allValid && firstInvalid) {
            firstInvalid.focus();
        } else {
            form.submit();
        }
    });

    form.addEventListener('input', e => {
        const field = e.target;
        if (field.matches('[required], [name]')) validateField(field);
    });

    form.addEventListener('blur', e => {
        const field = e.target;
        if (field.matches('[required], [name]')) validateField(field);
    }, true);

    form.addEventListener('reset', () => {
        form.querySelectorAll('.error-message').forEach(msg => msg.remove());
        form.querySelectorAll('.invalid, .valid').forEach(f => f.classList.remove('invalid', 'valid'));
    });
}
