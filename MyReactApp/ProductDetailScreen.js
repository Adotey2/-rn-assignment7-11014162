import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const ProductDetailScreen = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={product.image} style={styles.image} />
      <View style={styles.detailsContainer}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <Text style={styles.sectionTitle}>MATERIALS</Text>
        <Text style={styles.materialsText}>
          We work with monitoring programmes to ensure compliance with safety, health and quality standards for our products.
        </Text>
        <Text style={styles.sectionTitle}>CARE INSTRUCTIONS</Text>
        <View style={styles.iconRow}>
          <Image source={require('./assets/bleach.png')} style={styles.careIcon} />
          <Image source={require('./assets/dry.png')} style={styles.careIcon} />
          <Image source={require('./assets/dry_clean.png')} style={styles.careIcon} />
          <Image source={require('./assets/iron.png')} style={styles.careIcon} />
        </View>
        <Text style={styles.shippingTitle}>Free Flat Rate Shipping</Text>
        <Text style={styles.shippingText}>Estimated to be delivered on 09/11/2023 - 12/11/2023.</Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Cart')}>
        <Text style={styles.addButtonText}>ADD TO BASKET</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 400,
    resizeMode: 'contain',
    marginBottom: 16,
  },
  detailsContainer: {
    width: '100%',
    padding: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#888',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#ff69b4',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  materialsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  iconRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  careIcon: {
    width: 50,
    height: 50,
  },
  shippingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  shippingText: {
    fontSize: 14,
    color: '#666',
  },
  addButton: {
    backgroundColor: '#000',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    width: '100%',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
