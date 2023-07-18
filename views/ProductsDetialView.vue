<template>
    <div class="product-details">
      <h2 class="title">Product Details</h2>
      <div class="product-info">
        <div class="label">SKU:</div>
        <div class="value">{{ product.productSku }}</div>
      </div>
      <div class="product-info">
        <div class="label">Name:</div>
        <div class="value">{{ product.name }}</div>
      </div>
      <div class="product-info">
        <div class="label">Description:</div>
        <div class="value">{{ product.description }}</div>
      </div>
      <div class="product-info">
        <div class="label">Price:</div>
        <div class="value">{{ formatCurrency(product.price) }}</div>
      </div>
      <div class="product-info">
        <div class="label">Image:</div>
        <div class="value">
          <img :src="product.imageName" alt="Product Image" class="product-image" />
        </div>
      </div>
  
      <button v-if="isLoggedIn" class="add-to-cart" @click="addToCart(product)">Add to Cart</button>
      <div v-else class="login-prompt">
        <p>Please login to add items to your cart.</p>
        <router-link to="/login" class="login-button">Login</router-link>
    </div>
      <div v-if="showSuccessMessage" class="success-message">Product has been added to your cart!</div>
    </div>
  </template>
  
  <script>
  import productService from "../services/ProductsService.js";
  import ShoppingCartService from "../services/ShoppingCartService.js"
  
  export default {
    name: "ProductDetailsView",
    data() {
      return {
        product: {},
        isInCart: false,
        isAddedToCart: false,
        showSuccessMessage: false,
      };
    },
    computed: {
      isLoggedIn() {
        return this.$store.state.token.length > 0;
      },
    },
    methods: {
      getProductDetails() {
        const productId = this.$route.params.id;
        productService.getProduct(productId).then((response) => {
          this.product = response.data;
          this.checkCart();
        });
      },
      checkCart() {
        this.isInCart = false;
      },
      addToCart() {
        const productId = this.product.productId;
        const quantity = 1;

        ShoppingCartService.addToCart(productId, quantity).then(() => {
          this.showSuccessMessage = true;
        })
        .finally();
      },
      formatCurrency(price) {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        });
        return formatter.format(price);
      },
    },
    created() {
      this.getProductDetails();
    },
  };
  </script>

<style scoped>
.product-details {
  padding: 20px;
  background-color: #444444;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  color: #ffffff;
}

.title {
  font-size: 24px;
  margin-bottom: 20px;
}

.product-info {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.label {
  font-weight: bold;
  width: 100px;
  color: #cccccc;
}

.value {
  flex-grow: 1;
  color: #ffffff;
}

.add-to-cart {
  background-color: #8e44ad;
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart:hover {
  background-color: #6c3483;
}

.product-image {
  width: 100%;
  max-width: 300px;
  height: auto;
  margin-top: 10px;
}

.success-message {
  color: green;
}
</style>