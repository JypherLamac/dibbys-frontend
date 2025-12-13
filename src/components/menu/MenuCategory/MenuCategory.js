import React from 'react';
import './MenuCategory.css';

function MenuCategory({ categories, activeCategory, onCategoryClick, isMobile }) {
  // Ensure categories are displayed in correct order
  const sortedCategories = [...categories].sort((a, b) => {
    // Keep "All" first
    if (a.id === 'all') return -1;
    if (b.id === 'all') return 1;
    
    // Define custom order
    const order = [
      'chicken',
      'silog', 
      'sizzling',
      'burger',
      'combo-meals',
      'drinks',
      'bilao',
      'special-pancit'
    ];
    
    const indexA = order.indexOf(a.id);
    const indexB = order.indexOf(b.id);
    
    // If not in order array, sort alphabetically
    if (indexA === -1 && indexB === -1) return a.name.localeCompare(b.name);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    
    return indexA - indexB;
  });

  return (
    <>
      {/* Desktop Filter Buttons */}
      <div className="filter-buttons">
        {sortedCategories.map(category => (
          <button
            key={category.id}
            className={activeCategory === category.id ? 'active' : ''}
            onClick={() => onCategoryClick(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Mobile Filter Dropdown */}
      {isMobile && (
        <div className="filter-dropdown">
          <select 
            className="filter-select" 
            value={activeCategory}
            onChange={(e) => onCategoryClick(e.target.value)}
          >
            {sortedCategories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}

export default MenuCategory;