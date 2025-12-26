# 📦 Inventory Dashboard System

A professional, responsive administrative dashboard designed for real-time inventory management. This application features a modular sidebar navigation system and a "Quick Stats" overview to help users monitor stock levels at a glance.

> [!TIP]
> **🚀 Live Demonstration:** [Click here to view the deployed app](https://chivil2.github.io/Inventory-tracker-Appdev/)

---

## ✨ Features

* **Modular Sidebar Navigation:** Uses custom `data-app` attributes to switch between Dashboard, Inventory, Orders, and Categories without reloading the page.
* **Dynamic Quick Stats:** A centralized grid displaying "Total Items," "Low Stock Alerts," and "Pending Orders."
* **Inventory Alert System:** High-visibility alerts for items requiring immediate attention or restocking.
* **Responsive Dashboard UI:** Built with a modern sidebar-to-main-content layout that works across different screen resolutions.
* **FontAwesome Integration:** Professional iconography for a better user experience (UX).

---

## 🛠️ Tech Stack

| Category | Technology |
| :--- | :--- |
| **Structure** | HTML5 (Semantic tags like `<aside>`, `<main>`, `<section>`) |
| **Styling** | CSS3 (Flexbox/Grid for dashboard layout) |
| **Logic** | JavaScript (DOM Manipulation via `dashboard.js`) |
| **Icons** | FontAwesome 6.4.0 |
| **Hosting** | GitHub Pages |

---

## 📂 Project Structure

```text
Inventory-tracker-Appdev/
├── index.html          # Core dashboard structure and navigation
├── styles/
│   ├── main.css        # Global variables and resets
│   └── dashboard.css   # Sidebar, grid, and card-specific styling
├── scripts/
│   └── dashboard.js    # Handles dynamic app switching and data loading
└── README.md           # Project documentation