import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        buyerId: null,
        cartCount: 0,
        totalPrice: 0,
    },
    reducers: {
        addProduct: (state, action) => {
            const newProduct = action.payload;
            const existingProduct = state.products.find(
                (product) => product.id === newProduct.id
            );

            if (existingProduct) {
                // If product exists, increase its quantity
                existingProduct.quantity += 1;
                state.cartCount += 1;
            } else {
                // If product does not exist, add it as a new product
                state.products.push({ ...newProduct, quantity: 1 });
                state.cartCount += 1;
            }
        },

        increaseQuantity: (state, action) => {
            const product = state.products.find(
                (product) => product.id === action.payload
            );

            if (product) {
                product.quantity += 1;
                state.cartCount += 1;
            }
        },

        decreaseQuantity: (state, action) => {
            const product = state.products.find(
                (product) => product.id === action.payload
            );

            if (product && product.quantity > 1) {
                product.quantity -= 1;
                state.cartCount -= 1;
            }
        },

        removeItem: (state, action) => {
            state.products = state.products.filter(
                (product) => product.id !== action.payload
            );
            // Update cart count based on the remaining items
            state.cartCount = state.products.reduce(
                (count, product) => count + product.quantity,
                0
            );
        },

        setBuyerId: (state, action) => {
            state.buyerId = action.payload;
        },
        setTotalPrice: (state, action) => {
            state.totalPrice = action.payload;
        },
        clearCart: (state) => {
            state.products = [];
            state.cartCount = 0;
            state.totalPrice = 0;
            state.buyerId = null;
        },

    },
});

export const { addProduct, increaseQuantity, decreaseQuantity, removeItem, setBuyerId ,setTotalPrice,clearCart } = cartSlice.actions;

export default cartSlice.reducer;
