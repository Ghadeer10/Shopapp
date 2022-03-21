import { ADD_ORDER } from "../actions/orders";
import OrderItems from '../../models/orderItems';

const initialState = {
    orders: []
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_ORDER:

            const newOrder = new OrderItems(
                new Date().toString(),
                action.orderData.items,
                action.orderData.amount,
                new Date());
            return {
                ...state,
                orders: state.orders.concat(newOrder)
            };
    }


    return state;
}