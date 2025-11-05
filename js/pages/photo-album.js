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

    const photoTable = document.querySelector('.album__gallery');
    if (!photoTable) return;

    for (let i = 0; i < fotos.length; i++) {
        const photoCard = document.createElement('div');
        photoCard.classList.add('album__photo-card');
        photoCard.innerHTML = `
            <img src="../assets/images/photo-album/${fotos[i]}" 
                alt="${titles[i]}" 
                title="${titles[i]}" 
                class="album__image">
            <h6 class="album__photo-title">${titles[i]}</h6>
            `;
        photoTable.appendChild(photoCard);
    }

    photoTable.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('album__image')) {
            const overlay = document.createElement('div');
            overlay.classList.add('album__overlay');
            overlay.innerHTML = `
                <div class="album__overlay-content">
                    <img src="${target.src}" 
                        alt="${target.alt}" 
                        title="${target.title}" 
                        class="album__overlay-image">
                    <span class="album__overlay-close">&times;</span>
                </div>
            `;
            document.body.appendChild(overlay);
        }
    });

    document.body.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('album__overlay-close') || target.classList.contains('album__overlay')) {
            const overlay = target.closest('.album__overlay');
            if (overlay) {
                overlay.remove();
            }
        }
    });
}
