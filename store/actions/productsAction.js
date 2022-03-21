import Product from "../../models/Product";
export const DELETE_PRODUCTS = 'DELETE_PRODUCTS';
export const CREATE_PRODUCTS = 'CREATE_PRODUCTS';
export const EDIT_PRODUCTS = 'EDIT_PRODUCTS';
export const SET_PRODUCTS = 'SET_PRODUCTS';


export const fetchProducts = () => {
    return async dispatch => {
        try {
            const response = await fetch('https://my-first-project-8131c-default-rtdb.firebaseio.com/products.json');
            if (!response.ok) {
                throw new Error('smth went wrong');
            }

            const resData = await response.json();

            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(new Product(
                    key,
                    'u1',
                    resData[key].title,
                    resData[key].imageUrl,
                    resData[key].description,
                    resData[key].price));
            }

            dispatch({ type: SET_PRODUCTS, products: loadedProducts });




        } catch (err) {
            throw (err);
        }
    };
};
export const deleteProducts = productId => {
    return async dispatch => {

        await fetch(`https://my-first-project-8131c-default-rtdb.firebaseio.com/products/${productId}.json`, {
            method: 'DELETE',
        });
        dispatch({ type: DELETE_PRODUCTS, pid: productId });

    };
};
export const createProducts = (title, description, imageUrl, price) => {
    return async dispatch => {

        const response = await fetch('https://my-first-project-8131c-default-rtdb.firebaseio.com/products.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                imageUrl,
                price
            })
        });
        const resData = await response.json();

        consol.log(resData);

        dispatch({
            type: CREATE_PRODUCTS, productData: {
                title: title,
                description: description,
                imageUrl, // same as imageUrl = imageUrl
                price,
            }
        });
    };
};




export const editProducts = (id, title, description, imageUrl) => {
    return async dispatch => {

        await fetch(`https://my-first-project-8131c-default-rtdb.firebaseio.com/products/${id}.json`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                imageUrl,

            })
        });
        dispatch({
            type: EDIT_PRODUCTS, pid: id, productData: {
                title: title,
                description: description,
                imageUrl, // same as imageUrl = imageUrl
            }
        });
    };
}