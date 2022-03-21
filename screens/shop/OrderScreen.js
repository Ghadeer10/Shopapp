import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { useSelector } from 'react-redux';

import HeaderButton from '../../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import OrderItem from '../../components/OrderItem';

const OrderScreen = props => {
    const orders = useSelector(state => state.orders.orders);

    return (
        <FlatList
            data={orders}
            keyExtractor={item => item.id}
            renderItem={itemData => <OrderItem totalAmount={itemData.item.amount}
                date={itemData.item.readableDate}
                items={itemData.item.items} />
            }
        />
    );
};

OrderScreen.navigationOptions = navData => {
    return {
        headerTitle: 'your Orders',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='cart'
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
            </HeaderButtons>,
    };
};

export default OrderScreen;