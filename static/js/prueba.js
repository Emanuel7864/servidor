// Variables y funciones globales
let inventory = [
    { name: "Producto 1", category: "Categoría A", quantity: 50, price: 20.0 },
    { name: "Producto 2", category: "Categoría B", quantity: 20, price: 15.0 }
  ];
  
  // Actualizar tabla de inventario
  function updateInventoryTable() {
    const tableBody = document.querySelector(".inventory-table tbody");
    tableBody.innerHTML = ""; // Limpiar contenido actual
    inventory.forEach((product, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.quantity}</td>
        <td>$${product.price.toFixed(2)}</td>
        <td>
          <button onclick="editProduct(${index})">Editar</button>
          <button onclick="deleteProduct(${index})">Eliminar</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }
  
  // Agregar producto
  document.querySelector(".add-product-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("product-name").value;
    const category = document.getElementById("category").value;
    const quantity = parseInt(document.getElementById("quantity").value, 10);
    const price = parseFloat(document.getElementById("price").value);
  
    inventory.push({ name, category, quantity, price });
    updateInventoryTable();
    this.reset();
  });
  
  // Eliminar producto
  function deleteProduct(index) {
    inventory.splice(index, 1);
    updateInventoryTable();
  }
  
  // Editar producto
  function editProduct(index) {
    const product = inventory[index];
    document.getElementById("product-name").value = product.name;
    document.getElementById("category").value = product.category;
    document.getElementById("quantity").value = product.quantity;
    document.getElementById("price").value = product.price;
  
    document.querySelector(".add-product-form button").textContent = "Actualizar Producto";
    document.querySelector(".add-product-form").onsubmit = function (event) {
      event.preventDefault();
      inventory[index] = {
        name: document.getElementById("product-name").value,
        category: document.getElementById("category").value,
        quantity: parseInt(document.getElementById("quantity").value, 10),
        price: parseFloat(document.getElementById("price").value)
      };
      updateInventoryTable();
      this.reset();
      this.onsubmit = addProductHandler;
      document.querySelector(".add-product-form button").textContent = "Agregar Producto";
    };
  }
  
  // Registrar movimiento de inventario
  document.querySelector(".transaction-form form").addEventListener("submit", function(event) {
    event.preventDefault();
    const productName = document.getElementById("product").value;
    const transactionQuantity = parseInt(document.getElementById("quantity").value, 10);
    const transactionType = document.getElementById("transaction-type").value;
  
    const product = inventory.find(p => p.name === productName);
    if (product) {
      product.quantity += (transactionType === "entrada" ? transactionQuantity : -transactionQuantity);
      updateInventoryTable();
    }
    this.reset();
  });
  
  // Generar reportes
  document.querySelector(".report-section form").addEventListener("submit", function(event) {
    event.preventDefault();
    const reportType = document.getElementById("report-type").value;
    const startDate = new Date(document.getElementById("start-date").value);
    const endDate = new Date(document.getElementById("end-date").value);
  
    console.log(`Generando reporte ${reportType} de ${startDate.toLocaleDateString()} a ${endDate.toLocaleDateString()}`);
    // Aquí puedes agregar lógica adicional para generar el reporte
    alert(`Reporte ${reportType} generado`);
  });
  
  // Inicializar tabla al cargar la página
  updateInventoryTable();
  