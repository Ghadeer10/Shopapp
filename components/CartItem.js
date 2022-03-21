import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CartItem = props => {
    return (
        <View style={styles.cartItem}>
            <View style={styles.itemData}>
                <Text style={styles.qty}>{props.qty} </Text>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.itemData}>
                <Text style={styles.amount}>${props.amount.toFixed(2)}</Text>
                {props.deleteable && (<TouchableOpacity style={styles.deleteButton} onPress={props.onRemove}>
                    <Icon name={Platform.OS === 'android' ? 'md-trash' : 'ios-trash'}
                        size={23}
                        color='red' />
                </TouchableOpacity>)}
            </View>
        </View>

    );

};

const styles = StyleSheet.create({
    cartItem: {
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: 10
    },
    itemData: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    qty: {
        fontSize: 16,
        color: '#888'
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    amount: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    deleteButton: {
        marginLeft: 20
    }
});

export default CartItem;