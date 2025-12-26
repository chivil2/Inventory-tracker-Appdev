document.addEventListener('DOMContentLoaded', function() {
    console.log("Dashboard loaded!");
    
    const navLinks = document.querySelectorAll('.sidebar a[data-app]');
    const appCards = document.querySelectorAll('.app-card');
    const appContainer = document.getElementById('app-container');
    const pageTitle = document.getElementById('page-title');
    const newBtn = document.getElementById('new-btn');
    
    updateDashboardStats();

    // Listen for messages from iframes
    window.addEventListener('message', function(e) {
        if (e.data === 'updateStats') {
            console.log('Stat update message received from iframe');
            updateDashboardStats();
        }
    });

    // Navigation click
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Update active state
            navLinks.forEach(l => l.parentElement.classList.remove('active'));
            this.parentElement.classList.add('active');
            
            // Load app
            const appName = this.getAttribute('data-app');
            loadApp(appName);
        });
    });
    
    // App card click
    appCards.forEach(card => {
        card.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            
            // Update navigation
            navLinks.forEach(link => {
                link.parentElement.classList.remove('active');
                if (link.getAttribute('data-app') === appName) {
                    link.parentElement.classList.add('active');
                }
            });
            
            loadApp(appName);
        });
    });
    
    // New button
    newBtn.addEventListener('click', function() {
        const activeApp = document.querySelector('.sidebar li.active a').getAttribute('data-app');
        alert(`Create new item for: ${activeApp}`);
    });
    
    // Load app function
    function loadApp(appName) {
        console.log(`Loading: ${appName}`);
        
        // Update title
        pageTitle.textContent = appName.charAt(0).toUpperCase() + appName.slice(1);
        
        // Show loading
        appContainer.innerHTML = '<div class="loading"><i class="fas fa-spinner fa-spin"></i> Loading...</div>';
        
        // Load app content
        if (appName === 'dashboard') {
            loadDashboard();
        } else if (appName === 'inventory') {
            loadInventory();
        } else if (appName === 'orders') {
            loadOrder();
        } else{
            loadCategories();
        }
    }
    
    function loadDashboard() {
        appContainer.innerHTML = `
            <div class="welcome">
                <h2>Welcome!</h2>
                <p>Select an app from the sidebar</p>
                <div class="app-grid">
                    <div class="app-card" data-app="inventory">
                        <i class="fas fa-cube"></i>
                        <h3>Inventory</h3>
                        <p>Track your items</p>
                    </div>
                    <div class="app-card" data-app="orders">
                        <i class="fas fa-shopping-cart"></i>
                        <h3>Orders</h3>
                        <p>Manage orders</p>
                    </div>
                    <div class="app-card" data-app="categories">
                         <i class="fas fa-list"></i>
                        <h3>Categories</h3>
                        <p>Check Categories</p>
                    </div>
                </div>
            </div>

            <div class="status-overview"> 
                <h2>Quick Stats</h2>
                    <p>Overview of the Status of Inventory eme eme</p>
                    <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-value" data-stat="total-items">0</div>
                            <i class="fas fa-cube"></i>
                        </div>
                        <div class="stat-title">Total Items</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-value" data-stat="low-stock-items">0</div>
                            <i class="fas fa-exclamation-circle"></i>
                            </div>
                            <div class="stat-title">Low Stock Items</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-value" data-stat="pending-orders">0</div>
                            <i class="fas fa-shopping-cart"></i>
                            </div>
                            <div class="stat-title">Pending Orders</div>
                    </div>
                     <div class="stat-card">
                        <div class="stat-header">
                            <div class="stat-value" data-stat="categories">0</div>
                            <i class="fas fa-list"></i>
                            </div>
                            <div class="stat-title">Categories</div>
                        </div>
                    </div>
                </div>

                <div class="action-required">
                    <h2>Inventory Alerts <i class="fas fa-exclamation-triangle"></i></h2>
                    <p>Items that need your attention</p>
                    <div class="alert-card">
                        <h3>No items need attention - ako lang may kailangan</h3>
                        <p>All items are sufficiently stocked.</p>
                    </div>
                </div>
        `;

        updateDashboardStats();
        
        // Re-attach event listeners
        document.querySelectorAll('.app-card').forEach(card => {
            card.addEventListener('click', function() {
                const appName = this.getAttribute('data-app');
                navLinks.forEach(link => {
                    link.parentElement.classList.remove('active');
                    if (link.getAttribute('data-app') === appName) {
                        link.parentElement.classList.add('active');
                    }
                });
                loadApp(appName);
            });
        });
    }

    async function updateDashboardStats() {
        console.log("Updating dashboard stats...");
        try {
            const res = await fetch('/api/items');
            if (!res.ok) {
                throw new Error(`Failed to fetch: ${res.status}`);
            }
            const items = await res.json();
            
            const totalItems = items.length;
            const lowStockItems = items.filter(item => item.quantity <= item.lowStockThreshold).length;

            const totalItemsEl = document.querySelector('[data-stat="total-items"]');
            const lowStockItemsEl = document.querySelector('[data-stat="low-stock-items"]');

            if (totalItemsEl) totalItemsEl.textContent = totalItems;
            if (lowStockItemsEl) lowStockItemsEl.textContent = lowStockItems;

        } catch (error) {
            console.error("Error updating dashboard stats:", error);
        }
    }
    
    function loadInventory() {
        // Load the inventory app in an iframe
        appContainer.innerHTML = `
            <div class="inventory-container">
                <iframe 
                    src="apps/inventory/index.html" 
                    class="app-frame"
                    title="Inventory Tracker"
                ></iframe>
            </div>
        `;
    }

    function loadOrder() {
        // Load the order management in an iframe
        appContainer.innerHTML = `
            <div class="order-container">
                <iframe 
                    src="apps/orders/index.html" 
                    class="app-frame"
                    title="Order Management"
                ></iframe>
            </div>
        `;
    }

    function loadCategories() {
        // Load the order management in an iframe
        appContainer.innerHTML = `
            <div class="categories-container">
                <iframe 
                    src="apps/categories/index.html" 
                    class="app-frame"
                    title="Item Categories"
                ></iframe>
            </div>
        `;
    }
   
});