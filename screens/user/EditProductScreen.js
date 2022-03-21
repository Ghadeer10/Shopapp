import React, { useState, useEffect, useCallback, useReducer } from 'react';
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../../components/HeaderButton';
import * as productActions from '../../store/actions/productsAction';
import Input from '../../components/Input';
import ProductsDetailsScreen from './../shop/ProductsDetailsScreen';

const FORM_INPUTE_REDUCER = 'FORM_INPUTE_REDUCER';

const formReducer = (state, action) => {
    if (action.type === FORM_INPUTE_REDUCER) {
        const updatedInputValues = {
            ...state.inputValues,
            [action.input]: action.value
        };
        const updatedInputValidities = {
            ...state.inputValidites,
            [action.input]: action.isValid

        };
        let updatedFormIsValid = true;
        for (const key in updatedInputValidities) {
            updatedFormIsValid = updatedFormIsValid && updatedInputValidities[key];
        }
        return {
            fromIsValid: updatedFormIsValid,
            inputValues: updatedInputValues,
            inputValidites: updatedInputValidities
        };
    };
    return state;
};


const EditProductScreen = props => {

    const prodId = props.navigation.getParam('productId');
    const editedProduct = useSelector(state => state.products.userProducts.find(prod => prod.id === prodId));

    const dispatch = useDispatch();

    const [fromState, dispatchFormState] = useReducer(formReducer, {
        inputValues: {
            title: editedProduct ? editedProduct.title : '',
            imageUrl: editedProduct ? editedProduct.imageUrl : '',
            description: editedProduct ? editedProduct.description : '',
            price: '' //editedProduct ? editedProduct.price : '',

        }, inputValidites: {
            title: editedProduct ? true : false,
            imageUrl: editedProduct ? true : false,
            description: editedProduct ? true : false,
            price: editedProduct ? true : false,

        }, fromIsValid: editedProduct ? true : false
    });

    // const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
    //const [validText, setValidText] = useState(false);

    //const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
    //const [price, setPrice] = useState(editedProduct ? editedProduct.price : '');
    //const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');


    const submitHandler = useCallback(() => {
        if (!fromState.fromIsValid) {
            Alert.alert('wrong inputs', 'please check the input forms', [{ text: 'Okay' }])
            return;
        }
        if (editedProduct) {
            dispatch(
                productActions.editProducts(
                    prodId,
                    fromState.inputValues.title,
                    fromState.inputValues.description,
                    fromState.inputValues.imageUrl));
        } else {
            dispatch(
                productActions.createProducts(
                    fromState.inputValues.title,
                    fromState.inputValues.description,
                    fromState.inputValues.imageUrl,
                    +fromState.inputValues.price));
        }
        props.navigation.goBack();
    }, [dispatch, fromState, prodId]);

    useEffect(() => {
        props.navigation.setParams({ submit: submitHandler });
    }, [submitHandler]);

    const inputChangeHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {

        dispatchFormState({
            type: FORM_INPUTE_REDUCER,
            value: inputValue,
            isValid: inputValidity,
            input: inputIdentifier
        });
    }, [dispatchFormState])

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior='padding'
            keyboardVerticalOffset={100}
        >
            <ScrollView>
                <View style={styles.form}>
                    <Input
                        id='title'
                        lable='title'
                        errorText='please enter a valid title'
                        keyboardType='default'
                        autoCapitalize='sentences'
                        autoCorrect
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.title : ''}
                        initiallyValid={!!editedProduct}
                        required
                    />

                    <Input
                        id='imageUrl'
                        lable='image Url'
                        errorText='please enter a valid image Url'
                        keyboardType='default'
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.imageUrl : ''}
                        initiallyValid={!!editedProduct} // if it iis ture
                        required
                        min={0.1}
                    />

                    {editedProduct ? null : (
                        <Input
                            id='price'
                            lable='price'
                            errorText='please enter a valid price'
                            keyboardType='decimal-pad'
                            returnKeyType='next'
                            onInputChange={inputChangeHandler}
                            required
                            min={0.1}
                        />)}

                    <Input
                        id='description'
                        lable='description'
                        errorText='please enter a valid description'
                        keyboardType='default'
                        multiline
                        numberOfLines={3} //just will work on andriod
                        returnKeyType='next'
                        onInputChange={inputChangeHandler}
                        initialValue={editedProduct ? editedProduct.description : ''}
                        initiallyValid={!!editedProduct}
                        required
                        minLength={5}
                    />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

EditProductScreen.navigationOptions = navData => {
    const submitFn = navData.navigation.getParam('submit')
    return {
        headerTitle: navData.navigation.getParam('productId')
            ? 'Edit Product'
            : 'Add product',
        headerRight: () =>
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title='save'
                    iconName='ios-checkmark'
                    onPress={submitFn} />
            </HeaderButtons>,
    };
}


const styles = StyleSheet.create({
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    lable: {
        fontWeight: 'bold',
        fontSize: 17,
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    }
});

export default EditProductScreen;