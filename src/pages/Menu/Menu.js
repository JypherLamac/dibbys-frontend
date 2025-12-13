// src/pages/Menu/Menu.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Menu.css';
import { menuAPI, cartAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import MenuItem from '../../components/menu/MenuItem/MenuItem';
import MenuCategory from '../../components/menu/MenuCategory/MenuCategory';

// MOVE THESE OUTSIDE THE COMPONENT
const categoryOrder = [
  'chicken',
  'silog', 
  'sizzling',
  'burger',
  'combo-meals',
  'drinks',
  'bilao',
  'special-pancit'
];

const categoryDisplayMap = {
  'chicken': 'Chicken',
  'silog': 'Silog',
  'sizzling': 'Sizzling',
  'burger': 'Burger & Fries',
  'combo-meals': 'Combo Meals',
  'drinks': 'Drinks & Frappes',
  'bilao': 'Special Bilao Wings',
  'special-pancit': 'Special Pancit'
};

function Menu() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated, cart, updateCartState } = useAuth();

  // Function to sort items by category order
  const sortItemsByCategoryOrder = useCallback((items) => {
    return [...items].sort((a, b) => {
      const indexA = categoryOrder.indexOf(a.category);
      const indexB = categoryOrder.indexOf(b.category);
      
      // If both categories are in the order array, sort by position
      if (indexA !== -1 && indexB !== -1) {
        // If same category, sort by name
        if (indexA === indexB) {
          return a.name.localeCompare(b.name);
        }
        return indexA - indexB;
      }
      
      // If only one is in order array, prioritize it
      if (indexA !== -1) return -1;
      if (indexB !== -1) return 1;
      
      // If neither is in order array, sort by category then name
      if (a.category !== b.category) {
        return a.category.localeCompare(b.category);
      }
      return a.name.localeCompare(b.name);
    });
  }, []); // ← EMPTY DEPENDENCY ARRAY NOW
  
  useEffect(() => {
    fetchMenuData();
  }, []);

  const fetchMenuData = async () => {
    try {
      setLoading(true);
      const [itemsResponse, categoriesResponse] = await Promise.all([
        menuAPI.getMenuItems(),
        menuAPI.getCategories()
      ]);

      // Sort all items by category order initially
      const sortedItems = sortItemsByCategoryOrder(itemsResponse.data);
      
      setMenuItems(sortedItems);
      setFilteredItems(sortedItems); // Set initial filtered items as sorted
    
      // Get unique categories from database
      const dbCategories = [...new Set(sortedItems.map(item => item.category))];
      
      // Sort categories according to your desired order
      const sortedCategories = categoryOrder.filter(cat => dbCategories.includes(cat));
      
      // Create categories array with "All" first, then sorted categories
      const cats = ['all', ...sortedCategories];
      const categoryObjects = cats.map(cat => ({
        id: cat,
        name: cat === 'all' ? 'All' : categoryDisplayMap[cat] || cat
      }));
      
      setCategories(categoryObjects);
    } catch (error) {
      console.error('Error fetching menu:', error);
      alert('Failed to load menu. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeCategory === 'all') {
      // When "All" is selected, show all items sorted by category order
      const sortedAllItems = sortItemsByCategoryOrder(menuItems);
      setFilteredItems(sortedAllItems);
    } else {
      // When specific category is selected, filter and sort alphabetically within category
      const filtered = menuItems.filter(item => item.category === activeCategory);
      const sortedFiltered = [...filtered].sort((a, b) => 
        a.name.localeCompare(b.name)
      );
      setFilteredItems(sortedFiltered);
    }
  }, [activeCategory, menuItems, sortItemsByCategoryOrder]); // ← This dependency is now stable

  const handleAddToCart = async (item) => {
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const response = await cartAPI.addToCart(item.id, 1);
      updateCartState(response.data);
      alert(`${item.name} added to cart!`);
    } catch (error) {
      alert('Failed to add to cart: ' + error.message);
    }
  };

  const handleCategoryClick = useCallback((categoryId) => {
    setActiveCategory(categoryId);
  }, []); // ← Wrap this in useCallback too

  if (loading) {
    return (
      <div className="menu-page">
        <section className="hero">
          <div className="container">
            <h1>Our Full Menu</h1>
            <div className="loading-container">
              <div className="spinner"></div>
              <p>Loading delicious menu items...</p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <section className="hero">
        <div className="container">
          <h1>Our Full Menu</h1>
          <p>Browse all our delicious offerings below. Use the buttons to filter by category!</p>
          {!isAuthenticated && (
            <div className="login-notice">
              <p>💡 <strong>Login required:</strong> You need to login to add items to cart.</p>
            </div>
          )}
        </div>
      </section>

      <main>
        <MenuCategory 
          categories={categories}
          activeCategory={activeCategory}
          onCategoryClick={handleCategoryClick}
        />

        <div className="menu-container">
          {filteredItems.length > 0 ? (
            filteredItems.map(item => (
              <MenuItem
                key={item.id}
                item={{
                  ...item,
                  // Pass image_url from backend
                  image_url: item.image_url,
                  price: item.price_display || `₱${item.price}`,
                  priceValue: parseFloat(item.price)
                }}
                onAddToCart={handleAddToCart}
                isAuthenticated={isAuthenticated}
              />
            ))
          ) : (
            <div className="no-items">
              <p>No items found in this category.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Menu;