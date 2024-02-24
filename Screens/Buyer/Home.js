import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { retrieveAllDocuments } from "../../FireBase/FireBaseServices";
import { useSelector, useDispatch } from "react-redux";
import { addProduct, setBuyerId } from "../../redux/slices/cartSlice";

const BuyerScreen = ({navigation}) => {
  const [cartCount, setCartCount] = useState(0); // State to keep track of cart count
  const [products, setProducts] = useState([]); // State to store retrieved product data

  const user = useSelector((state) => state.user.user); // Get user from redux store
  const cart = useSelector((state) => state.cart.cartCount); // Get cart items from redux store
  const dispatch = useDispatch();

  // Retrieve product data from Firebase
  useEffect(() => {
    const fetchdata = async () => {
      try {
        const documents = await retrieveAllDocuments("products"); // Assuming 'products' is the collection name
        const fetchedProducts = documents.map((doc) => ({
          id: doc.id,
          name: doc.data.name,
          price: doc.data.price,
          url: doc.data.url,
          sellerID: doc.data.sellerID,
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchdata();
  }, []);

  // Function to render each product card
  const renderProductCard = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: item.url }} style={styles.image} resizeMode="contain" />
      <Text>{item.name}</Text>
      <Text>Price: ${item.price}</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => handleAddToCart(item)}
      >
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Function to handle adding a product to the cart
  const handleAddToCart = (product) => {
    // Logic to add product to cart
    console.log("Added to cart:", product);
    setCartCount(cart); // Increment cart count on each addition

    // Logic to add product to redux cartSlice 
    dispatch(addProduct(product));
    dispatch(setBuyerId(user.id));

  };

  return (
    <View style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <TextInput style={styles.searchBar} placeholder="Search..." />
        <View style={styles.iconsContainer}>
          <View style={styles.cartContainer}>
            <TouchableOpacity onPress={()=> {navigation.navigate('Cart')}}>
              <MaterialCommunityIcons name="cart" size={24} color="black" />
            </TouchableOpacity>
            {cartCount > 0 && (
              <View style={styles.cartCount}>
                <Text style={styles.cartCountText}>{cart}</Text>
              </View>
            )}
          </View>
          <TouchableOpacity onPress={() => console.log("Order History")}>
            <MaterialCommunityIcons name="history" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Product list */}
      <FlatList
        data={products}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2} // Show two columns
        contentContainerStyle={styles.productList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  searchBar: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 5,
    marginRight: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: 80,
  },
  productList: {
    justifyContent: "space-between",
  },
  card: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: "48%", // Adjust as per your design
  },
  image: {
    width: "100%",
    height: 150,
    marginBottom: 5,
    resizeMode: "contain",
  },
  addToCartButton: {
    backgroundColor: "blue",
    paddingVertical: 8,
    borderRadius: 5,
    marginTop: 5,
    alignItems: "center",
  },
  addToCartText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cartContainer: {
    position: "relative",
  },
  cartCount: {
    position: "absolute",
    top: -8,
    right: -8,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartCountText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default BuyerScreen;
