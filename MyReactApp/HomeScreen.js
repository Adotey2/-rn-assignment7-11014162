import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [menuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const addToCart = async (item) => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      const cartItems = cart ? JSON.parse(cart) : [];
      cartItems.push(item);
      await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { product: item })}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.name}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>${item.price}</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => addToCart(item)}>
        <Image source={require('./assets/add_circle.png')} style={styles.addButtonIcon} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image source={require('./assets/Menu.png')} style={styles.menuIcon} />
        </TouchableOpacity>
        <Image source={require('./assets/Logo.png')} style={styles.logo} />
        <View style={styles.headerRightIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Search')}>
            <Image source={require('./assets/Search.png')} style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
            <Image source={require('./assets/Filter.png')} style={styles.filterIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
            <Image source={require('./assets/shopping bag.png')} style={styles.cartIcon} />
          </TouchableOpacity>
        </View>
      </View>
      {menuVisible && (
        <View style={styles.dropdownMenu}>
          <Text style={styles.dropdownItem}>Store</Text>
          <Text style={styles.dropdownItem}>Locations</Text>
          <Text style={styles.dropdownItem}>Blog</Text>
          <Text style={styles.dropdownItem}>Jewelry</Text>
          <Text style={styles.dropdownItem}>Electronic</Text>
          <Text style={styles.dropdownItem}>Clothing</Text>
        </View>
      )}
      <Text style={styles.header}>OUR STORY</Text>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
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
  menuIcon: {
    width: 24,
    height: 24,
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
  dropdownMenu: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    zIndex: 1000,
    elevation: 5,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
    letterSpacing: 2,
  },
  list: {
    paddingBottom: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    alignItems: 'center',
    padding: 8,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
  },
  textContainer: {
    width: '100%',
    padding: 8,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  price: {
    fontSize: 14,
    color: '#ff69b4',
    marginBottom: 4,
  },
  button: {
    backgroundColor: '#000',
    padding: 8,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  addButtonIcon: {
    width: 24,
    height: 24,
    tintColor: '#fff',
  },
});

export default HomeScreen;
