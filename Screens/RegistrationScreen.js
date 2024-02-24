import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Picker } from 'react-native';
import { addDataToCollection } from '../FireBase/FireBaseServices';

const RegistrationScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [type, setType] = useState('buyer'); // Default type is buyer

  const countries = ['Select Country', 'USA', 'Canada', 'UK', 'Australia']; // Add more countries as needed
  const cities = ['Select City', 'New York', 'Los Angeles', 'London', 'Sydney']; // Add more cities as needed

  const handleRegister = async () => {
    
    const userData = {
      name,
      password,
      country,
      city,
      zip,
      type: type, // userType can be 'buyer' or 'seller'
    };

    if (type === 'buyer') {
      await addDataToCollection('Buyers', userData); // Replace 'buyersCollection' with your buyer collection name
    } else if (type === 'seller') {
      await addDataToCollection('Sellers', userData); // Replace 'sellersCollection' with your seller collection name
    }
    alert('User registered successfully!'); 
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(text) => setName(text)}
        value={name}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry={true}
      />

      <Picker
        selectedValue={country}
        style={styles.picker}
        onValueChange={(itemValue) => setCountry(itemValue)}
      >
        {countries.map((country, index) => (
          <Picker.Item key={index} label={country} value={country} />
        ))}
      </Picker>

      <Picker
        selectedValue={city}
        style={styles.picker}
        onValueChange={(itemValue) => setCity(itemValue)}
      >
        {cities.map((city, index) => (
          <Picker.Item key={index} label={city} value={city} />
        ))}
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Zip/Postal Code"
        onChangeText={(text) => setZip(text)}
        value={zip}
        keyboardType="numeric"
      />

      <Picker
        selectedValue={type}
        style={styles.picker}
        onValueChange={(itemValue) => setType(itemValue)}
      >
        <Picker.Item label="Buyer" value="buyer" />
        <Picker.Item label="Seller" value="seller" />
      </Picker>

      <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
        <Text style={styles.registerButtonText}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  input: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  picker: {
    width: '80%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  registerButton: {
    width: '80%',
    height: 50,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RegistrationScreen;
