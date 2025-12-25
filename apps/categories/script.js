document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('add-category-form');
    const categoriesList = document.getElementById('categories-list');
    
    // Sample data
    let categories = [
        { id: 1, name: "Office Supplies", itemCount: 3 },
        { id: 2, name: "Electronics", itemCount: 0 },
        { id: 3, name: "Furniture", itemCount: 5 }
    ];

    // Display categories
    function renderCategories() {
        if (categories.length === 0) {
            const emptyMessages = [
                "<p class='empty'>No categories yet. Add your first category!</p><p class='empty'>Walang laman pa! 📋</p>",
                "<p class='empty'>Category list is empty!</p><p class='empty'>Time to organize! 🗂️</p>",
                "<p class='empty'>No categories found...</p><p class='empty'>Let's create some! ✨</p>",
                "<p class='empty'>Start organizing now!</p><p class='empty'>Add your first category 📂</p>",
                "<p class='empty'>Empty categories...</p><p class='empty'>Mag-organize na tayo! 💼</p>"
            ];
            const randomIndex = Math.floor(Math.random() * emptyMessages.length);
            categoriesList.innerHTML = emptyMessages[randomIndex];
            return;
        }
        
        let html = `
            <table class="categories-table">
                <thead> 
                    <tr>
                        <th>Category Name</th>
                        <th>Items</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
        `;

        categories.forEach(category => {
            html += `
                <tr class="category-row" data-id="${category.id}">
                    <td class="category-name">
                        <i class="fas fa-tag"></i> ${category.name}
                    </td>
                    <td class="category-count">${category.itemCount} items</td>
                    <td class="category-actions">
                        <button class="edit-btn btn" onclick="editCategory(${category.id})" title="Edit Category">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="delete-btn btn" onclick="deleteCategory(${category.id})">
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

        categoriesList.innerHTML = html;
    }

    // Add category
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('category-name').value.trim();
        
        if (name) {
            // Check for duplicates
            const exists = categories.some(cat => cat.name.toLowerCase() === name.toLowerCase());
            if (exists) {
                alert('Category already exists!');
                return;
            }

            const newCategory = {
                id: Date.now(),
                name: name,
                itemCount: 0
            };
            
            categories.push(newCategory);
            renderCategories();
            form.reset();
        }
    });
    
    // Edit category
    window.editCategory = function(id) {
        const category = categories.find(c => c.id === id);
        if (category) {
            const newName = prompt('Edit category name:', category.name);
            if (newName && newName.trim()) {
                category.name = newName.trim();
                renderCategories();
            }
        }
    };
    
    // Delete category
    window.deleteCategory = function(id) {
        if (confirm('Delete this category? This will not delete the items.')) {
            categories = categories.filter(c => c.id !== id);
            renderCategories();
        }
    };
    
    renderCategories();
});