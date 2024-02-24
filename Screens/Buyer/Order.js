import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector , useDispatch } from 'react-redux';
import { addSubCollection } from '../../FireBase/FireBaseServices';
import { clearCart } from '../../redux/slices/cartSlice';

const OrderScreen = ({navigation}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');

    const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);

  

  const handlePlaceOrder = async () => {

    const cartproducts = cart.products.map(product => ({ ...product, status: 'pending' }));
    const orderData = {
      buyerId: cart.buyerId,
      totalPrice: cart.totalPrice,
      status: 'pending',
    };

    const products = {
        products: cartproducts,

    }

    try {
        // await addDataToCollection('Orders', orderData);
        await addSubCollection('Orders','OrderdProducts',orderData, products);
        console.log('Order placed!');
    } catch (error) {
      console.error('Error placing order: ', error);
    }
    alert('Order placed!');
    navigation.navigate('BuyerHome');

        dispatch(clearCart());
  };


  const handleCancelOrder = () => {
    // Logic to cancel the order
    // This function will be triggered when the "Cancel Order" button is pressed
    // You can implement further logic here
    console.log('Order cancelled!');
    navigation.navigate('BuyerHome');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Checkout</Text>

      <Text style={styles.label}>Card Number</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card number"
        value={cardNumber}
        onChangeText={(text) => setCardNumber(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Card Holder</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter card holder's name"
        value={cardHolder}
        onChangeText={(text) => setCardHolder(text)}
      />

      <View style={styles.inlineInputContainer}>
        <View style={styles.inlineInput}>
          <Text style={styles.label}>Expiry Date</Text>
          <TextInput
            style={styles.input}
            placeholder="MM/YY"
            value={expiryDate}
            onChangeText={(text) => setExpiryDate(text)}
            keyboardType="numeric"
          />
        </View>

        <View style={styles.inlineInput}>
          <Text style={styles.label}>Security Code</Text>
          <TextInput
            style={styles.input}
            placeholder="CVV"
            value={securityCode}
            onChangeText={(text) => setSecurityCode(text)}
            keyboardType="numeric"
          />
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.placeOrderButton} onPress={handlePlaceOrder}>
          <Text style={styles.buttonText}>Place Order</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  inlineInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inlineInput: {
    flex: 1,
    marginRight: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginRight: 10,
  },
  placeOrderButton: {
    backgroundColor: 'green',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default OrderScreen;
