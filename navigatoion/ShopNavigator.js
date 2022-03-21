import React from 'react';
import { Platform } from 'react-native';

import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from 'react-navigation';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import ProductsDetailsScreen from '../screens/shop/ProductsDetailsScreen';
import CartScreen from '../screens/shop/CartScreen';
import OrderScreen from '../screens/shop/OrderScreen';
import UserProductScreen from '../screens/user/UserProductScreen';
import EditProductScreen from '../screens/user/EditProductScreen';


import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';


const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.accent,
};

const ProductsNavigator = createStackNavigator(
  {
    productsOverview: ProductsOverviewScreen,
    productsDetails: ProductsDetailsScreen,
    Cart: CartScreen, 33 
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => <Icon
        name='ios-cart'
        size={23}
        color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
  },
);


const AdminNavigator = createStackNavigator(
  {
    userProducts: UserProductScreen,
    EditProducts: EditProductScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => <Icon
        name='ios-create'
        size={23}
        color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const OrderNavigator = createStackNavigator(
  {
    Order: OrderScreen
  },
  {
    navigationOptions: {
      drawerIcon: drawerConfig => <Icon
        name={Platform.OS === 'android' ? 'md-menu' : 'ios-star'}
        size={23}
        color={drawerConfig.tintColor} />
    },
    defaultNavigationOptions: defaultNavOptions
  }
);

const ShopNavigator = createDrawerNavigator({
  Products: ProductsNavigator,
  Orders: OrderNavigator,
  Admin: AdminNavigator,
}, {
  contentOptions: {
    activeTintColor: Colors.primary
  }
}
);

export default createAppContainer(ShopNavigator);
