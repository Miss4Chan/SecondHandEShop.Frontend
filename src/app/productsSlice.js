import { createSlice, createAction } from '@reduxjs/toolkit';

export const setProductsError = createAction('setProductsError');
export const newProductError = createAction('newProductError');
export const editProductError = createAction('editProductError');
export const deleteProductError = createAction('deleteProductError');

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
    },
    reducers: {
        setProducts: (state, action) => {
            return {...state, products: [...action.payload]};
        },
        newProduct: (state, action) => {
            return {...state, products: [action.payload,...state.products]};
        },
        editProduct: (state, action) => {
            const products=state.products.map( p => {if(p.id === action.payload.id) {p = action.payload;} return p;}); 
            return {...state, products :[...products]};
        },
        deleteProduct: (state, action) => {
            const products = state.products.filter(p => p.id!== action.payload.id); return {...state, products :[...products]};
        }
    }
});

export const { setProducts, newProduct, editProduct, deleteProduct } = productsSlice.actions;

export default productsSlice.reducer;
