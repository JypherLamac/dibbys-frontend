import api from './api';

export const menuService = {
  getCategories: () => 
    api.get('/menu/get_categories.php'),
  
  getMenuItems: () => 
    api.get('/menu/get_items.php'),
  
  // Admin functions
  addMenuItem: (itemData) => 
    api.post('/admin/add_menu_item.php', itemData),
  
  updateMenuItem: (itemId, itemData) => 
    api.post('/admin/update_menu_item.php', { id: itemId, ...itemData }),
  
  deleteMenuItem: (itemId) => 
    api.post('/admin/delete_menu_item.php', { id: itemId })
};