<template>
  <div class="shopping-cart">
    <h2 class="title">Shopping Cart</h2>

    <div v-if="cartItems.length === 0" class="empty-cart-message">
      Your cart is empty.
    </div>

    <div class="cart-items">
      <div v-for="item in cartItems" :key="item.cartItemId" class="cart-item">
        <div class="product-info">
          <img :src="item.product.imageName" alt="Product Image" class="product-image" />
          <div class="product-details">
            <div class="product-name">{{ item.product.name }}</div>
            <div class="product-price">{{ formatCurrency(item.product.price) }}</div>
            <div class="product-quantity">
              <button class="quantity-button" @click="decreaseQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button class="quantity-button" @click="increaseQuantity(item)">+</button>
            </div>
            <div class="product-subtotal">
              Subtotal: {{ formatCurrency(item.quantity * item.product.price) }}
            </div>
          </div>
        </div>
        <button class="delete-button" @click="deleteItem(item)">
          <font-awesome-icon icon="fa-solid fa-trash-alt" />
        </button>
      </div>
    </div>

    <div v-if="cartItems.length> 0" class="cart-summary">
      <div class="subtotal">
        <span class="label">Subtotal:</span>
        {{ formatCurrency(itemSubtotal) }}
      </div>
      <div class="tax">
        <span class="label">Tax:</span>
        {{ formatCurrency(tax) }}
      </div>
      <div class="total">
        <span class="label">Total:</span>
        {{ formatCurrency(total) }}
      </div>
    </div>

    <button v-if="cartItems.length > 0" class="clear-cart-button" @click="clearCart">
      Clear Cart
    </button>

    <button class="checkout-button" @click="checkout">
      Proceed to Checkout
    </button>
  </div>
</template>

<script>
import ShoppingCartService from "../services/ShoppingCartService.js";

export default {
  name: "ShoppingCartView",
  data() {
    return {
      cartItems: [],
      itemSubtotal: 0,
      tax: 0,
      total: 0
    };
  },
  created() {
    this.getCartItems();
  },
  methods: {
    getCartItems() {
      ShoppingCartService.getCartItems()
        .then(response => {
          this.cartItems = response.data.items;
          this.itemSubtotal = response.data.itemSubtotal;
          this.tax = response.data.tax;
          this.total = response.data.total;
        })
        .catch(error => {
          console.log(error);
        });
    },
    formatCurrency(price) {
      const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
      });
      return formatter.format(price);
    },
    decreaseQuantity(item) {
      if (item.quantity > 1) {
        ShoppingCartService.updateCartItemQuantity(item.cartItemId, item.quantity - 1)
          .then(() => {
            item.quantity--;
          })
          .catch(error => {
            console.log(error);
          });
      }
    },
    increaseQuantity(item) {
      ShoppingCartService.updateCartItemQuantity(item.cartItemId, item.quantity + 1)
        .then(() => {
          item.quantity++;
        })
        .catch(error => {
          console.log(error);
        });
    },
    deleteItem(item) {
      ShoppingCartService.deleteCartItem(item.cartItemId)
        .then(() => {
          this.cartItems = this.cartItems.filter(cartItem => cartItem.cartItemId !== item.cartItemId);
        })
        .catch(error => {
          console.log(error);
        });
    },
    clearCart() {
      ShoppingCartService.clearCart().then(() => {
        this.cartItems = [],
        this.itemSubtotal = 0,
        this.tax = 0,
        this.total = 0;
      })
      .catch(error => {
        console.log(error);
      });
    },
    checkout() {
      // Implement the checkout logic
    }
  }
};

</script>

<style scoped>
.shopping-cart {
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f5f5f5;
  color: #333;
  font-family: 'Arial', sans-serif;
}

.title {
  font-size: 28px;
  margin-bottom: 20px;
  text-align: center;
}

.empty-cart-message {
  font-size: 18px;
  text-align: center;
  color: #999;
}

.cart-items {
  margin-top: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 20px;
  background-color: #fff;
}

.product-info {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.product-image {
  width: 100px;
  height: 100px;
  margin-right: 20px;
  border-radius: 50%;
  object-fit: cover;
}

.product-details {
  flex-grow: 1;
}

.product-name {
  font-size: 20px;
  margin-bottom: 10px;
}

.product-price {
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
}

.product-quantity {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.quantity-button {
  font-size: 18px;
  padding: 5px 10px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  margin: 0 5px;
}

.product-subtotal {
  font-size: 18px;
  margin-bottom: 10px;
  color: #555;
}

.delete-button {
  font-size: 18px;
  padding: 5px 10px;
  border: none;
  background-color: #ff0000;
  color: #fff;
  cursor: pointer;
}

.cart-summary {
  margin-top: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.subtotal,
.tax,
.total {
  margin-left: 30px;
}

.subtotal .label,
.tax .label,
.total .label {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}

.checkout-button {
  font-size: 16px;
  padding: 10px 20px;
  margin-left: 250px;
  border: none;
  background-color: #007bff;
  color: #fff;
  cursor: pointer;
  margin-top: 20px;
}

.clear-cart-button {
  font-size: 16px;
  padding: 10px 20px;
  border: none;
  background-color: #ff0000;
  color: #fff;
  cursor: pointer;
  margin-top: 40px;
}
</style>
