import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { useSelector } from 'react-redux';


const OrderHistoryScreen = () => {
    const [orders, setOrders] = useState([]);

    

    const renderItem = ({ item }) => (
        <View>
            <Text>Order ID: {item.id}</Text>
            <Text>Status: {item.status}</Text>
            <Text>Products: {item.products.map(product => product.name).join(', ')}</Text>
        </View>
    );

    return (
        <View>
            <FlatList
                data={orders}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
};

export default OrderHistoryScreen;