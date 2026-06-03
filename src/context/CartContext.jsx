import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const PRODUCTS = [
  {
    id: 'iphone-15-pro-max',
    name: 'iPhone 15 Pro Max',
    brand: 'Apple',
    price: 149900,
    rating: 4.9,
    reviews: 142,
    image: '/hero_phone.png',
    bgClass: 'first-slide',
    specs: {
      display: '6.7" Super Retina XDR OLED, 120Hz',
      processor: 'A17 Pro Chip (3nm)',
      camera: '48MP Main + 12MP Ultra-wide + 12MP 5x Telephoto',
      battery: '4441 mAh with 25W charging',
      memory: '256GB / 8GB RAM',
      color: 'Gold Titanium'
    },
    description: 'Forged in titanium and featuring the groundbreaking A17 Pro chip, a customizable Action button, and the most powerful iPhone camera system ever.'
  },
  {
    id: 'galaxy-s24-ultra',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    price: 129900,
    rating: 4.8,
    reviews: 189,
    image: '/phone_side.png',
    bgClass: 'second-slide',
    specs: {
      display: '6.8" Dynamic AMOLED 2X, 120Hz',
      processor: 'Snapdragon 8 Gen 3 for Galaxy',
      camera: '200MP Main + 50MP + 12MP + 10MP Quad Camera',
      battery: '5000 mAh with 45W charging',
      memory: '512GB / 12GB RAM',
      color: 'Titanium Gray'
    },
    description: 'Welcome to the era of mobile AI. With Galaxy S24 Ultra in your hands, you can unleash whole new levels of creativity, productivity and possibility.'
  },
  {
    id: 'oneplus-12',
    name: 'OnePlus 12 (Premium)',
    brand: 'OnePlus',
    price: 69999,
    rating: 4.7,
    reviews: 95,
    image: '/hero_phone.png',
    bgClass: 'first-slide',
    specs: {
      display: '6.82" 2K Oriental AMOLED, 120Hz',
      processor: 'Snapdragon 8 Gen 3',
      camera: '50MP Main + 64MP 3x OIS + 48MP Ultra-wide',
      battery: '5400 mAh with 100W SuperVOOC',
      memory: '512GB / 16GB RAM',
      color: 'Emerald Flow / Flowing Gold'
    },
    description: 'Redefined flagship specifications. OnePlus 12 combines elite hardware with industry-leading 100W charging and a 4th Gen Hasselblad camera system.'
  },
  {
    id: 'pixel-8-pro',
    name: 'Google Pixel 8 Pro',
    brand: 'Google',
    price: 109999,
    rating: 4.6,
    reviews: 78,
    image: '/phone_side.png',
    bgClass: 'second-slide',
    specs: {
      display: '6.7" Super Actua display, 120Hz',
      processor: 'Google Tensor G3 (Titan M2)',
      camera: '50MP Main + 48MP Ultra-wide + 48MP 5x Zoom',
      battery: '5050 mAh with 30W charging',
      memory: '128GB / 12GB RAM',
      color: 'Bay Blue / Porcelain'
    },
    description: 'The all-pro phone engineered by Google. It has the best of Google AI, the most advanced Pixel Camera yet, and can directly translate languages offline.'
  }
];

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('muthu_mobiles_cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('muthu_mobiles_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, qty) => {
    if (qty <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: qty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        products: PRODUCTS
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
