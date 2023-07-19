import { logout, userAuthenticated, userAuthenticatedError} from '../app/authenticationSlice';
import { newProduct, editProduct, setProductsError, deleteProduct, newProductError, deleteProductError, editProductError, addToCart, deleteFromShoppingCart, deleteFromShoppingCartError, addToCartError,  setShoppingCartError} from '../app/productsSlice';
import { toast } from 'react-toastify';

// function in function
// next --> we pass to the next middles in the pipeline, we return next, so we give it to the next
const ToastMiddleware = () => next => action => {
    switch(action.type) {
        case newProduct.type:
            toast.success('New product added successfully');
            break;
        case editProduct.type:
            toast.success('Product edited successfully');
            break;
        case deleteProduct.type:
            toast.success('Product deleted successfully');
            break;
        case addToCart.type:
            toast.success('Product added to cart successfully');
            break;
        case deleteFromShoppingCart.type:
            toast.success('Product deleted from cart successfully');   
            break;        
        case setProductsError.type:
            toast.error('Error loading products');
            break;
        case newProductError.type:
            toast.error('Error adding new product');
            break;
        case editProductError.type:
            toast.error('Error editing product');
            break;
        case deleteProductError.type:
            toast.error('Error deleting product');
            break; 
        case setShoppingCartError.type:
            toast.error('Error loading cart');
            break;
        case deleteFromShoppingCartError.type:
            toast.error('Error deleting from shopping cart');
            break;
        case addToCartError.type:
            toast.error('Error adding to cart')
            break;
        case userAuthenticated.type:
            toast.success("User successfully authenticated");
            break;
        case logout.type:
            toast.success("Logged out");
            break;
        case userAuthenticatedError.type:
            toast.error("User authentication failed");
            break;        
        default:
            break;
    }
    return next(action);
}

export default ToastMiddleware;
