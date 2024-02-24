import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';
import * as ImagePicker from 'expo-image-picker'; // Import Expo ImagePicker module
import { addDataToCollection } from '../../FireBase/FireBaseServices';

const AddProductScreen = () => {
  const user = useSelector((state) => state.user.user); // Get user from Redux store
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productStock, setProductStock] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productImage, setProductImage] = useState(null); // State to store the selected image


  const handleChooseImage = async () => {
    // Request permission to access camera roll
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!');
      return;
    }

    // Launch the image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setProductImage(result.uri); // Set the selected image URI
    }
  };



  const handleAddProduct = () => {
    const productData = {
      name: productName,
      price: productPrice,
      stock: productStock,
      description: productDescription,
      url: productImage,
      sellerID: user.id, // Seller ID obtained from Redux
    };

    addDataToCollection('products', productData)
      .then(() => {
        // Handle success - Product added to the collection
        console.log('Product added successfully!');
        // You can also navigate back to the previous screen or perform any other action
      })
      .catch((error) => {
        // Handle error while adding the product
        console.error('Error adding product:', error);
      });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter product name"
        value={productName}
        onChangeText={(text) => setProductName(text)}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={productPrice}
        onChangeText={(text) => setProductPrice(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Stock</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter stock"
        value={productStock}
        onChangeText={(text) => setProductStock(text)}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={productDescription}
        onChangeText={(text) => setProductDescription(text)}
        multiline
      />

      <TouchableOpacity
        style={styles.imagePickerButton}
        onPress={handleChooseImage}
      >
        <Text style={styles.imagePickerButtonText}>Choose Image</Text>
      </TouchableOpacity>

      {/* Display Selected Image */}
      {productImage && (          
        <Image
          source={{ uri: productImage }}
          style={styles.selectedImage}
          resizeMode="cover"
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
        <Text style={styles.addButtonLabel}>Add Product</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  addButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  imagePickerButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 15,
  },
  imagePickerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedImage: {
    width: 200,
    height: 200,
    marginTop: 15,
    borderRadius: 8,
  },
});

export default AddProductScreen;