
import React from 'react';
import { View, Text, StyleSheet, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CartItem from '../../components/CartItem';
import Colors from '../../constants/Colors';
import * as cartActions from '../../store/actions/cart';
import * as ordersActions from '../../store/actions/orders';

const CartScreen = props => {
    const cartTotalAmount = useSelector(state => state.cart.totalAmount);
    const cartItems = useSelector(state => {
        //transforming the items object to array
        const cartItemsArray = [];
        for (const key in state.cart.items) {
            cartItemsArray.push({
                productId: key,
                productTitle: state.cart.items[key].productTitle,
                productPrice: state.cart.items[key].productPrice,
                quantity: state.cart.items[key].quantity,
                sum: state.cart.items[key].sum,

            });
        }
        return cartItemsArray;

    });
    const dispatch = useDispatch();
    return (
        <View style={styles.screen}>
            <View style={styles.summary}>
                <Text style={styles.summaryText}>Total :
                    <Text style={styles.amount}>${Math.round(cartTotalAmount.toFixed(2) * 100) / 100}</Text>
                </Text>
                <Button
                    title="Order now"
                    color={Colors.accent}
                    disabled={cartItems.length === 0}
                    onPress={() => {
                        dispatch(ordersActions.addOrder(cartItems, cartTotalAmount));
                    }}
                />
            </View>
            <FlatList
                data={cartItems}
                keyExtractor={item => item.productId}
                renderItem={itemData => <CartItem
                    qty={itemData.item.quantity}
                    title={itemData.item.productTitle}
                    amount={itemData.item.sum}
                    deleteable
                    onRemove={() => {
                        dispatch(cartActions.removeFromCart(itemData.item.productId));
                    }} />}
            />
        </View>
    );
};

CartScreen.navigationOptions = {
    headerTitle: 'your Orders'
};


const styles = StyleSheet.create({
    screen: {
        margin: 20
    },
    amount: {
        color: Colors.primary

    },
    summary: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
    },
    summaryText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
});

export default CartScreen;