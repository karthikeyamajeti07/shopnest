import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { HomePage } from './pages/HomePage';
import { RecommendPage } from './pages/RecommendPage';
import { CatalogPage } from './pages/CatalogPage';
import { ComparePage } from './pages/ComparePage';
import { PeasPage } from './pages/PeasPage';
import { EnvironmentPage } from './pages/EnvironmentPage';
import { AgentArchitecturePage } from './pages/AgentArchitecturePage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthPage } from './pages/AuthPage';
import { AccountPage } from './pages/AccountPage';
import { AdminPage } from './pages/AdminPage';
import { CartPage } from './pages/CartPage';
import { ApiService } from './services/api';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ActiveTab, AuthUser, CustomerPreferences, Product, UserRole } from './types';
import { Sparkles } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [authToken, setAuthToken] = useState<string | null>(() => localStorage.getItem('shopnest_token'));
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [authChecking, setAuthChecking] = useState(true);

  useEffect(() => {
    if (!authToken) {
      setAuthChecking(false);
      return;
    }
    ApiService.getCurrentUser(authToken).then(result => setCurrentUser(result.user)).catch(() => {
      localStorage.removeItem('shopnest_token');
      setAuthToken(null);
    }).finally(() => setAuthChecking(false));
  }, [authToken]);

  useEffect(() => {
    if (!authToken || !currentUser || currentUser.role !== 'customer') return;
    Promise.all([ApiService.getCart(authToken), ApiService.getProducts()]).then(([cart, catalog]) => {
      const restored = cart.items.flatMap(item => {
        const product = catalog.products.find(candidate => candidate.id === item.productId);
        return product ? Array.from({ length: item.quantity }, () => product) : [];
      });
      setCartItems(restored);
    });
  }, [authToken, currentUser]);

  // Default initial preferences
  const [preferences, setPreferences] = useState<CustomerPreferences>({
    category: 'Smartphones',
    maxBudget: 35000,
    minRating: 4.0,
    maxDeliveryDays: 3,
    availability: 'In Stock',
    quality: 'High',
    priority: 'Overall Balance',
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleAddToCompare = (product: Product) => {
    if (comparedProducts.some(p => p.id === product.id)) {
      setComparedProducts(prev => prev.filter(p => p.id !== product.id));
      showToast(`Removed "${product.name}" from comparison`);
      return;
    }

    if (comparedProducts.length >= 3) {
      showToast('Maximum 3 products can be compared at a time. Please remove one first.');
      return;
    }

    setComparedProducts(prev => [...prev, product]);
    showToast(`Added "${product.name}" to comparison`);
  };

  const handleRemoveFromCompare = (productId: number) => {
    setComparedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleClearCompare = () => {
    setComparedProducts([]);
    showToast('Comparison list cleared');
  };

  const handleAddToCart = (product: Product) => {
    setCartItems(prev => {
      const next = [...prev, product];
      if (authToken) void ApiService.updateCart(authToken, Array.from(new Set(next.map(item => item.id))).map(productId => ({ productId, quantity: next.filter(item => item.id === productId).length })));
      return next;
    });
    showToast(`${product.name} added to cart`);
  };

  const handleCartQuantityChange = (productId: number, quantity: number) => {
    setCartItems(prev => {
      const product = prev.find(item => item.id === productId);
      const next = product ? [...prev.filter(item => item.id !== productId), ...Array.from({ length: quantity }, () => product)] : prev;
      if (authToken) void ApiService.updateCart(authToken, Array.from(new Set(next.map(item => item.id))).map(id => ({ productId: id, quantity: next.filter(item => item.id === id).length })));
      return next;
    });
  };

  const openAuth = (role: UserRole = 'customer') => setActiveTab(role === 'admin' ? 'admin' : 'login');
  const handleAuthenticated = (token: string, user: AuthUser) => {
    setAuthToken(token);
    setCurrentUser(user);
    setActiveTab(user.role === 'admin' ? 'admin' : 'account');
  };
  const handleLogout = () => {
    if (authToken) void ApiService.logout(authToken);
    localStorage.removeItem('shopnest_token');
    setAuthToken(null);
    setCurrentUser(null);
    setActiveTab('home');
  };

  const handleQuickRecommendForProduct = (category: string, price: number) => {
    setPreferences(prev => ({
      ...prev,
      category: category as any,
      maxBudget: Math.round(price),
      priority: 'Overall Balance',
    }));
    setActiveTab('recommend');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Toast Notification banner */}
      {toastMessage && (
        <div className="fixed top-20 right-5 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-lg text-xs font-semibold flex items-center gap-2 border border-slate-700 animate-in fade-in slide-in-from-top-2 duration-200">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navigation */}
      {!authChecking && currentUser && <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        compareCount={comparedProducts.length}
        cartCount={cartItems.length}
        currentUser={currentUser}
        onOpenLogin={() => openAuth()}
        onOpenAccount={() => setActiveTab('account')}
        onOpenAdmin={() => setActiveTab('admin')}
      />}

      {/* Active Page Content */}
      <main className="flex-1 pb-16">
        {authChecking && <div className="min-h-screen bg-[#eaeded] flex items-center justify-center text-sm text-slate-500">Checking your secure session...</div>}
        {!authChecking && !currentUser && <AuthPage mode="login" role={activeTab === 'admin' ? 'admin' : 'customer'} setActiveTab={setActiveTab} onAuthenticated={handleAuthenticated} />}

        {activeTab === 'admin' && !currentUser && <AuthPage mode="login" role="admin" setActiveTab={setActiveTab} onAuthenticated={handleAuthenticated} />}

        {activeTab === 'account' && currentUser && authToken && <AccountPage user={currentUser} token={authToken} setActiveTab={setActiveTab} onLogout={handleLogout} />}

        {activeTab === 'cart' && currentUser && authToken && <CartPage token={authToken} products={cartItems} onQuantityChange={handleCartQuantityChange} onRemove={productId => handleCartQuantityChange(productId, 0)} setActiveTab={setActiveTab} onOrderCreated={() => { setCartItems([]); void ApiService.updateCart(authToken, []); }} />}

        {activeTab === 'admin' && currentUser?.role === 'admin' && authToken && <AdminPage token={authToken} userName={currentUser.name} onLogout={handleLogout} />}

        {activeTab === 'home' && (
          <HomePage
            setActiveTab={setActiveTab}
            onViewProductDetail={product => setSelectedProductForDetail(product)}
            onAddToCart={handleAddToCart}
          />
        )}

        {activeTab === 'recommend' && (
          <RecommendPage
            preferences={preferences}
            setPreferences={setPreferences}
            onCompareAdd={handleAddToCompare}
            comparedProductIds={comparedProducts.map(p => p.id)}
            onViewProductDetail={product => setSelectedProductForDetail(product)}
          />
        )}

        {activeTab === 'catalog' && (
          <CatalogPage
            onCompareAdd={handleAddToCompare}
            comparedProductIds={comparedProducts.map(p => p.id)}
            onViewProductDetail={product => setSelectedProductForDetail(product)}
            onQuickRecommendForProduct={handleQuickRecommendForProduct}
          />
        )}

        {activeTab === 'compare' && (
          <ComparePage
            comparedProducts={comparedProducts}
            onRemoveFromCompare={handleRemoveFromCompare}
            onClearCompare={handleClearCompare}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'peas' && <PeasPage setActiveTab={setActiveTab} />}

        {activeTab === 'environment' && (
          <EnvironmentPage setActiveTab={setActiveTab} />
        )}

        {activeTab === 'agent-architecture' && <AgentArchitecturePage />}

        {activeTab === 'dashboard' && <DashboardPage />}
      </main>

      <footer className="bg-[#101820] border-t border-slate-700 py-5 px-4 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <span><strong className="text-white">shopnest</strong> · Better choices, every day</span>
          <span>Secure shopping across India</span>
        </div>
      </footer>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductForDetail}
        onClose={() => setSelectedProductForDetail(null)}
        onCompareAdd={handleAddToCompare}
        isCompared={
          selectedProductForDetail
            ? comparedProducts.some(p => p.id === selectedProductForDetail.id)
            : false
        }
        onEvaluateWithAgent={(category, budget) => {
          setSelectedProductForDetail(null);
          setPreferences(prev => ({
            ...prev,
            category: category as any,
            maxBudget: Math.round(budget),
            priority: 'Overall Balance',
          }));
          setActiveTab('recommend');
        }}
        onAddToCart={handleAddToCart}
        onToggleWishlist={product => { if (authToken) void ApiService.toggleWishlist(authToken, product.id); }}
      />

    </div>
  );
}
