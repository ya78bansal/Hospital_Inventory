

document.addEventListener('DOMContentLoaded', () => {
    const inventoryData = [
        { id: 1, name: 'Paracetamol', category: 'Analgesics', supplier: 'MedSupply Co.', stock: 120 },
        { id: 2, name: 'Aspirin', category: 'Analgesics', supplier: 'PharmaWorld', stock: 75 },
        { id: 3, name: 'Metformin', category: 'Antidiabetics', supplier: 'HealthLife', stock: 40 },  // Low stock
        { id: 4, name: 'Insulin', category: 'Antidiabetics', supplier: 'MediPlus', stock: 15 },  // Very low stock
        { id: 5, name: 'Atorvastatin', category: 'Cholesterol Meds', supplier: 'HealthLife', stock: 60 },
        { id: 6, name: 'Amoxicillin', category: 'Antibiotics', supplier: 'MedSupply Co.', stock: 200 },
        { id: 7, name: 'Omeprazole', category: 'Gastrointestinal', supplier: 'PharmaWorld', stock: 85 },
        { id: 8, name: 'Ciprofloxacin', category: 'Antibiotics', supplier: 'MedSupply Co.', stock: 45 },
        // Add more medicines as needed
    ];

    const categories = ['Analgesics', 'Antidiabetics', 'Cholesterol Meds', 'Antibiotics', 'Gastrointestinal'];
    const suppliers = ['MedSupply Co.', 'PharmaWorld', 'HealthLife', 'MediPlus'];

    // Populate category and supplier filters
    const categoryFilter = document.getElementById('category-filter');
    const supplierFilter = document.getElementById('supplier-filter');

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier;
        option.textContent = supplier;
        supplierFilter.appendChild(option);
    });

    // Populate inventory table
    const tableBody = document.querySelector('#inventory-table tbody');
    function renderTable(data) {
        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.supplier}</td>
                <td>${item.stock}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    renderTable(inventoryData);

    // Chart.js configuration for pie chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: ['Analgesics', 'Antidiabetics', 'Cholesterol Meds', 'Antibiotics', 'Gastrointestinal'],
            datasets: [{
                data: [195, 55, 60, 245, 85], // Stock data for each category
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'], // Custom colors
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        },
                    },
                },
            },
        },
    });

    // Dynamic stock color logic
    const getStockColor = (stock) => {
        if (stock < 20) {
            return '#ff4d4d'; // Red for low stock
        } else if (stock >= 20 && stock < 50) {
            return '#ffcc00'; // Yellow for moderate stock
        } else {
            return '#33cc33'; // Green for high stock
        }
    };

    // Chart.js configuration for bar chart with dynamic colors
    const barCtx = document.getElementById('barChart').getContext('2d');
    const stockLevels = inventoryData.map(item => item.stock);
    const medicineNames = inventoryData.map(item => item.name);
    const stockColors = stockLevels.map(stock => getStockColor(stock));

    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: medicineNames,
            datasets: [{
                label: 'Stock Level',
                data: stockLevels,
                backgroundColor: stockColors, // Apply dynamic stock color
                borderColor: '#00aaff', // Turquoise border color
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: '#333',
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#333',
                    },
                },
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        },
                    },
                },
            },
        },
    });

    // Sorting table
    window.sortTable = (n) => {
        const table = document.getElementById("inventory-table");
        let rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
        let switchRows = true;
        dir = "asc";
        while (switchRows) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchCount++;
            } else {
                if (switchCount === 0 && dir === "asc") {
                    dir = "desc";
                    switchRows = true;
                }
            }
        }
    };

    // Pagination logic
    let currentPage = 1;
    const rowsPerPage = 5;
    const tableRows = Array.from(document.querySelectorAll('#inventory-table tbody tr'));
    const totalPages = Math.ceil(tableRows.length / rowsPerPage);

    function displayPage(page) {
        tableRows.forEach((row, index) => {
            row.style.display = (index >= (page - 1) * rowsPerPage && index < page * rowsPerPage) ? '' : 'none';
        });
        document.getElementById('page-info').textContent = `Page ${page} of ${totalPages}`;
        document.getElementById('prev-btn').disabled = page === 1;
        document.getElementById('next-btn').disabled = page === totalPages;
    }

    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPage(currentPage);
        }
    });

    displayPage(currentPage);

    // Filter functionality
    categoryFilter.addEventListener('change', applyFilters);
    supplierFilter.addEventListener('change', applyFilters);

    function applyFilters() {
        const category = categoryFilter.value;
        const supplier = supplierFilter.value;

        const filteredData = inventoryData.filter(item => {
            return (category === 'All' || item.category === category) &&
                   (supplier === 'All' || item.supplier === supplier);
        });

        renderTable(filteredData);
        // Recalculate pagination
        const filteredRows = Array.from(document.querySelectorAll('#inventory-table tbody tr'));
        totalPages = Math.ceil(filteredRows.length / rowsPerPage);
        currentPage = 1;
        displayPage(currentPage);
    }
    // Sample medicine-related recent activity data
