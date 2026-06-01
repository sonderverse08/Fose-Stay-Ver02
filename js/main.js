const tabs = document.querySelectorAll('.tab-btn');

tabs.forEach(tab => {
    tab.addEventListener('click', function() {

        tabs.forEach(t => t.classList.remove('active'));
        
        this.classList.add('active');
        
        console.log("Bạn đang chọn chế độ:", this.getAttribute('data-tab'));
    });
});

// Xử lý chọn địa điểm từ dropdown
const dropdownItems = document.querySelectorAll('#searchForm .dropdown-item');
const locationDisplay = document.getElementById('locationDisplay');
const locationInput = document.getElementById('locationInput');

dropdownItems.forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault(); 
        
        const selectedText = this.innerText.trim();
        const selectedValue = this.getAttribute('data-value');
        

        locationDisplay.innerText = selectedText;
        locationDisplay.classList.remove('text-muted'); 
        locationInput.value = selectedValue;
        
        console.log("Địa điểm đã chọn:", selectedValue);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('suggestionRow');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (!track || !prevBtn || !nextBtn) return;
    let isTransitioning = false;

    function getMoveWidth() {
        const item = track.querySelector('.slider-item');
        const rect = item.getBoundingClientRect();
        const nextItem = item.nextElementSibling;
        if (nextItem) {
            return nextItem.getBoundingClientRect().left - rect.left;
        }
        return item.offsetWidth + 16;
    }

    nextBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;

        const width = getMoveWidth();
        track.classList.add('is-sliding');
        track.style.transform = `translateX(-${width}px)`;

        const onEnd = () => {
            track.style.transition = "none"; 
            track.classList.remove('is-sliding');
            track.appendChild(track.firstElementChild);
            track.style.transform = `translateX(0)`;
            
            setTimeout(() => { isTransitioning = false; }, 50);
            track.removeEventListener('transitionend', onEnd);
        };
        track.addEventListener('transitionend', onEnd);
    });

    prevBtn.addEventListener('click', () => {
        if (isTransitioning) return;
        isTransitioning = true;

        const width = getMoveWidth();
        track.style.transition = "none";
        track.classList.remove('is-sliding');
        track.prepend(track.lastElementChild);
        track.style.transform = `translateX(-${width}px)`;

        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                track.classList.add('is-sliding');
                track.style.transition = ""; // Khôi phục từ CSS
                track.style.transform = `translateX(0)`;
            });
        });

        setTimeout(() => { isTransitioning = false; }, 450);
    });
}); 
