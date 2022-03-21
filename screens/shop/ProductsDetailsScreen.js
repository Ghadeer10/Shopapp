import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  button,
  StyleSheet,
  Button,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as cartAction from '../../store/actions/cart';

import Color from '../../constants/Colors';

const ProductsDetailsScreen = props => {

  const productId = props.navigation.getParam('productId');
  const product = useSelector(state =>
    state.products.availableProducts.find(product => product.id === productId),
  );
  const dispatch = useDispatch();
  return (
    <View>
      <Image style={styles.image} source={{ uri: product.imageUrl }} />
      <View style={styles.action}>
        <Button
          color={Color.primary}
          style={styles.button}
          title="Add to Cart"
          onPress={() => {
            dispatch(cartAction.addToCart(product));
          }}
        />
      </View>
      <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

ProductsDetailsScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('productTitle'),
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
  },
  action: {
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {},
  price: {
    textAlign: 'center',
    fontSize: 20,
    color: '#888',
    marginVertical: 20,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});

export default ProductsDetailsScreen;
