var photos = [];

async function loadPhotos() {
    try {
        const res = await fetch('./data/photos.json');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        photos = data.photos || [];
        renderPhotos();
    } catch (e) {
        document.getElementById('content').innerHTML = '<div style="padding:2rem;text-align:center;color:red;">Error: ' + e + '</div>';
    }
}

function renderPhotos() {
    const main = document.getElementById('content');
    const photoList = document.getElementById('photo-list');

    if (!photos.length) {
        main.innerHTML = '<div class="empty-state"><div class="icon">📷</div><h2>No hay fotos todavía</h2></div>';
        return;
    }

    // Home page: vertical list layout
    if (photoList) {
        let html = '<div class="photo-list">';
        for (var i = 0; i < photos.length; i++) {
            var photo = photos[i];
            html += '<div class="photo-item" style="animation-delay: ' + (i * 0.1) + 's">';
            html += '<img src="' + photo.filename + '" alt="' + photo.title + '" onclick="openModal(' + i + ')">';
            html += '<div class="photo-data">';
            html += '<div class="category">' + (photo.category || 'Sin categoría') + '</div>';
            html += '<h3>' + photo.title + '</h3>';
            html += '<div class="date">' + formatDate(photo.date_added) + '</div>';
            if (photo.comment) html += '<p class="comment">' + photo.comment + '</p>';
            // EXIF preview
            if (photo.exif) {
                var exif = photo.exif;
                var exifHtml = '';
                if (exif.camera) exifHtml += '<span>📱 ' + exif.camera + '</span>';
                if (exif.size) exifHtml += '<span>📐 ' + exif.size + '</span>';
                if (exif.iso) exifHtml += '<span>📊 ISO ' + exif.iso + '</span>';
                if (exif.aperture) exifHtml += '<span>🔆 f/' + exif.aperture + '</span>';
                if (exif.exposure) exifHtml += '<span>⏱️ ' + exif.exposure + 's</span>';
                if (exif.focalLength) exifHtml += '<span>🎯 ' + exif.focalLength + 'mm</span>';
                if (exifHtml) html += '<div class="exif-preview">' + exifHtml + '</div>';
            }
            html += '</div></div>';
        }
        html += '</div>';
        main.innerHTML = html;
        return;
    }

    // Gallery page: masonry grid
    let html = '<div class="gallery-header"><h2>Galería</h2><div class="line"></div></div>';
    html += '<div class="masonry-grid">';

    for (var i = 0; i < photos.length; i++) {
        var photo = photos[i];
        html += '<div class="photo-card" onclick="openModal(' + i + ')" style="animation-delay: ' + (i * 0.1) + 's">';
        html += '<img src="' + photo.filename + '" alt="' + photo.title + '">';
        html += '<div class="photo-overlay">';
        html += '<div class="category">' + (photo.category || 'Sin categoría') + '</div>';
        html += '<h3>' + photo.title + '</h3>';
        html += '<div class="date">' + formatDate(photo.date_added) + '</div>';
        if (photo.comment) html += '<p class="photo-comment">' + photo.comment.replace(/\n/g, '<br>') + '</p>';
        html += '</div></div>';
    }

    html += '</div>';

    main.innerHTML = html;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    var date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

function openModal(index) {
    var photo = photos[index];
    var modal = document.createElement('div');
    modal.className = 'modal active';
    modal.onclick = function(e) { if (e.target === modal) modal.remove(); };

    var html = '<button class="modal-close" onclick="this.parentElement.remove()">×</button>';
    html += '<div class="modal-content">';
    html += '<img src="' + photo.filename + '" alt="' + photo.title + '">';
    html += '<div class="modal-info">';
    html += '<div class="category">' + (photo.category || 'Sin categoría') + '</div>';
    html += '<h2>' + photo.title + '</h2>';
    html += '<div class="date">' + formatDate(photo.date_added) + '</div>';
    if (photo.comment) html += '<p>' + photo.comment + '</p>';

    // EXIF section
    if (photo.exif) {
        var exif = photo.exif;
        var hasExif = exif.camera || exif.size || exif.iso || exif.aperture || exif.exposure || exif.focalLength || exif.date;
        if (hasExif) {
            html += '<div class="exif-section">';
            html += '<h4>📷 Datos de la foto</h4>';
            html += '<div class="exif-grid">';

            if (exif.camera) {
                html += '<div class="exif-item"><span class="icon">📱</span><span class="value">' + exif.camera + '</span></div>';
            }
            if (exif.date) {
                html += '<div class="exif-item"><span class="icon">📅</span><span class="value">' + exif.date + '</span></div>';
            }
            if (exif.size) {
                html += '<div class="exif-item"><span class="icon">📐</span><span class="value">' + exif.size + '</span></div>';
            }
            if (exif.iso) {
                html += '<div class="exif-item"><span class="icon">📊</span><span class="value">ISO ' + exif.iso + '</span></div>';
            }
            if (exif.aperture) {
                html += '<div class="exif-item"><span class="icon">🔆</span><span class="value">f/' + exif.aperture + '</span></div>';
            }
            if (exif.exposure) {
                html += '<div class="exif-item"><span class="icon">⏱️</span><span class="value">' + exif.exposure + 's</span></div>';
            }
            if (exif.focalLength) {
                html += '<div class="exif-item"><span class="icon">🎯</span><span class="value">' + exif.focalLength + 'mm</span></div>';
            }
            if (exif.lens) {
                html += '<div class="exif-item"><span class="icon">🔍</span><span class="value">' + exif.lens + '</span></div>';
            }

            html += '</div></div>';
        }
    }

    html += '</div></div>';

    modal.innerHTML = html;
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
}

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var modal = document.querySelector('.modal');
        if (modal) modal.remove();
    }
});

if (document.getElementById('content')) {
    loadPhotos();
}
