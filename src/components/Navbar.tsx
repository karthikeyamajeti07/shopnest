import React, { useState } from 'react';
import { ChevronDown, Menu, Search, ShoppingCart, UserRound, X } from 'lucide-react';
import { ActiveTab, AuthUser } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  compareCount: number;
  cartCount: number;
  currentUser?: AuthUser | null;
  onOpenLogin: () => void;
  onOpenAccount: () => void;
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  compareCount,
  cartCount,
  currentUser,
  onOpenLogin,
  onOpenAccount,
  onOpenAdmin,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState('');
  const go = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#101820] text-white shadow-md">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6">
        <div className="h-[72px] flex items-center gap-4">
          <button onClick={() => go('home')} className="shrink-0 text-left" aria-label="ShopNest home">
            <span className="block text-2xl font-black tracking-tight">shop<span className="text-[#ffb000]">nest</span></span>
            <span className="hidden sm:block text-[10px] text-slate-400 tracking-wide">Better choices, every day</span>
          </button>

          <form onSubmit={event => { event.preventDefault(); go('catalog'); }} className="flex h-11 flex-1 max-w-3xl mx-auto">
            <select aria-label="Search department" className="hidden sm:block w-16 rounded-l-md bg-slate-100 px-2 text-xs text-slate-700 border-r border-slate-300"><option>All</option><option>Phones</option><option>Laptops</option></select>
            <input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search products and brands" className="min-w-0 flex-1 px-4 text-sm text-slate-900 outline-none" />
            <button aria-label="Search" className="w-12 rounded-r-md bg-[#ffb000] text-slate-950 hover:bg-[#f6a500] flex items-center justify-center"><Search className="w-5 h-5" /></button>
          </form>

          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <button onClick={currentUser ? (currentUser.role === 'admin' ? onOpenAdmin : onOpenAccount) : onOpenLogin} className="text-left leading-tight">
              <span className="block text-[11px] text-slate-300">{currentUser ? `Hello, ${currentUser.name}` : 'Hello, sign in'}</span>
              <strong className="text-xs">{currentUser?.role === 'admin' ? 'Admin portal' : 'Account'} <ChevronDown className="inline w-3 h-3" /></strong>
            </button>
            <button onClick={() => go('cart')} className="relative flex items-center gap-1.5 text-sm font-bold"><ShoppingCart className="w-8 h-8" /><span>Cart</span>{cartCount > 0 && <span className="absolute -top-2 left-4 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#ffb000] px-1 text-xs text-slate-950">{cartCount}</span>}</button>
          </div>

          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-slate-300" aria-label="Open menu">{mobileOpen ? <X /> : <Menu />}</button>
        </div>

        <nav className="hidden lg:flex h-11 items-center gap-7 text-sm font-semibold text-slate-200">
          <button onClick={() => go('catalog')} className="hover:text-[#ffb000]">Shop all</button>
          <button onClick={() => go('catalog')} className="hover:text-[#ffb000]">Today's deals</button>
          <button onClick={() => go('recommend')} className="hover:text-[#ffb000]">AI shopping assistant</button>
          <button onClick={() => go('compare')} className="hover:text-[#ffb000]">Compare {compareCount > 0 && <span className="ml-1 text-[#ffb000]">({compareCount})</span>}</button>
          <span className="ml-auto text-xs text-slate-400">Delivering across India</span>
        </nav>
      </div>

      {mobileOpen && <div className="lg:hidden border-t border-slate-700 bg-[#182530] px-4 py-4 space-y-2"><button onClick={() => go('catalog')} className="block w-full py-2 text-left">Shop all</button><button onClick={() => go('recommend')} className="block w-full py-2 text-left">AI shopping assistant</button><button onClick={() => go('compare')} className="block w-full py-2 text-left">Compare {compareCount > 0 && `(${compareCount})`}</button><button onClick={currentUser ? onOpenAccount : onOpenLogin} className="flex items-center gap-2 w-full py-2 text-left"><UserRound className="w-4 h-4" /> {currentUser ? 'My account' : 'Sign in'}</button></div>}
    </header>
  );
};
