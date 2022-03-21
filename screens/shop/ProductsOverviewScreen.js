import React, { useEffect, useState, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, Button, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import ProductItem from '../../components/ProductItem';
import * as cartAction from '../../store/actions/cart';
import cart from '../../store/reducers/cart';
import * as productsActions from '../../store/actions/productsAction';

import HeaderButton from '../../components/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Color from '../../constants/Colors';

const ProductsOverviewScreen = props => {
  const product = useSelector(state => state.products.availableProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const onSelectHandler = (id, title) => {
    props.navigation.navigate('productsDetails', {
      productId: id,
      productTitle: title,
    });

  };

  const loadingProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      await dispatch(productsActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);///write it outside the useEffect to be able to use it anywhere

  //add listener to the navigation events so we can rerender the comp when moving between drwaers

  useEffect(() => {
    const willFoucsSub = props.navigation.addListener('willFocus', loadingProducts);
    return () => {
      willFoucsSub.remove();
    };
  }, [loadingProducts]);

  useEffect(() => {

    loadingProducts();

  }, [dispatch, loadingProducts]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Color.primary} />
      </View>
    );
  };

  if (!isLoading && product.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No product found</Text>
      </View>
    );
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>an error occures</Text>
      </View>
    );
  }
  return (
    <FlatList
      data={product}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          image={itemData.item.imageUrl}
          title={itemData.item.title}
          price={itemData.item.price}
          onSelect={() => {
            onSelectHandler(itemData.item.id, itemData.item.title)
          }}
        >
          <Button
            color={Color.primary}
            title="Details"
            onPress={() => { onSelectHandler(itemData.item.id, itemData.item.title) }}
          />
          <Button
            color={Color.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartAction.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Products',
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
          iconName='ios-cart'
          onPress={() => {
            navData.navigation.navigate('Cart')
          }} />
      </HeaderButtons>
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '80%',
    height: 20,
  },
  content: {
    flexDirection: 'row',
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProductsOverviewScreen;
