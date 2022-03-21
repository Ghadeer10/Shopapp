import React from 'react';
import { Platform} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {HeaderButton} from 'react-navigation-header-buttons';
import Color from '../constants/Colors';

const CustomHeaderButton = props => {
  return (
    <HeaderButton
      {...props}
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : Color.primary}
    />
  );
};

export default CustomHeaderButton;
