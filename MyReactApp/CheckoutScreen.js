import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CheckoutScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        if (cart) {
          const items = JSON.parse(cart);
          setCartItems(items);
          calculateTotal(items);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const totalAmount = items.reduce((sum, item) => sum + item.price, 0);
    setTotal(totalAmount);
  };

  const removeFromCart = async (item) => {
    try {
      const updatedCartItems = cartItems.filter(cartItem => cartItem.id !== item.id);
      setCartItems(updatedCartItems);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCartItems));
      calculateTotal(updatedCartItems);
    } catch (error) {
      console.error(error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.price}>${item.price}</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={() => removeFromCart(item)}>
        <Image source={require('./assets/remove.png')} style={styles.removeButtonIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('./assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerRightIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image source={require('./assets/Search.png')} style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
            <Image source={require('./assets/Filter.png')} style={styles.filterIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('./assets/shoppingBag.png')} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.header}>CHECKOUT</Text>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkoutButton}>
          <Text style={styles.checkoutButtonText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  logo: {
    width: 150,
    height: 40,
    resizeMode: 'contain',
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  filterIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  cartIcon: {
    width: 24,
    height: 24,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    letterSpacing: 4, // Add letter spacing to match the image
  },
  list: {
    paddingBottom: 16,
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
  },
  image: {
    width: 100,
    height: 150,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    color: '#ff69b4', // Pinkish color
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#ff6347', // Tomato color for remove button
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  total: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  checkoutButton: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CheckoutScreen;
