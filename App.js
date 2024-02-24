import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screens/LoginScreen";
import RegistrationScreen from "./Screens/RegistrationScreen";
import BuyerHomeScreen from "./Screens/Buyer/Home";
import CartScreen from "./Screens/Buyer/Cart";
import OrderScreen from "./Screens/Buyer/Order";
//import OrderHistory from "./Screens/Buyer/OrdersHistory";

import SellerHomeScreen from "./Screens/Seller/Home";
import AddProductScreen from "./Screens/Seller/AddProduct";
import SellerOrderScreen from "./Screens/Seller/Orders";
import { Provider } from "react-redux";
import store from "./redux/store";

const stack = createStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <stack.Navigator>
          <stack.Screen name="Login" component={LoginScreen} />
          <stack.Screen name="Registration" component={RegistrationScreen} />
          <stack.Screen name="BuyerHome" component={BuyerHomeScreen} />
          <stack.Screen name="Cart" component={CartScreen} />
          <stack.Screen name="SellerHome" component={SellerHomeScreen} />
          <stack.Screen name="AddProduct" component={AddProductScreen} />
          <stack.Screen name="Order" component={OrderScreen} />
          <stack.Screen name="SellerOrder" component={SellerOrderScreen} />
          {/* <stack.Screen name="OrderHistory" component={OrderHistory} /> */}
        </stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
