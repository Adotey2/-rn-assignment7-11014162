# Shopping App
Overview
This is a simple shopping app built using React Native. The app allows users to browse products, add them to a cart, view cart details, and proceed to checkout. Data is fetched from a fake store API and stored locally using AsyncStorage.

## Design Choices
User Interface

### Home Screen
Displays a list of products with images, names, and prices. Users can click on a product to view details or add it to their cart.


![HomeScreen](./assets/Dcit202%20screenshot40.png)


![HomeScreen](./assets/Dcit202%20screenshot41.png)


![HomeScreen](./assets/Dcit202%20screenshot42.png)


![HomeScreen](./assets/Dcit202%20screenshot43.png)

Cart Screen: Shows a list of products added to the cart, with options to remove items and view the total price.

![CartScreen](./assets/Dcit202%20screenshot44.png)


Checkout Screen: Provides a summary of the cart items and the total amount, with an option to proceed with the checkout.



![CheckoutScreen](./assets/Dcit202%20screenshot45.png)




### Data Fetching
API: Data is fetched from the Fake Store API (https://fakestoreapi.com/products). This API provides a variety of products along with their details.
Fetching Method: Used fetch to get data from the API. Data is stored in the component state and rendered dynamically.

### Data Storage
AsyncStorage: Used AsyncStorage to persist cart data across app sessions. This ensures that users' cart items are not lost when they close the app.
Structure: Cart items are stored as a JSON string in AsyncStorage. The cart key is used to save and retrieve cart items.

