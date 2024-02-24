import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { retrieveAllDocuments } from '../../FireBase/FireBaseServices';
import { useSelector } from 'react-redux';

const SellerHomeScreen = ({navigation}) => {
  const [products, setProducts] = useState([]); // State to store retrieved product data
  const user = useSelector((state) => state.user.user); // Get user from Redux store

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const documents = await retrieveAllDocuments('products'); // Assuming 'products' is the collection name
        const fetchedProducts = documents
          .map((doc) => ({
            id: doc.id,
            name: doc.data.name,
            price: doc.data.price,
            url: doc.data.url,
            sellerID: doc.data.sellerID, // Assuming the seller ID is stored in the 'sellerID' field
          }))
          .filter((product) => product.sellerID === user.id); // Filter products by seller ID
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, [user.sellerID]);

  // Function to render each product card
  const renderProductCard = (product) => (
    <View key={product.id} style={styles.card}>
      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: product.url }} style={styles.image} />
      </View>

      {/* Product Information */}
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>Price: ${product.price}</Text>

      {/* Edit and Delete Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Bar, Add Product, and Pending Orders Icons */}
      <View style={styles.searchBarContainer}>
        <TextInput style={styles.searchBar} placeholder="Search..." />
        <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('SellerOrder')}> 
            <MaterialCommunityIcons name="clipboard-text-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.plusIcon} onPress={()=> {navigation.navigate('AddProduct')}} >
            <MaterialCommunityIcons name="plus-circle" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Cards */}
      <View style={styles.productList}>
        {products.map((product) => renderProductCard(product))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  productList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '48%', // Adjust as per your design
  },
  imageContainer: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    marginBottom: 8,
  },
  productName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: 'blue',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
    width: '48%',
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center',
    width: '48%',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10, // Add padding for space
  },
  plusIcon: {
    marginLeft: 10, // Add space between icons
  },
});

export default SellerHomeScreen;
