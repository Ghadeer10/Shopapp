
import React from 'react';
import type { Node } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';



import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import ReduxThunk from 'redux-thunk';

import productsReducer from './store/reducers/products';
import cartReducer from './store/reducers/cart';
import orderReducer from './store/reducers/orders';

import { enableScreens } from 'react-native-screens';

import ProductsOverviewScreen from './screens/shop/ProductsOverviewScreen';
import ShopNavigator from './navigatoion/ShopNavigator';

enableScreens();

const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
  orders: orderReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App: () => Node = () => {


  return (
    <Provider store={store} >
      <ShopNavigator />
    </Provider>

  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
export default App;
