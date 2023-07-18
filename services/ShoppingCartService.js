import axios from "axios";

export default {
  getCartItems() {
    return axios.get(`/cart`);
  },

  addToCart(productId, quantity) {
    return axios.post(`/cart/items`, { productId, quantity });
  },

  updateCartItemQuantity(cartItemId, quantity) {
    return axios.put(`/cart/items/${cartItemId}`, { quantity });
  },

  deleteCartItem(cartItemId) {
    return axios.delete(`/cart/items/${cartItemId}`);
  },

  clearCart() {
    return axios.delete(`/cart`);
  }
};