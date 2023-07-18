<template>
    <section id="product-cards">
          <article class="product-card" v-for="product in products" v-bind:key="product.productId" @click="goToProductDetails(product.productId)">
            <div class="sku">{{ product.productSku }}</div>
            <div class="price">{{ formatCurrency(product.price) }}</div>
            <div class="product-name action" data-id="1">{{ product.name }}</div>
            <div class="product-image">
              <img :src="product.imageName">
            </div>
            <div>
              <button @click="addToCart(product)" >
              <font-awesome-icon icon="fa-solid fa-cart-plus" 
              class="add-cart-icon" />
            </button>
        </div>
        </article>
    </section>
</template>

<script>
import ShoppingCartService from "../services/ShoppingCartService.js"

    export default {
        Name: "ProductCard",
        props: [
          "products",
        ],
        methods: {
          goToProductDetails(productId) {
            this.$router.push({ name: "product-details", params: { id: productId}});
          },
          formatCurrency(price) {
            const formatter = new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            });
          return formatter.format(price);
          },
          addToCart() {
            const productId = this.product.productId;
            const quantity = 1;

            ShoppingCartService.addToCart(productId, quantity).then(() => {
              console.log('Item added to cart successfully')
            });
          },
        }
    }

</script>

<style scoped>
#product-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  grid-gap: 20px;
  margin-top: 20px;
}

.product-card {
  background-color: #555555;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 20px;
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-card .product-image {
  text-align: center;
}

.product-card .product-image img {
  max-width: 100%;
  height: auto;
}

.product-card .product-name {
  font-weight: bold;
  margin-top: 10px;
  color: #ffffff;
}

.product-card .price {
  color: #cccccc;
  margin-top: 5px;
}

.product-card .cart {
  text-align: right;
}

.product-card .icon {
  color: #cccccc;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.2s;
}

.product-card .icon:hover {
  color: #ff5f5f;
}
</style>