 
import api from './api';

export const cartService = {
  getCart: () => 
    api.get('/cart/get_cart.php'),
  
  addItem: (itemData) => 
    api.post('/cart/add_item.php', itemData),
  
  clearCart: () => 
    api.post('/cart/clear_cart.php')
};