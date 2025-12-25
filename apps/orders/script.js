document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-order-form');
    const ordersList = document.getElementById('orders-list');
    
    // Sample data
    let orders = [
        { 
            id: 1, 
            customerName: "Juan Dela Cruz", 
            orderItem: "Notebooks",
            quantity: 5,
            status: "pending",
            orderDate: new Date().toLocaleDateString()
        },
        { 
            id: 2, 
            customerName: "Maria Santos", 
            orderItem: "Pens",
            quantity: 10,
            status: "completed",
            orderDate: new Date().toLocaleDateString()
        }
    ];

    let currentSearchTerm = '';
    let currentFilter = 'all';

    function getStatusClass(status) {
        return status; 
    }

    function getStatusLabel(status) {
        const labels = {
            'pending': 'Pending',
            'completed': 'Completed',
            'cancelled': 'Cancelled'
        };
        return labels[status] || status;
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
            renderOrders();
        }
    }
    
    function toggleFilter() {
        const filterContainer = document.getElementById('filter-container');

        filterContainer.classList.toggle('active');
        
        if (!filterContainer.classList.contains('active')) {
            currentFilter = 'all';
            document.getElementById('filter-select').value = 'all';
            renderOrders();
        }
    }

    function searchOrders(searchTerm) {
        currentSearchTerm = searchTerm.toLowerCase();
        renderOrders();
    }

    function filterOrders(filterValue) {
        currentFilter = filterValue;
        renderOrders();
    }

    function renderOrders() {
        let filteredOrders = orders.filter(order => {
            const matchesSearch = 
                order.customerName.toLowerCase().includes(currentSearchTerm) ||
                order.orderItem.toLowerCase().includes(currentSearchTerm);
            
            let matchesFilter = true;
            if (currentFilter !== 'all') {
                matchesFilter = order.status === currentFilter;
            }
            
            return matchesSearch && matchesFilter;
        });

        if (orders.length === 0) {
            const emptyMessages = [
                "<p class='empty'>No orders yet. Add your first order!</p><p class='empty'>Walang customer pa 😅</p>",
                "<p class='empty'>Order list empty... Nubayan bat wala kasi nagaorder 📢</p>",
                "<p class='empty'>So quiet here... 🦗</p><p class='empty'>Sinisermonan ata...</p>",
                "<p class='empty'>Zero orders today!</p><p class='empty'>Let's get that hustle going 💪</p>",
                "<p class='empty'>Waiting for customers...</p><p class='empty'>asan na kayoo~~ 📦</p>"
            ];
            const randomIndex = Math.floor(Math.random() * emptyMessages.length);
            ordersList.innerHTML = emptyMessages[randomIndex];
            return;
        }

        if (filteredOrders.length === 0) {
            ordersList.innerHTML = "<p class='empty'>No orders match your search/filter.</p>";
            return;
        }
        
        let html = `
            <table class="orders-table">
                <thead>
                    <tr>
                        <th>Customer</th>
                        <th>Item</th>
                        <th>Quantity</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        filteredOrders.forEach(order => {
            const statusClass = getStatusClass(order.status);
            const statusLabel = getStatusLabel(order.status);

            html += `
                <tr class="order-row" data-id="${order.id}">
                    <td class="customer-name">${order.customerName}</td>
                    <td>${order.orderItem}</td>
                    <td class="order-qty">${order.quantity}</td>
                    <td><span class="status ${statusClass}">${statusLabel}</span></td>
                    <td class="order-actions">
                        <button class="btn status-btn" onclick="changeStatus(${order.id})" title="Change Status">
                            <i class="fas fa-sync-alt"></i>
                        </button>
                        <button class="delete-btn btn" onclick="deleteOrder(${order.id})">
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

        ordersList.innerHTML = html;
    }
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const customerName = document.getElementById('customer-name').value.trim();
        const orderItem = document.getElementById('order-item').value.trim();
        const quantity = parseInt(document.getElementById('order-qty').value);
        
        if (customerName && orderItem && quantity > 0) {
            const newOrder = {
                id: Date.now(),
                customerName: customerName,
                orderItem: orderItem,
                quantity: quantity,
                status: 'pending',
                orderDate: new Date().toLocaleDateString()
            };
            
            orders.push(newOrder);
            renderOrders();
            form.reset();
        }
    });

    window.changeStatus = function(id) {
        const order = orders.find(o => o.id === id);
        if (order) {
            if (order.status === 'pending') {
                order.status = 'completed';
            } else if (order.status === 'completed') {
                order.status = 'cancelled';
            } else {
                order.status = 'pending';
            }
            renderOrders();
        }
    };
    
    window.deleteOrder = function(id) {
        if (confirm('Delete this order?')) {
            orders = orders.filter(o => o.id !== id);
            renderOrders();
        }
    };

    window.toggleSearch = toggleSearch;
    window.toggleFilter = toggleFilter;
    window.searchOrders = searchOrders;
    window.filterOrders = filterOrders;
    
    renderOrders();
});