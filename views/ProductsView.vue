<template>
  <div class="home">
    <div id="heading-line">
      <h1>
        Products
        <loading-spinner id="spinner" v-bind:spin="isLoading" />
      </h1>
    </div>
    <p id="login-message" v-if="!isLoggedIn">
      Welcome! You may browse anonymously as much as you wish,<br />
      but you must
      <router-link v-bind:to="{ name: 'login' }">Login</router-link> to add
      items to your shopping cart.
    </p>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Search Products" />
    </div>
    <font-awesome-icon
      v-bind:class="{ 'view-icon': true, active: cardView }"
      v-on:click="cardView = true"
      icon="fa-solid fa-grip"
      title="View tiles"
    />
    <font-awesome-icon
      v-bind:class="{ 'view-icon': true, active: !cardView }"
      v-on:click="cardView = false"
      icon="fa-solid fa-table"
      title="View table"
    />
    <template v-if="cardView">
      <product-card :products="products" />
    </template>

    <template v-else>
  <div class="list-view">
    <div class="column">
      <div class="section-header">SKU</div>
      <ul>
        <li v-for="product in products" :key="product.productId">{{ product.productSku }}</li>
      </ul>
    </div>
    <div class="column">
      <div class="section-header">Name</div>
      <ul>
        <li v-for="product in products" :key="product.productId">{{ product.name }}</li>
      </ul>
    </div>
    <div class="column">
      <div class="section-header">Price</div>
      <ul>
        <li v-for="product in products" :key="product.productId">
          <span class="product-price">{{ formatCurrency(product.price) }}</span>
          <font-awesome-icon icon="fa-solid fa-cart-plus" class="add-cart-icon" />
        </li>
      </ul>
    </div>
  </div>
</template>
</div>
</template>

<script>
import productService from "../services/ProductsService.js";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import ProductCard from "../components/ProductCard.vue";

export default {
  name: "ProductsView",
  components: {
    LoadingSpinner,
    ProductCard,
  },
  data() {
    return {
      isLoading: false,
      cardView: true,
      products: [],
      searchQuery: "",
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.state.token.length > 0;
    },
    filteredProducts() {
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        return this.products.filter(
          (product) =>
            product.productSku.toLowerCase().includes(query) ||
            product.name.toLowerCase().includes(query)
        );
      } else {
        return this.products;
      }
    },
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      productService.listProducts().then((response) => {
        this.products = response.data;
      })
      .finally(() => {
        this.isLoading = false;
      });
    },
    formatCurrency(price) {
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      return formatter.format(price);
    },
    
  },

  created() {
    this.getProducts();
  }
};
</script>

<style scoped>
#spinner {
  color: #00ff00;
}

.view-icon {
  font-size: 1.5rem;
  margin-right: 10px;
  padding: 5px;
  color: #444;
  border-radius: 50%;
  transition: transform 0.3s ease;
}

.view-icon.active {
  background-color: #00ff00;
  transform: rotate(45deg);
}

.view-icon:not(.active) {
  font-size: 1.5rem;
  margin-right: 10px;
  cursor: pointer;
  transition: color 0.3s ease;
}

.view-icon:not(.active):hover {
  color: #00ffff;
  background-color: rgba(255, 255, 255, 0.7);
}

.home {
  padding: 20px;
  background-color: #222222;
  color: #fff;
  font-family: 'Arial', sans-serif;
}

#heading-line {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  font-size: 24px;
  margin: 0;
  color: #fff;
}

#spinner {
  margin-left: 10px;
}

h2 {
  font-size: 20px;
  margin-top: 20px;
  margin-bottom: 10px;
  color: #fff;
}

p {
  margin-bottom: 10px;
  color: #fff;
}

code {
  background-color: #f9f9f9;
  padding: 2px 4px;
  border-radius: 4px;
  font-family: Consolas, monospace;
}

input[type="checkbox"] {
  margin-top: 10px;
  margin-bottom: 20px;
}

#login-message {
  font-size: 16px;
  margin-bottom: 20px;
  text-align: center;
  color: #fff;
}

#login-message a {
  color: #8e44ad;
  text-decoration: none;
}

.list-view {
  display: flex;
  justify-content: center;
}

.column {
  flex: 1;
  margin: 10px;
  padding: 10px;
  background-color: #222;
  color: #fff;
  font-family: Arial, sans-serif;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.section-header {
  font-size: 18px;
  margin-bottom: 10px;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

li {
  margin-bottom: 10px; /* Increase or decrease as needed */
  padding: 5px;
  background-color: #111;
  border-radius: 3px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
}

.product-price {
  flex: 1;
  color: #fff;
}

.add-cart-icon {
  color: #8e44ad;
  font-size: 24px;
  margin-left: 10px;
}

.search-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.search-bar input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
  width: 200px;
  background-color: #555555;
  color: #fff;
}

.search-bar input::placeholder {
  color: #ccc;
}

.search-bar input:focus {
  outline: none;
  border-color: #00ff00;
}

@media screen and (max-width: 768px) {
  .product-card {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
}
</style>