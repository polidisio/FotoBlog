/* ============================================
   FOTOBLOG APP — Vintage Analog Film
   ============================================ */

var rolls = [];
var currentRollPhotos = [];
var currentPhotoIndex = 0;
var slideshowInterval = null;

/* === Load Data === */
async function loadRolls() {
    try {
        const res = await fetch('./data/rolls.json');
        if (!res.ok) throw new Error('Failed to load');
        const data = await res.json();
        rolls = data.rolls || [];
        return rolls;
    } catch (e) {
        console.error('Error loading rolls:', e);
        return [];
    }
}

/* === Render Rolls Grid (Home) === */
async function renderRolls() {
    const container = document.getElementById('rolls-container');
    if (!container) return;

    rolls = await loadRolls();

    if (!rolls.length) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="icon">📷</div>
                <h2>No hay rollos todavía</h2>
                <p>Los rollos aparecerán aquí cuando se añadan fotos.</p>
            </div>
        `;
        return;
    }

    // Filter by year if selector exists
    const yearFilter = document.getElementById('year-filter');
    const selectedYear = yearFilter ? yearFilter.value : 'all';

    let filteredRolls = rolls;
    if (selectedYear !== 'all') {
        filteredRolls = rolls.filter(roll => roll.date.startsWith(selectedYear));
    }

    // Render rolls grid
    let html = '';
    filteredRolls.forEach(roll => {
        const firstPhoto = roll.photos && roll.photos[0];
        const photoCount = roll.photos ? roll.photos.length : 0;
        const formattedDate = formatDate(roll.date);

        html += `
            <article class="roll-card" onclick="goToRoll('${roll.id}')">
                ${firstPhoto ? `<img class="roll-card-img" src="${firstPhoto.filename}" alt="${roll.name}">` : '<div class="roll-card-img" style="background:var(--bg-paper);aspect-ratio:1;"></div>'}
                <div class="roll-card-info">
                    <h3 class="roll-card-name">${roll.name}</h3>
                    <div class="roll-card-meta">
                        <span>📅 ${formattedDate}</span>
                        <span>📷 ${roll.camera}</span>
                        <span>📍 ${roll.location}</span>
                    </div>
                    <span class="roll-card-link">Ver rollo — ${photoCount} fotos</span>
                </div>
            </article>
        `;
    });

    if (filteredRolls.length === 0) {
        html = `
            <div class="empty-state">
                <div class="icon">🎞️</div>
                <h2>Sin rollos en ${selectedYear}</h2>
                <p>No hay rollos para este año. Prueba con otro.</p>
            </div>
        `;
    }

    container.innerHTML = html;
}

/* === Render Single Roll Page === */
async function renderRoll(rollId) {
    const container = document.getElementById('roll-photos');
    const rollInfo = document.getElementById('roll-info');

    if (!container) return;

    rolls = await loadRolls();
    const roll = rolls.find(r => r.id === rollId);

    if (!roll) {
        container.innerHTML = '<div class="empty-state"><h2>Roll no encontrado</h2></div>';
        return;
    }

    currentRollPhotos = roll.photos || [];

    // Update roll info header
    if (rollInfo) {
        rollInfo.innerHTML = `
            <h1 class="roll-title">${roll.name}</h1>
            <p class="roll-description">${roll.description || ''}</p>
            <div class="roll-meta">
                <span>📅 ${formatDate(roll.date)}</span>
                <span>📷 ${roll.camera}</span>
                <span>📍 ${roll.location}</span>
                <span>🎞️ ${currentRollPhotos.length} exposiciones</span>
            </div>
        `;
    }

    // Render photos grid
    if (!currentRollPhotos.length) {
        container.innerHTML = '<div class="empty-state"><p>No hay fotos en este rollo.</p></div>';
        return;
    }

    let html = '';
    currentRollPhotos.forEach((photo, index) => {
        html += `
            <div class="photo-item" onclick="openLightbox(${index})" style="animation-delay: ${index * 0.05}s">
                <img src="${photo.filename}" alt="${photo.title}" class="vignette">
                <span class="photo-number">#${photo.photo_number || index + 1}</span>
                <span class="photo-title">${photo.title || ''}</span>
            </div>
        `;
    });

    container.innerHTML = `<div class="photos-grid">${html}</div>`;
}

/* === Year Filter === */
function setupYearFilter() {
    const yearFilter = document.getElementById('year-filter');
    if (!yearFilter) return;

    // Populate years from rolls
    const years = [...new Set(rolls.map(r => r.date.substring(0, 4)))].sort().reverse();
    const currentYear = new Date().getFullYear();

    let options = '<option value="all">Todos los años</option>';
    years.forEach(y => {
        options += `<option value="${y}">${y}</option>`;
    });

    // Add current year if not in list
    if (!years.includes(String(currentYear))) {
        options += `<option value="${currentYear}">${currentYear}</option>`;
    }

    yearFilter.innerHTML = options;

    yearFilter.addEventListener('change', () => {
        renderRolls();
    });
}

/* === Lightbox === */
function openLightbox(index) {
    if (!currentRollPhotos.length) return;
    currentPhotoIndex = index;

    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    updateLightboxContent();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Keyboard navigation
    document.addEventListener('keydown', handleLightboxKeys);
}

function updateLightboxContent() {
    const photo = currentRollPhotos[currentPhotoIndex];
    if (!photo) return;

    const img = document.getElementById('lightbox-img');
    const title = document.getElementById('lightbox-title');
    const meta = document.getElementById('lightbox-meta');
    const counter = document.getElementById('lightbox-counter');

    if (img) img.src = photo.filename;
    if (title) title.textContent = photo.title || '';
    if (counter) counter.textContent = `${currentPhotoIndex + 1} / ${currentRollPhotos.length}`;

    let metaHtml = '';
    if (photo.notes) metaHtml += `<span>📝 ${photo.notes}</span>`;
    if (photo.exif) {
        const exif = photo.exif;
        if (exif.camera) metaHtml += `<span>📷 ${exif.camera}</span>`;
        if (exif.size) metaHtml += `<span>📐 ${exif.size}</span>`;
        if (exif.date) metaHtml += `<span>📅 ${exif.date}</span>`;
    }
    if (meta) meta.innerHTML = metaHtml;
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) lightbox.classList.remove('active');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', handleLightboxKeys);
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
    }
}

function nextPhoto() {
    currentPhotoIndex = (currentPhotoIndex + 1) % currentRollPhotos.length;
    updateLightboxContent();
    // Wipe animation
    const content = document.querySelector('.lightbox-content');
    if (content) {
        content.style.animation = 'none';
        content.offsetHeight;
        content.style.animation = 'wipeIn 0.3s ease';
    }
}

function prevPhoto() {
    currentPhotoIndex = (currentPhotoIndex - 1 + currentRollPhotos.length) % currentRollPhotos.length;
    updateLightboxContent();
    const content = document.querySelector('.lightbox-content');
    if (content) {
        content.style.animation = 'none';
        content.offsetHeight;
        content.style.animation = 'wipeIn 0.3s ease';
    }
}

function handleLightboxKeys(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
}

/* === Slideshow === */
function toggleSlideshow() {
    const btn = document.getElementById('slideshow-btn');
    if (slideshowInterval) {
        clearInterval(slideshowInterval);
        slideshowInterval = null;
        if (btn) btn.textContent = '▶ Reproducir';
    } else {
        slideshowInterval = setInterval(nextPhoto, 2500);
        if (btn) btn.textContent = '⏸ Pausar';
    }
}

/* === Utility === */
function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
}

function goToRoll(rollId) {
    window.location.href = `./roll.html?id=${rollId}`;
}

function getRollIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

/* === Init === */
document.addEventListener('DOMContentLoaded', () => {
    // Home page
    if (document.getElementById('rolls-container')) {
        loadRolls().then(() => {
            renderRolls();
            setupYearFilter();
        });
    }

    // Roll page
    if (document.getElementById('roll-photos')) {
        const rollId = getRollIdFromUrl();
        if (rollId) {
            loadRolls().then(() => renderRoll(rollId));
        }
    }

    // Lightbox close on backdrop click
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }
});
