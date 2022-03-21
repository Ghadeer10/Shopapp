import PRODUCTS from '../../data/4.1 dummy-data';
import Product from '../../models/Product';
import { CREATE_PRODUCTS, DELETE_PRODUCTS, EDIT_PRODUCTS, SET_PRODUCTS } from '../actions/productsAction';
import ProductsDetailsScreen from './../../screens/shop/ProductsDetailsScreen';

const initialState = {
    availableProducts: PRODUCTS,
    userProducts: PRODUCTS.filter(prod => prod.ownerId === 'u1')
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: action.products,
                userProducts: action.products.filter(prod => prod.ownerId === 'u1')
            }
        case CREATE_PRODUCTS:
            const newProduct = new Product(
                new Date().toString(),
                'u1',
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                action.productData.price);

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct),
            }

        case EDIT_PRODUCTS:
            const productIndex = state.userProducts.findIndex(prod => prod.id === action.pid)

            const updatedProduct = new Product(
                action.pid,
                state.userProducts[productIndex].ownerId,
                action.productData.title,
                action.productData.imageUrl,
                action.productData.description,
                state.userProducts[productIndex].price,
            );

            const updatedUserProducts = [...state.userProducts];
            updatedUserProducts[productIndex] = updatedProduct;

            const avaliableProductsIndex = state.availableProducts.findIndex(prod => prod.id === action.pid);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[avaliableProductsIndex] = updatedProduct;

            return {
                ...state,
                availableProducts: updatedAvailableProducts,
                userProducts: updatedUserProducts
            };

        case DELETE_PRODUCTS:

            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== action.pid),
                availableProducts: state.availableProducts.filter(product => product.id !== action.pid),
            };

    }
    return state;

};
