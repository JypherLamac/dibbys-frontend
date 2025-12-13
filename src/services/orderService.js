 
import api from './api';

export const orderService = {
  createOrder: (orderData) => 
    api.post('/orders/create_order.php', orderData),
  
  getOrder: (orderId) => 
    api.get('/orders/get_order.php', { params: { id: orderId } })
};