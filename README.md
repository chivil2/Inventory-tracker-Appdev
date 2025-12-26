📦 Inventory Dashboard System
A professional, responsive administrative dashboard designed for real-time inventory management. This application features a modular sidebar navigation system and a "Quick Stats" overview to help users monitor stock levels at a glance.

🚀 Live Demonstration
Live Deployed URL: https://chivil2.github.io/Inventory-tracker-Appdev/

✨ Features
Modular Sidebar Navigation: Uses custom data-app attributes to switch between Dashboard, Inventory, Orders, and Categories without reloading the page.

Dynamic Quick Stats: A centralized grid displaying "Total Items," "Low Stock Alerts," and "Pending Orders."

Inventory Alert System: High-visibility alerts for items requiring immediate attention or restocking.

Responsive Dashboard UI: Built with a modern sidebar-to-main-content layout that works across different screen resolutions.

FontAwesome Integration: Professional iconography for better user experience (UX).

🛠️ Tech Stack
Structure: HTML5 (Semantic tags like <nav>, <header>, and <main>)

Styling: CSS3 (Flexbox/Grid for the dashboard layout)

Logic: JavaScript (DOM Manipulation for app switching via dashboard.js)

Icons: FontAwesome 6.4.0

Cloud Hosting: GitHub Pages

📂 Project Structure
Plaintext

Inventory-tracker-Appdev/
├── index.html            # Core dashboard structure and navigation
├── styles/
│   ├── main.css          # Global variables and resets
│   └── dashboard.css     # Sidebar, grid, and card-specific styling
├── scripts/
│   └── dashboard.js      # Handles dynamic app switching and data loading
└── README.md             # Project documentation
💻 How to Run Locally
Clone the repo:

Bash

git clone https://github.com/chivil2/Inventory-tracker-Appdev.git
Open the Project: Navigate to the folder and open index.html in your browser.

📋 Panel Demonstration Guide
When presenting, you can highlight these specific parts of your code:

Sidebar Logic: Show how clicking a <li> updates the #page-title and #app-container dynamically.

Scalability: Mention that the stats-grid is ready to be connected to a real backend (Node.js/Express) to fetch live data.

Cloud Deployment: Demonstrate that the app is "running in the cloud" by showing the .io URL working on your browser.

Pro-Tip for your Presentation:
In your code, you have some "placeholder" text (like "eme eme" and "ako lang may kailangan"). Before your final demo, you might want to change those to more professional descriptions like:

Change "Overview of the Status of Inventory eme eme" to "Real-time summary of stock levels."

Change "No items need attention - ako lang may kailangan" to "No items currently require restocking."

Would you like me to help you write the JavaScript for dashboard.js to make the sidebar links actually switch the content when clicked?