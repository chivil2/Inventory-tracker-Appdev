document.addEventListener('DOMContentLoaded', function() {
    console.log("Dashboard loaded!");
    
    const navLinks = document.querySelectorAll('.sidebar a[data-app]');
    const appCards = document.querySelectorAll('.app-card');
    const appContainer = document.getElementById('app-container');
    const pageTitle = document.getElementById('page-title');
    const newBtn = document.getElementById('new-btn');
    
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
        setTimeout(() => {
            if (appName === 'dashboard') {
                loadDashboard();
            } else if (appName === 'inventory') {
                loadInventory();
            } else if (appName === 'orders') {
                appContainer.innerHTML = `<h2>${appName} App</h2><p>EeEEHHH?????</p>`;
            } else{
                appContainer.innerHTML = `<h2>${appName} Section</h2><p>Categories coming soon...</p>`;
            }
        }, 300);
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
        `;
        
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
});