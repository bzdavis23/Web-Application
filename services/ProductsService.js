import axios from "axios";

export default {

    listProducts() {
        return axios.get('/products');
    },

    getProduct(id) {
        return axios.get(`/products/${id}`);
    },

}