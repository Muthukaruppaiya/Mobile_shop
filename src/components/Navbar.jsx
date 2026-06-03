import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShoppingBag, X, Plus, Minus, Trash2, Menu, Check } from 'lucide-react';

export default function Navbar() {
  const { cart, updateQuantity, removeFromCart, cartCount, cartTotal, clearCart } = useCart();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'form', 'success'
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    notes: ''
  });

  const handleCheckoutSubmit = (e) => {
    e.preventDefault();
    if (!customerInfo.name || !customerInfo.phone) return;

    // Generate WhatsApp text
    const shopPhone = '919876543210'; // Example local WhatsApp contact
    const itemDetails = cart
      .map(item => `* ${item.name} x ${item.quantity} - ₹${(item.price * item.quantity).toLocaleString('en-IN')}`)
      .join('\n');
    
    const message = encodeURIComponent(
      `🛍️ *New Order from Muthukaruppaiya Mobiles App*\n\n` +
      `👤 *Customer Name:* ${customerInfo.name}\n` +
      `📞 *Phone:* ${customerInfo.phone}\n` +
      `📍 *Address:* ${customerInfo.address}\n` +
      `📝 *Notes:* ${customerInfo.notes || 'None'}\n\n` +
      `🛒 *Order Details:*\n${itemDetails}\n\n` +
      `💵 *Grand Total:* ₹${cartTotal.toLocaleString('en-IN')}\n\n` +
      `Please confirm my order!`
    );

    // Open WhatsApp link
    window.open(`https://api.whatsapp.com/send?phone=${shopPhone}&text=${message}`, '_blank');
    
    setCheckoutStep('success');
    setTimeout(() => {
      clearCart();
      setIsDrawerOpen(false);
      setCheckoutStep('cart');
      setCustomerInfo({ name: '', phone: '', address: '', notes: '' });
    }, 5000);
  };

  return (
    <>
      <nav className="nav-container">
        <a href="#home" className="nav-logo">
          <div className="logo-icon">
            <ShoppingBag size={18} color="#eceae0" />
          </div>
          <div>
            <span className="logo-text">Sri Mobiles</span>
            <span className="logo-sub">Mobiles & Services</span>
          </div>
        </a>

        {/* Desktop Links */}
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#specs">Highlights</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#products">Mobiles</a></li>
          <li><a href="#testimonials">Reviews</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <div className="nav-right">
          {/* Cart Button */}
          <button className="cart-btn" onClick={() => setIsDrawerOpen(true)}>
            <ShoppingBag size={16} />
            <span className="cart-text">Cart</span>
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </button>

          {/* Hamburger Menu */}
          <button 
            className={`hamburger-btn ${isMobileMenuOpen ? 'open' : ''}`} 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}>
        <ul className="mobile-menu-links" onClick={(e) => e.stopPropagation()}>
          <button className="menu-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
          <li><a href="#home" onClick={() => setIsMobileMenuOpen(false)}>Home</a></li>
          <li><a href="#specs" onClick={() => setIsMobileMenuOpen(false)}>Highlights</a></li>
          <li><a href="#gallery" onClick={() => setIsMobileMenuOpen(false)}>Gallery</a></li>
          <li><a href="#products" onClick={() => setIsMobileMenuOpen(false)}>Mobiles</a></li>
          <li><a href="#testimonials" onClick={() => setIsMobileMenuOpen(false)}>Reviews</a></li>
          <li><a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</a></li>
        </ul>
      </div>

      {/* Shopping Cart Drawer Overlay */}
      {isDrawerOpen && <div className="drawer-overlay" onClick={() => setIsDrawerOpen(false)}></div>}

      {/* Shopping Cart Drawer */}
      <div className={`cart-drawer ${isDrawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <h2>Your Cart ({cartCount})</h2>
          <button className="close-btn" onClick={() => setIsDrawerOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div className="drawer-body">
          {checkoutStep === 'cart' && (
            <>
              {cart.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={48} className="empty-icon" />
                  <p>Your shopping cart is empty</p>
                  <button className="checkout-btn" style={{ marginTop: '1rem' }} onClick={() => setIsDrawerOpen(false)}>
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="cart-items-container">
                  {cart.map((item) => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-img-container">
                        <img src={item.image} alt={item.name} />
                      </div>
                      <div className="cart-item-info">
                        <h4 className="cart-item-name">{item.name}</h4>
                        <p className="cart-item-price">₹{item.price.toLocaleString('en-IN')}</p>
                        
                        <div className="cart-item-controls">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                            <Minus size={12} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {checkoutStep === 'form' && (
            <form onSubmit={handleCheckoutSubmit} className="checkout-form">
              <h3>Delivery Details</h3>
              <p className="form-sub">We offer home delivery in Periyakulam and surrounding Theni areas!</p>
              
              <div className="form-group">
                <label>Name *</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Enter your full name" 
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>WhatsApp / Phone Number *</label>
                <input 
                  type="tel" 
                  required 
                  placeholder="Enter 10-digit mobile number" 
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Delivery Address *</label>
                <textarea 
                  required 
                  rows="3" 
                  placeholder="Enter delivery address in Periyakulam / Theni" 
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                />
              </div>

              <div className="form-group">
                <label>Special Instructions (Optional)</label>
                <input 
                  type="text" 
                  placeholder="E.g. Call before coming" 
                  value={customerInfo.notes}
                  onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                />
              </div>

              <div className="form-actions">
                <button type="button" className="btn-back" onClick={() => setCheckoutStep('cart')}>
                  Back to Cart
                </button>
                <button type="submit" className="btn-submit">
                  Confirm & Order via WhatsApp
                </button>
              </div>
            </form>
          )}

          {checkoutStep === 'success' && (
            <div className="success-screen">
              <div className="success-icon-container">
                <Check size={40} color="#faf9f5" />
              </div>
              <h3>Order Initiated!</h3>
              <p>Your WhatsApp message has been generated. Send the message in WhatsApp to confirm your order.</p>
              <p className="success-sub">Thank you for choosing Sri Mobiles!</p>
            </div>
          )}
        </div>

        {cart.length > 0 && checkoutStep === 'cart' && (
          <div className="drawer-footer">
            <div className="subtotal-row">
              <span>Subtotal:</span>
              <span className="total-val">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>
            <button className="checkout-btn" onClick={() => setCheckoutStep('form')}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
