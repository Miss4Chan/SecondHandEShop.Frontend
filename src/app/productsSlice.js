import { createSlice, createAction } from '@reduxjs/toolkit';

export const setProductsError = createAction('setProductsError');
export const newProductError = createAction('newProductError');
export const editProductError = createAction('editProductError');
export const deleteProductError = createAction('deleteProductError');
export const addToCartError = createAction('addToCartError');
export const setShoppingCartError = createAction('setShoppingCartError');
export const deleteFromShoppingCartError = createAction('deleteFromShoppingCartError');
export const setProductTypesError = createAction('setProductTypesError');
export const setProductSizesError = createAction('setProductSizesError');

export const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: [],
        cart : [],
        productTypes:[],
        productSizes:[],
        productSubcategories:[]
    },
    reducers: {
        setProductTypes:(state,action) => 
        {
            console.log("dali vlaga")
            return {...state, productTypes: [...action.payload]};
        },
        setProductSizes:(state,action)=>
        {
            return {...state, productSizes: [...action.payload]};
        },
        setProductSubcategories:(state,action)=>
        {
            return {...state, productSubcategories: [...action.payload]};
        },
        setProducts: (state, action) => {
            return {...state, products: [...action.payload]};
        },
        newProduct: (state, action) => {
            console.log("new")
            return {...state, products: [action.payload,...state.products]};
        },
        editProduct: (state, action) => {
            const products=state.products.map( p => {if(p.id === action.payload.id) {p = action.payload;} return p;}); 
            return {...state, products :[...products]};
        },
        deleteProduct: (state, action) => {
            const products = state.products.filter(p => p.id!== action.payload.id); 
            return {...state, products :[...products]};
        },
        addToCart: (state, action) => {
            return {...state, cart: [action.payload,...state.cart]};
        },
        setShoppingCart: (state, action) => {
            return {...state, cart: [...action.payload]};
        },
        deleteFromShoppingCart : (state, action) => {
            const cart = state.cart.filter(c => c.id!== action.payload.id); 
            return {...state, cart :[...cart]};
        },
    }
});

export const { setProducts, newProduct, editProduct,
     deleteProduct, addToCart, setShoppingCart,setProductSizes,
      deleteFromShoppingCart, setProductTypes,setProductSubcategories } = productsSlice.actions;

export default productsSlice.reducer;
