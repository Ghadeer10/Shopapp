import React from 'react';
import { FlatList, Button, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';

import ProductItem from '../../components/ProductItem';
import Color from '../../constants/Colors';

import * as productsActions from '../../store/actions/productsAction';



const UserProductScreen = props => {
    const userProduct = useSelector(state => state.products.userProducts);
    const dispatch = useDispatch();

    const editProductsHandler = id => {
        props.navigation.navigate('EditProducts', { productId: id })
    };

    const deleteHandler = id => {
        Alert.alert('Are you sure', 'Do you really want to delete this Item?', [
            { text: 'No', style: 'default' },
            {
                text: 'Yes', style: 'destructive',
                onPress: () => {
                    dispatch(productsActions.deleteProducts(id));

                }
            }
        ]);
    };

    return (
        <FlatList
            data={userProduct}
            keyExtractor={item => item.id}
            renderItem={itemData => <ProductItem
                image={itemData.item.imageUrl}
                title={itemData.item.title}
                price={itemData.item.price}
                onSelect={() => { editProductsHandler(itemData.item.id) }}

            >
                <Button
                    color={Color.primary}
                    title="Edit"
                    onPress={() => { editProductsHandler(itemData.item.id) }}
                />
                <Button
                    color={Color.primary}
                    title="Delete"
                    onPress={deleteHandler.bind(this, itemData.item.id)
                    }///or () => {deletHandler(itemdata.item.id)}
                />
            </ProductItem>}
        />
    );
};

UserProductScreen.navigationOptions = navData => {
    return {
        headerTitle: 'Your Products',
        headerLeft: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='cart'
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }} />
            </HeaderButtons>,
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='cart'
                    iconName='ios-create'
                    onPress={() => {
                        navData.navigation.navigate('EditProducts');
                    }} />
            </HeaderButtons>,
    }
}

export default UserProductScreen;