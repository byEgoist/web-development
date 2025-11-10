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
    const $field = $(field);
    const name = $field.attr('name');
    const value = $field.val();

    removeErrorMessage($field);

    if ($field.attr('type') === 'radio') {
        const $radios = $(`input[name="${name}"]`);
        const anyChecked = $radios.is(':checked');

        const $fieldParent = $field.closest('.test__answers-list').length ?
            $field.closest('.test__answers-list') :
            $field.parent();
        const $existingError = $fieldParent.parent().find('.error-message');

        if (!anyChecked) {
            if (!$existingError.length) {
                addErrorMessage($fieldParent, 'Пожалуйста, выберите один из вариантов');
            }
            markInvalid($radios);
            return false;
        }

        markValid($radios);
        $existingError.remove();
        return true;
    }

    // Проверка на обязательность
    if ($field.attr('required') && (!value || value.toString().trim() === '')) {
        addErrorMessage($field, 'Это поле обязательно для заполнения');
        markInvalid($field);
        return false;
    }

    // Если поле не обязательно и пустое - пропускаем кастомные проверки
    if (!value || value.toString().trim() === '') {
        markValid($field);
        return true;
    }

    const stringValue = value.toString().trim();

    // Кастомная проверка
    const validator = customValidators?.[name];
    if (typeof validator === 'function') {
        const result = validator(stringValue);
        if (result !== true) {
            addErrorMessage($field, result);
            markInvalid($field);
            return false;
        }
    }

    markValid($field);
    return true;
}

// Служебные функции 
function addErrorMessage($element, text) {
    const $msg = $('<p>', {
        class: 'error-message',
        text: text
    });
    $element.after($msg);
}

function removeErrorMessage($field) {
    $field.next('.error-message').remove();
}

function markInvalid($fields) {
    $fields.addClass('invalid').removeClass('valid');
}

function markValid($fields) {
    $fields.removeClass('invalid').addClass('valid');
}


const $modalOverlay = $('#modal-overlay');

function openModal() {
    $modalOverlay.fadeIn(200).css('display', 'flex');
    // $('body').css('filter', 'blur(5px)');
}

function closeModal() {
    $modalOverlay.fadeOut(200);
    $('body').css('filter', '');
}


// Инициализация валидации формы
export function initFormValidation() {
    const $form = $('form');
    const $confirmBtn = $('#confirm-btn');
    const $cancelBtn = $('#cancel-btn');
    let actionType = null; // "submit" или "reset"

    if (!$form.length) return;

    $form.on('submit', function (e) {
        e.preventDefault();
        let allValid = true;
        let $firstInvalid = null;

        $form.find('[required]').each(function () {
            const isValid = validateField(this);
            if (!isValid) {
                allValid = false;
                if (!$firstInvalid) {
                    $firstInvalid = $(this);
                }
            }
        });

        if (!allValid && $firstInvalid) {
            $firstInvalid.trigger('focus');
        } else {
            actionType = 'submit';
            $('.modal-message').text('Вы уверены, что хотите отправить форму?');
            openModal();
        }
    });

    $form.on('input', '[required], [name]', function () {
        validateField(this);
    });

    $form.on('blur', '[required], [name]', function () {
        validateField(this);
    });

    $form.on('reset', function (e) {
        e.preventDefault();
        actionType = 'reset';
        $('.modal-message').text('Вы уверены, что хотите сбросить форму?');
        openModal();
    });

    $confirmBtn.on('click', function () {
        if (actionType === 'submit') {
            $form.off('submit').submit(); // отправляем форму
        } else if (actionType === 'reset') {
            $form.find('.error-message').remove();
            $form.find('.invalid, .valid').removeClass('invalid valid');

            $form[0].reset(); // сбрасываем поля
        }
        closeModal();
    });

    // === Отмена ===
    $cancelBtn.on('click', function () {
        closeModal();
    });

    // === Закрытие при клике на фон ===
    $modalOverlay.on('click', function (e) {
        if ($(e.target).is($modalOverlay)) {
            closeModal();
        }
    });

    // === Закрытие по клавише ESC ===
    $(document).on('keydown', function (e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    const M = 2;
    let hideTimeout = null;

    $('body').on('mouseenter', '[data-popover]', function (event) {
        const $field = $(this);
        const message = $field.data('popover');
        if (!message) return;

        $('.popover').remove();

        clearTimeout(hideTimeout);
        const popover = $('<div class="popover"></div>').text(message);
        $('body').append(popover);
        // Ставим в позицию курсора с небольшим сдвигом
        popover.css({
            top: event.pageY + 12,
            left: event.pageX + 12,
            opacity: 0
        }).animate({ opacity: 1 }, 150);
    });

    // Обновляем позицию при движении мыши
    $('body').on('mousemove', '[data-popover]', function (event) {
        const popover = $('.popover');
        if (popover.length) {
            popover.css({
                top: event.pageY + 12,
                left: event.pageX + 12
            });
        }
    });

    $form.on('mouseleave', '[data-popover]', function () {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            $('.popover').fadeOut(200, function () { $(this).remove(); });
        }, M * 1000);
    });

    // Если курсор зашёл на сам popover — отменяем скрытие
    $('body').on('mouseenter', '.popover', function () {
        clearTimeout(hideTimeout);
    }).on('mouseleave', '.popover', function () {
        hideTimeout = setTimeout(() => {
            $(this).fadeOut(200, function () { $(this).remove(); });
        }, M * 1000);
    });
}