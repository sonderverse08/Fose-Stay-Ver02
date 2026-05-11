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
