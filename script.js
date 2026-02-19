
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');


let currentVisibleItems = [...galleryItems];
let currentIndex = 0;

// Filter Functionality
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Toggle Active Class on Buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        currentVisibleItems = [];

        // Loop through items and show/hide based on filter
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.style.display = 'block';
                currentVisibleItems.push(item);
            } else {
                item.style.display = 'none';
            }
        });
    });
});


galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        currentIndex = currentVisibleItems.indexOf(item);
        updateLightbox();
        lightbox.style.display = 'flex';
    });
});


function updateLightbox() {
    const imgSrc = currentVisibleItems[currentIndex].querySelector('img').src;
    lightboxImg.src = imgSrc;
}


nextBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Prevents clicking the background while clicking button
    currentIndex = (currentIndex + 1) % currentVisibleItems.length;
    updateLightbox();
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + currentVisibleItems.length) % currentVisibleItems.length;
    updateLightbox();
});


closeBtn.addEventListener('click', () => lightbox.style.display = 'none');


lightbox.addEventListener('click', (e) => { 
    if(e.target === lightbox) lightbox.style.display = 'none'; 
});