const recentActivityData = [
    { medicine: 'Ampicillin', action: 'added', details: 'Ampicillin was added to the inventory.', time: '2 hours ago' },
    { medicine: 'Paracetamol', action: 'updated stock', details: 'Stock level for Paracetamol was updated.', time: '5 hours ago' },
    { medicine: 'Amoxicillin', action: 'removed', details: 'Amoxicillin expired and was removed from the inventory.', time: '1 day ago' },
    { medicine: 'Ciprofloxacin', action: 'dispensed', details: '20 units of Ciprofloxacin were dispensed to ward 3.', time: '3 hours ago' },
    { medicine: 'Ibuprofen', action: 'low stock', details: 'Ibuprofen stock level is critically low (only 10 units remaining).', time: '6 hours ago' }
];

// Function to render the recent activity
function renderRecentActivity(activityData) {
    const activityTimeline = document.querySelector('.activity-timeline');
    activityTimeline.innerHTML = ''; // Clear previous activity

    activityData.forEach(activity => {
        const activityCard = document.createElement('div');
        activityCard.classList.add('activity-card');

        let icon;
        switch (activity.action) {
            case 'added':
                icon = 'fa-capsules';
                break;
            case 'updated stock':
                icon = 'fa-sync-alt';
                break;
            case 'removed':
                icon = 'fa-trash';
                break;
            case 'dispensed':
                icon = 'fa-capsules';
                break;
            case 'low stock':
                icon = 'fa-exclamation-triangle';
                break;
            default:
                icon = 'fa-info-circle';
        }

        activityCard.innerHTML = `
            <div class="activity-icon">
                <i class="fa-solid ${icon}"></i>
            </div>
            <div class="activity-details">
                <h4>${activity.action.charAt(0).toUpperCase() + activity.action.slice(1)} Medicine</h4>
                <p>${activity.details}</p>
                <span class="activity-time">${activity.time}</span>
            </div>
        `;
        activityTimeline.appendChild(activityCard);
    });
    
}
// Call the function to render the activity on page load
renderRecentActivity(recentActivityData);
});









    // Example data for reports
    const monthlyUsageData = {
        'Analgesics': [10, 20, 15, 10, 5, 15, 20, 25, 30, 35, 25, 20],
        'Antidiabetics': [5, 10, 8, 6, 4, 8, 12, 15, 18, 20, 15, 10],
        'Cholesterol Meds': [8, 12, 10, 9, 7, 10, 14, 18, 22, 25, 20, 16],
        'Antibiotics': [25, 30, 28, 22, 18, 20, 25, 30, 35, 40, 30, 28],
        'Gastrointestinal': [12, 15, 14, 13, 10, 15, 18, 20, 22, 24, 20, 18]
    };

    const departmentUsageData = {
        'Emergency': [50, 60, 55, 50, 45, 60, 70, 80, 85, 90, 75, 60],
        'Cardiology': [40, 45, 42, 40, 35, 45, 50, 55, 60, 65, 50, 45],
        'Endocrinology': [30, 35, 33, 30, 28, 35, 40, 45, 50, 55, 40, 35],
        'Infectious Diseases': [60, 70, 68, 65, 60, 70, 80, 90, 100, 110, 85, 70],
        'Gastroenterology': [25, 30, 28, 25, 20, 30, 35, 40, 45, 50, 35, 30]
    };

    // Populate category and supplier filters
    const categoryFilter = document.getElementById('category-filter');
    const supplierFilter = document.getElementById('supplier-filter');

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    suppliers.forEach(supplier => {
        const option = document.createElement('option');
        option.value = supplier;
        option.textContent = supplier;
        supplierFilter.appendChild(option);
    });

    // Populate inventory table
    const tableBody = document.querySelector('#inventory-table tbody');
    function renderTable(data) {
        tableBody.innerHTML = ''; // Clear existing rows
        data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td>${item.supplier}</td>
                <td>${item.stock}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }
    renderTable(inventoryData);

    // Chart.js configuration for pie chart
    const pieCtx = document.getElementById('pieChart').getContext('2d');
    const categoryStock = categories.map(cat => 
        inventoryData.filter(item => item.category === cat).reduce((sum, item) => sum + item.stock, 0)
    );

    new Chart(pieCtx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: categoryStock,
                backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0', '#9966ff'],
            }],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        },
                    },
                },
            },
        },
    });

    // Dynamic stock color logic
    const getStockColor = (stock) => {
        if (stock < 20) {
            return '#ff4d4d'; // Red for very low stock
        } else if (stock >= 20 && stock < 50) {
            return '#ffcc00'; // Yellow for low stock
        } else {
            return '#33cc33'; // Green for high stock
        }
    };

    // Chart.js configuration for bar chart with dynamic colors
    const barCtx = document.getElementById('barChart').getContext('2d');
    const stockLevels = inventoryData.map(item => item.stock);
    const medicineNames = inventoryData.map(item => item.name);
    const stockColors = stockLevels.map(stock => getStockColor(stock));

    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: medicineNames,
            datasets: [{
                label: 'Stock Level',
                data: stockLevels,
                backgroundColor: stockColors,
                borderColor: '#00aaff',
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        color: '#333',
                    },
                },
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: '#333',
                    },
                },
            },
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: ${tooltipItem.raw}`;
                        },
                    },
                },
            },
        },
    });

    // Line Chart - Medicine Usage per Month
    const lineCtx = document.getElementById('lineChart').getContext('2d');
    const selectedCategory = categoryFilter.value;
    const usageData = monthlyUsageData[selectedCategory] || Array(12).fill(0);

    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: [{
                label: `${selectedCategory} Usage`,
                data: usageData,
                borderColor: '#007bff',
                backgroundColor: 'rgba(0, 123, 255, 0.2)',
                borderWidth: 2,
                fill: true,
            }],
        },
        options: {
            responsive: true,
            scales: {
                x: { beginAtZero: true, ticks: { color: '#333' } },
                y: { beginAtZero: true, ticks: { color: '#333' } },
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} units` },
                },
            },
        },
    });

    // Line Chart - Department-wise Usage
    const departmentCtx = document.getElementById('departmentChart').getContext('2d');
    const departmentUsage = departments.map(dept => departmentUsageData[dept] || Array(12).fill(0));

    new Chart(departmentCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            datasets: departments.map((dept, index) => ({
                label: dept,
                data: departmentUsage[index],
                borderColor: `hsl(${index * 360 / departments.length}, 70%, 50%)`,
                backgroundColor: `hsla(${index * 360 / departments.length}, 70%, 70%, 0.2)`,
                borderWidth: 2,
                fill: true,
            })),
        },
        options: {
            responsive: true,
            scales: {
                x: { beginAtZero: true, ticks: { color: '#333' } },
                y: { beginAtZero: true, ticks: { color: '#333' } },
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: { label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} units` },
                },
            },
        },
    });

    // Sorting table
    window.sortTable = (n) => {
        const table = document.getElementById("inventory-table");
        let rows, switching, i, x, y, shouldSwitch, dir, switchCount = 0;
        let switchRows = true;
        dir = "asc";
        while (switchRows) {
            switching = false;
            rows = table.rows;
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("TD")[n];
                y = rows[i + 1].getElementsByTagName("TD")[n];
                if (dir == "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                } else if (dir === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch = true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
                switchCount++;
            } else {
                if (switchCount === 0 && dir === "asc") {
                    dir = "desc";
                    switchRows = true;
                }
            }
        }
    };

    // Pagination logic
    let currentPage = 1;
    const rowsPerPage = 5;
    const tableRows = Array.from(document.querySelectorAll('#inventory-table tbody tr'));
    let totalPages = Math.ceil(tableRows.length / rowsPerPage);

    function displayPage(page) {
        tableRows.forEach((row, index) => {
            row.style.display = (index >= (page - 1) * rowsPerPage && index < page * rowsPerPage) ? '' : 'none';
        });
        document.getElementById('page-info').textContent = `Page ${page} of ${totalPages}`;
        document.getElementById('prev-btn').disabled = page === 1;
        document.getElementById('next-btn').disabled = page === totalPages;
    }

    document.getElementById('prev-btn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayPage(currentPage);
        }
    });

    document.getElementById('next-btn').addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            displayPage(currentPage);
        }
    });

    displayPage(currentPage);

    // Filter functionality
    categoryFilter.addEventListener('change', applyFilters);
    supplierFilter.addEventListener('change', applyFilters);

    function applyFilters() {
        const category = categoryFilter.value;
        const supplier = supplierFilter.value;

        const filteredData = inventoryData.filter(item => {
            return (category === 'All' || item.category === category) &&
                   (supplier === 'All' || item.supplier === supplier);
        });

        renderTable(filteredData);
        // Recalculate pagination
        const filteredRows = Array.from(document.querySelectorAll('#inventory-table tbody tr'));
        totalPages = Math.ceil(filteredRows.length / rowsPerPage);
        currentPage = 1;
        displayPage(currentPage);
    }

    // Sample medicine-related recent activity data
    const recentActivityData = [
        { medicine: 'Ampicillin', action: 'added', details: 'Ampicillin was added to the inventory.', time: '2 hours ago' },
        { medicine: 'Paracetamol', action: 'updated stock', details: 'Stock level for Paracetamol was updated.', time: '5 hours ago' },
        { medicine: 'Amoxicillin', action: 'removed', details: 'Amoxicillin expired and was removed from the inventory.', time: '1 day ago' },
        { medicine: 'Ciprofloxacin', action: 'dispensed', details: '20 units of Ciprofloxacin were dispensed to ward 3.', time: '3 hours ago' },
        { medicine: 'Ibuprofen', action: 'low stock', details: 'Ibuprofen stock level is critically low (only 10 units remaining).', time: '6 hours ago' }
    ];

    // Function to render the recent activity
    function renderRecentActivity(activityData) {
        const activityTimeline = document.querySelector('.activity-timeline');
        activityTimeline.innerHTML = ''; // Clear previous activity

        activityData.forEach(activity => {
            const activityCard = document.createElement('div');
            activityCard.classList.add('activity-card');

            let icon;
            switch (activity.action) {
                case 'added':
                    icon = 'fa-capsules';
                    break;
                case 'updated stock':
                    icon = 'fa-sync-alt';
                    break;
                case 'removed':
                    icon = 'fa-trash';
                    break;
                case 'dispensed':
                    icon = 'fa-capsules';
                    break;
                case 'low stock':
                    icon = 'fa-exclamation-triangle';
                    break;
                default:
                    icon = 'fa-info-circle';
            }

            activityCard.innerHTML = `
                <div class="activity-icon">
                    <i class="fa-solid ${icon}"></i>
                </div>
                <div class="activity-details">
                    <h4>${activity.action.charAt(0).toUpperCase() + activity.action.slice(1)} Medicine</h4>
                    <p>${activity.details}</p>
                    <span class="activity-time">${activity.time}</span>
                </div>
            `;
            activityTimeline.appendChild(activityCard);
        });
    }

    // Call the function to render the activity on page load
    renderRecentActivity(recentActivityData);

