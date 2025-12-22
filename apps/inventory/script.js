document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-form');
    const inventoryList = document.getElementById('inventory-list');
    
    // Sample data
    let items = [
        { id: 1, name: "Notebooks", quantity: 12 },
        { id: 2, name: "Pens", quantity: 5 },
        { id: 3, name: "Markers", quantity: 3 }
    ];
    
    // Display items
    function renderItems() {
        if (items.length === 0) {
            // ALISIN TO AHWHAWH
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
        
        let html = '';
        items.forEach(item => {
            const isLowStock = item.quantity < 5;
            html += `
                <div class="item ${isLowStock ? 'low-stock' : ''}" data-id="${item.id}">
                    <div>
                        <h3>${item.name}</h3>
                        <p>Quantity: <strong>${item.quantity}</strong></p>
                        ${isLowStock ? '<span class="warning">⚠️ Low stock!</span>' : ''}
                    </div>
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
    
    renderItems();
});