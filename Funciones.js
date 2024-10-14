// Función para un desplazamiento suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({
      behavior: "smooth",
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const searchIcon = document.getElementById("search-icon");
  const searchBox = document.querySelector(".search-box");
  const closeSearch = document.getElementById("close-search");
  const searchInput = searchBox.querySelector("input");

  // Mostrar barra de búsqueda
  searchIcon.addEventListener("click", function () {
    searchBox.style.display = "block";
    searchInput.focus();
  });

  // Cerrar barra de búsqueda
  closeSearch.addEventListener("click", function () {
    searchBox.style.display = "none";
    searchInput.value = ""; // Limpiar el input al cerrar
    filterProducts(""); // Mostrar todos los productos
  });

  // Filtrar productos según la entrada
  searchInput.addEventListener("input", function () {
    const searchTerm = searchInput.value.toLowerCase();
    filterProducts(searchTerm);
  });

  function filterProducts(term) {
    const productCards = document.querySelectorAll(".card"); // Cambié .product-card a .card
    productCards.forEach((card) => {
      const productName = card
        .querySelector(".card-title")
        .textContent.toLowerCase(); // Obtener el nombre del producto de la tarjeta
      // Mostrar el producto si el término de búsqueda está en el nombre del producto
      if (productName.includes(term) || term === "") {
        card.style.display = "block"; // Mostrar producto
      } else {
        card.style.display = "none"; // Ocultar producto
      }
    });
  }
});

// Lógica del carrito
document.addEventListener("DOMContentLoaded", function () {
  // Lógica del carrito
  document.getElementById("cart-icon").addEventListener("click", function () {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.toggle("active");
  });

  document.getElementById("cart-close").addEventListener("click", function () {
    const cartModal = document.getElementById("cart-modal");
    cartModal.classList.remove("active");
  });

  let cart = [];

  function updateCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartCount = document.getElementById("cart-count");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-item";
      cartItem.innerHTML = `
          <span class="item-title">${item.name}</span>
          <div class="item-quantity-controls">
              <button onclick="changeQuantity('${item.name}', -1)">-</button>
              <span class="item-quantity">Cantidad: ${item.quantity}</span>
              <button onclick="changeQuantity('${item.name}', 1)">+</button>
          </div>
          <span class="remove-btn" onclick="removeFromCart('${item.name}')">Eliminar</span>
      `;
      cartItemsContainer.appendChild(cartItem);
      total += item.price * item.quantity;
    });

    cartCount.innerText = cart.length;
    cartTotal.innerText = `Total: $${total.toFixed(2)}`;
  }

  // Cambiar cantidad de productos
  window.changeQuantity = function (itemName, change) {
    const item = cart.find((item) => item.name === itemName);
    if (item) {
      item.quantity += change;
      if (item.quantity <= 0) {
        removeFromCart(itemName);
      } else {
        updateCart();
      }
    }
  };

  // Eliminar producto del carrito
  window.removeFromCart = function (itemName) {
    cart = cart.filter((item) => item.name !== itemName);
    updateCart();
  };

  function addToCart(name, price, quantity) {
    const existingItem = cart.find((item) => item.name === name);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ name, price, quantity });
    }
    updateCart();
  }

  // Cambia aquí a .card-button
  document.querySelectorAll(".card-button").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      const productName = button.getAttribute("data-name");
      const productPrice = parseFloat(button.getAttribute("data-price"));
      addToCart(productName, productPrice, 1);
    });
  });
});
