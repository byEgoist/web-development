export default function initPhotoAlbum() {
    const fotos = [
        "photo_1.jpg", "photo_2.jpg", "photo_3.jpg", "photo_4.jpg",
        "photo_5.jpg", "photo_6.jpg", "photo_7.jpg", "photo_8.jpg",
        "photo_9.jpg", "photo_10.jpg", "photo_11.jpg", "photo_12.jpg",
        "photo_13.jpg", "photo_14.jpg", "photo_15.jpg"
    ];

    const titles = [
        "Bella Swan", "Edward Cullen", "Jacob Black", "Alice Cullen",
        "Jasper Hale", "Carlisle Cullen", "Esme Cullen", "Rosalie Hale",
        "Emmett Cullen", "Charlie Swan", "Renesmee Cullen", "Aro Volturi",
        "Caius Volturi", "Marcus Volturi", "Jane Volturi"
    ];

    const photoTable = $('.album__gallery')[0];
    if (!photoTable) return;

    fotos.forEach((foto, index) => {
        const img = $('<img>', {
            src: `./assets/images/photo-album/${foto}`,
            alt: titles[index],
            title: titles[index],
            class: 'album__image'
        });
        const title = $('<h6>', {
            text: titles[index],
            class: 'album__photo-title'
        });
        const card = $('<div>', { class: 'album__photo-card' });
        card.append(img, title);
        $(photoTable).append(card);
    });

    $('.album__image').on('click', (event) => {
        const target = event.target;
        if (target) {
            const overlay = $('<div>', { class: 'album__overlay' });
            overlay.html(`
                <div class="album__overlay-content">
                    <img src="${target.src}" 
                        alt="${target.alt}" 
                        title="${target.title}" 
                        class="album__overlay-image">
                    <span class="album__overlay-close">&times;</span>
                    <div class="album__overlay-arrows">
                        <span id="arrow-left" class="album__overlay-arrow album__overlay-arrow--left">&lt;</span>
                        <span id="arrow-right" class="album__overlay-arrow album__overlay-arrow--right">&gt;</span>
                    </div>
                </div>
            `);
            $('body').append(overlay);
        }

        const images = [];
        $('.album__gallery img').each((index, img) => {
            images.push($(img).attr('src'));
        });

        $('body').on('click', '#arrow-left, #arrow-right', (event) => {
            const currentImg = $('.album__overlay-image');
            const currentSrc = currentImg.attr('src');
            const images = $('.album__gallery img').map((i, el) => $(el).attr('src')).get();
            let currentIndex = images.indexOf(currentSrc);

            if ($(event.target).is('#arrow-left')) {
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            } else {
                currentIndex = (currentIndex + 1) % images.length;
            }

            // Анимация смены изображения
            currentImg.fadeOut(200, function () {
                $(this)
                    .attr('src', images[currentIndex])
                    .attr('alt', titles[currentIndex])
                    .attr('title', titles[currentIndex])
                    .fadeIn(200);
            });
        });

        $('body').on('click', (event) => {
            const target = event.target;
            if (target.classList.contains('album__overlay-close') || target.classList.contains('album__overlay')) {
                const overlay = $(target).closest('.album__overlay');
                if (overlay) {
                    overlay.remove();
                }
            }
        });
    });
}
