document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-form');
    const inventoryList = document.getElementById('inventory-list');
    
    let items = [];
    let currentSearchTerm = '';
    let currentFilter = 'all';

    const API_URL = '/api/items';

    /* Get status based on quantity */
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
    
    //for search toggle
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
//for filter toggle
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
        
        // Filter items based on search term and filter
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
            <table class="inventory-table">
                <thead> 
                    <tr>
                        <th>Item Name</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Generate item rows
        filteredItems.forEach(item => {
            const isLowStock = item.quantity < item.lowStockThreshold;
            const status = getStatus(item.quantity);
            const statusUpdate = getStatusUpdate(item.quantity);

            html += `
                <tr class="inventory-row ${isLowStock ? 'low-stock' : ''}" data-id="${item._id}">
                    <td class="item-name">
                        ${item.name}
                        ${isLowStock ? '<span class="warning">⚠️</span>' : ''}
                    </td>
                    <td class="item-qty">${item.quantity}</td>
                    <td><span class="status ${status}">${statusUpdate}</span></td>
                    <td class="item-actions">
                        <button class="qty-btn" onclick="updateQty('${item._id}', 1)">+</button>
                        <button class="qty-btn" onclick="updateQty('${item._id}', -1)">-</button>
                        <button class="delete-btn btn" onclick="deleteItem('${item._id}')">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>   
                </tr>
            `;
        });

        html += `
                </tbody>
            </table>
        `; 

        inventoryList.innerHTML = html;
    }

    async function fetchItems() {
        try {
            const response = await fetch(API_URL);
            items = await response.json();
            renderItems();
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    }

    // Add item
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const name = document.getElementById('item-name').value.trim();
        const quantity = parseInt(document.getElementById('item-qty').value);
        
        if (name && quantity > 0) {
            const newItem = { name, quantity };
            
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(newItem)
                });
                const createdItem = await response.json();
                items.push(createdItem);
                renderItems();
                form.reset();
                window.parent.postMessage('updateStats', '*');
            } catch (error) {
                console.error('Error adding item:', error);
            }
        }
    });
    
    // Global functions for buttons
    window.updateQty = async function(id, change) {
        const item = items.find(i => i._id === id);
        if (item) {
            const newQuantity = item.quantity + change;
            if (newQuantity < 0) return;

            try {
                const response = await fetch(`${API_URL}/${id}`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ quantity: newQuantity })
                });
                const updatedItem = await response.json();
                item.quantity = updatedItem.quantity;
                renderItems();
                window.parent.postMessage('updateStats', '*');
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        }
    };
    
    window.deleteItem = async function(id) {
        if (confirm('Delete this item?')) {
            try {
                await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
                items = items.filter(i => i._id !== id);
                renderItems();
                window.parent.postMessage('updateStats', '*');
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    // Expose functions to global scope
    window.toggleSearch = toggleSearch;
    window.toggleFilter = toggleFilter;
    window.searchInventory = searchInventory;
    window.filterInventory = filterInventory;
    
    fetchItems();
});