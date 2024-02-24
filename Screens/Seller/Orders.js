import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { retrieveAllSubCollection } from '../../FireBase/FireBaseServices'; // replace with the actual path
import { doc } from 'firebase/firestore';

const SellerOrderScreen = () => {
  const [products, setProducts] = useState([]);
  const userId = useSelector(state => state.user.user.id); // Assuming you have a user slice in your Redux store

    useEffect(() => {
      const func= async ()=>{ 
        const data =  await retrieveAllSubCollection('Orders', 'OrderdProducts');
        data.map((element)=>{
          element.map((element2)=>{
            if(element2.data.sellerID==userId){
              setProducts(products=>[...products,element2.data]);
            }
          })
        })
        console.log(products);
        
      }
    
      func();
    }, []);
  

  const handleCompleteOrder = (orderId) => {
    // Logic to mark the order as complete
    // This function will be triggered when the "Complete Order" button is pressed
    // You can implement further logic here
    console.log('Order completed!');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Order Details</Text>
      {
        products ? products.map((product) => (
          <View style={styles.orderDetails} key={product.id}>
            <Text style={styles.detail}>Buyer ID: {product.buyerId}</Text>
            <Text style={styles.detail}>Total Price: {product.totalPrice}</Text>
            <Text style={styles.detail}>Status: {product.status}</Text>
            <TouchableOpacity
              style={styles.completeOrderButton}
              onPress={() => handleCompleteOrder(product.id)}
            >
              <Text style={styles.buttonText}>Complete Order</Text>
            </TouchableOpacity>
          </View>
        )) : null 
      }
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f0f0f0',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  orderDetails: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  detail: {
    fontSize: 16,
    marginBottom: 10,
  },
  completeOrderButton: {
    backgroundColor: '#1976D2',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SellerOrderScreen;
