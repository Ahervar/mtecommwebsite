/**
 * Calculates the total number of items across all products in the cart.
 * @param {Array} cartItems - The list of items in the cart.
 * @returns {number} - The total quantity of items.
 */
export const getCartTotalQuantity = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };
  
  /**
   * Calculates the subtotal price (before discounts) of an item in the cart.
   * @param {object} item - A single item object from the cart.
   * @returns {number} - The subtotal price for that item.
   */
  export const getItemSubtotal = (item) => {
    return item.price * item.quantity;
  };
  
  /**
   * Calculates the total discounted price of an item in the cart.
   * @param {object} item - A single item object from the cart.
   * @returns {number} - The total price after applying the discount.
   */
  export const getItemTotal = (item) => {
    const discountedPrice = item.price * (1 - item.discount / 100);
    return discountedPrice * item.quantity;
  };
  
  /**
   * Calculates the overall total price for all items in the cart.
   * @param {Array} cartItems - The list of items in the cart.
   * @returns {number} - The total price for the entire cart, after all discounts.
   */
  export const getCartTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + getItemTotal(item), 0);
  };
  
  /**
   * Finds an item in the cart by its ID.
   * @param {Array} cartItems - The list of items in the cart.
   * @param {number} productId - The ID of the product to find.
   * @returns {object|undefined} - The cart item object or undefined.
   */
  export const findCartItem = (cartItems, productId) => {
    // Ensure we compare numbers to numbers for strict comparison
    const id = Number(productId);
    return cartItems.find((item) => item.id === id);
  };
  
  /**
   * Generates the new state of cart items after adding a product.
   * @param {Array} currentCartItems - The current list of items in the cart.
   * @param {object} productToAdd - The product object to be added.
   * @returns {Array} - The new array of cart items.
   */
  export const addItemToCart = (currentCartItems, productToAdd) => {
    const existingItem = findCartItem(currentCartItems, productToAdd.id);
  
    if (existingItem) {
      // If item exists, increase its quantity
      return currentCartItems.map((item) =>
        item.id === productToAdd.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      // If item is new, add it to the cart with quantity 1
      return [...currentCartItems, { ...productToAdd, quantity: 1 }];
    }
  };
  
  /**
   * Generates the new state of cart items after removing one unit of a product.
   * @param {Array} currentCartItems - The current list of items in the cart.
   * @param {number} productId - The ID of the product to be removed.
   * @returns {Array} - The new array of cart items.
   */
  export const removeItemFromCart = (currentCartItems, productId) => {
    const existingItem = findCartItem(currentCartItems, productId);
    const id = Number(productId);
  
    if (!existingItem) {
      return currentCartItems;
    }
  
    // If quantity is 1, remove the item completely
    if (existingItem.quantity === 1) {
      return currentCartItems.filter((item) => item.id !== id);
    } else {
      // If quantity is > 1, decrease the quantity by 1
      return currentCartItems.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    }
  };
  
  /**
   * Generates the new state of cart items after completely clearing one product from the cart.
   * @param {Array} currentCartItems - The current list of items in the cart.
   * @param {number} productId - The ID of the product to be cleared.
   * @returns {Array} - The new array of cart items.
   */
  export const clearItemFromCart = (currentCartItems, productId) => {
    const id = Number(productId);
    return currentCartItems.filter((item) => item.id !== id);
  };