document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-form');
    const inventoryList = document.getElementById('inventory-list');
    
    // Sample data
    let items = [
        { id: 1, name: "Notebooks", quantity: 12 },
        { id: 2, name: "Pens", quantity: 5 },
        { id: 3, name: "Markers", quantity: 3 }
    ];

    let currentSearchTerm = '';
    let currentFilter = 'all';

    function getStatus(quantity){
        if (quantity === 0) return 'out-of-stock';
        if (quantity < 5) return 'low-stock';
        return 'in-stock';
    }

    function getStatusUpdate(quantity){
        if (quantity === 0) return 'Out of Stock';
        if (quantity < 5) return 'Low Stock';
        return 'In Stock';
    }
    
   function toggleSearch() {
    const searchContainer = document.getElementById('search-container');
    const searchInput = document.getElementById('search-input');

    searchContainer.classList.toggle('active');
    
    if (searchContainer.classList.contains('active')) {
        searchInput.focus();
    } else {
        searchInput.value = '';
        currentSearchTerm = '';
        renderItems();
    }
}   

function toggleFilter() {
    const filterContainer = document.getElementById('filter-container');

    filterContainer.classList.toggle('active');
    
    if (!filterContainer.classList.contains('active')) {
        currentFilter = 'all';
        document.getElementById('filter-select').value = 'all';
        renderItems();
    }
}

    function searchInventory(searchTerm) {
    currentSearchTerm = searchTerm.toLowerCase();
    renderItems();
    }

    function filterInventory(filterValue) {
        currentFilter = filterValue;
        renderItems();
    }


    // Display items
    function renderItems() {

        let filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(currentSearchTerm);
        
        let matchesFilter = true;
        if (currentFilter === 'low') {
            matchesFilter = item.quantity < 5 && item.quantity > 0;
        } else if (currentFilter === 'out') {
            matchesFilter = item.quantity === 0;
        }
        
            return matchesSearch && matchesFilter;
        });

        if (items.length === 0) {
            //Hello - Sooooo hindi to tatanggalin. Dagdag ka nalang bagong empty message dito HAHAHAHHA
            const emptyMessages = [
                "<p class='empty'>No items yet. Add your first item!</p><p class='empty'>or not ahah 😜</p>",
                "<p class='empty'>Inventory empty... like my fridge 🍃</p><p class='empty'>Add something!</p>",
                "<p class='empty'>It's quiet... too quiet...</p><p class='empty'>Add some items!</p>",
                "<p class='empty'>Nothing to see here!</p><p class='empty'>Add items to get started 📦</p>",
                "<p class='empty'>This inventory is lonelier than a Tuesday night</p><p class='empty'>Add items! 🎉</p>"
            ];
            const randomIndex = Math.floor(Math.random() * emptyMessages.length);
            inventoryList.innerHTML = emptyMessages[randomIndex];
            return;
        }
        
        let html = `
            <div class="inventory-header">
                <div>Item Name</div>
                <div>Quantity</div>
                <div>Status</div>
                <div>Actions</div>
            </div>
        `;

        filteredItems.forEach(item => {
            const isLowStock = item.quantity < 5;
            const status = getStatus(item.quantity);
            const statusUpdate = getStatusUpdate(item.quantity);

            html += `
                <div class="inventory-row" ${isLowStock >0 ? 'low-stock' : ''}" data-id="${item.id}">
                    <div class ="item-name">
                        ${item.name}
                        ${isLowStock > 0 ? '<span class="warning">⚠️</span>' : ''}
                    </div>
                    <div class="item-qty"> ${item.quantity}</div>
                    <span class="status ${status}">${statusUpdate}</span>
                    <div class="item-actions">
                        <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
                        <button class="qty-btn" onclick="updateQty(${item.id}, -1)">-</button>
                        <button class="delete-btn btn" onclick="deleteItem(${item.id})">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>   
                </div>
            `;
        });
        
        inventoryList.innerHTML = html;
    }
    
    // Add item
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('item-name').value.trim();
        const qty = parseInt(document.getElementById('item-qty').value);
        
        if (name && qty > 0) {
            const newItem = {
                id: Date.now(),
                name: name,
                quantity: qty
            };
            
            items.push(newItem);
            renderItems();
            form.reset();
        }
    });
    
    // Global functions for buttons
    window.updateQty = function(id, change) {
        const item = items.find(i => i.id === id);
        if (item) {
            item.quantity += change;
            if (item.quantity < 0) item.quantity = 0;
            renderItems();
        }
    };
    
    window.deleteItem = function(id) {
        if (confirm('Delete this item?')) {
            items = items.filter(i => i.id !== id);
            renderItems();
        }
    };

    window.toggleSearch = toggleSearch;
    window.toggleFilter = toggleFilter;
    window.searchInventory = searchInventory;
    window.filterInventory = filterInventory;
    
    renderItems();
});