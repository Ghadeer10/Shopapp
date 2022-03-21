import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import Colors from '../constants/Colors';
import CartItem from './CartItem';

const OrderItem = props => {
    const [showDetails, setShowDetails] = useState(false);
    return (
        <View style={styles.orderItem}>
            <View style={styles.summary}>
                <Text style={styles.amount}>${props.totalAmount.toFixed(2)}</Text>
                <Text style={styles.date}>{props.date}</Text>
            </View>
            <Button color={Colors.primary} title={showDetails ? 'Hide Details' : "Show details"} onPress={() => {
                setShowDetails(showDetails => !showDetails)
            }} />
            {showDetails && (<View style={styles.detailsItems}>

                {props.items.map(cartItem => (<CartItem
                    key={cartItem.productId}
                    qty={cartItem.quantity}
                    title={cartItem.productTitle}
                    amount={cartItem.sum} />))}


            </View>
            )}

        </View >
    );
};

const styles = StyleSheet.create({
    summary: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',

    },
    orderItem: {
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        elevation: 5,
        borderRadius: 10,
        backgroundColor: 'white',
        margin: 20,
        padding: 10,
        alignItems: 'center'
    },
    date: {
        fontSize: 16,
        color: '#888'
    },
    detailsItems: {
        width: '100%'
    },
    amount: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default OrderItem;