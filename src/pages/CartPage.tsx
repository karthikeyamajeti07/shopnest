import React, { useState } from 'react';
import { ArrowRight, Minus, Plus, ShieldCheck, Trash2, Truck } from 'lucide-react';
import { ActiveTab, Product } from '../types';
import { ApiService } from '../services/api';

interface CartPageProps { token: string; products: Product[]; onQuantityChange: (productId: number, quantity: number) => void; onRemove: (productId: number) => void; setActiveTab: (tab: ActiveTab) => void; onOrderCreated: () => void; }

export const CartPage: React.FC<CartPageProps> = ({ token, products, onQuantityChange, onRemove, setActiveTab, onOrderCreated }) => {
  const [address, setAddress] = useState('');
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const grouped = products.reduce<{ product: Product; quantity: number }[]>((items, product) => { const existing = items.find(item => item.product.id === product.id); if (existing) existing.quantity += 1; else items.push({ product, quantity: 1 }); return items; }, []);
  const total = products.reduce((sum, product) => sum + product.price, 0);

  const checkout = async (event: React.FormEvent) => {
    event.preventDefault(); setBusy(true); setError('');
    try { await ApiService.checkout(token, address); onOrderCreated(); setActiveTab('account'); }
    catch (err) { setError((err as Error).message); } finally { setBusy(false); }
  };

  if (!products.length) return <div className="min-h-[calc(100vh-160px)] bg-[#eaeded] p-8"><div className="max-w-4xl mx-auto bg-white p-12 text-center"><h1 className="text-2xl font-black text-[#172b3a]">Your cart is empty</h1><p className="text-sm text-slate-500 mt-2">Add something useful to get started.</p><button onClick={() => setActiveTab('catalog')} className="mt-6 rounded-full bg-[#ffd814] px-6 py-2.5 text-sm font-bold">Continue shopping</button></div></div>;

  return <div className="min-h-[calc(100vh-160px)] bg-[#eaeded] p-4 sm:p-8"><div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_340px] gap-5"><section className="bg-white p-5 sm:p-7"><div className="flex items-end justify-between border-b border-slate-200 pb-4"><div><p className="text-xs uppercase tracking-widest font-bold text-[#c4552d]">Ready when you are</p><h1 className="text-3xl font-black text-[#172b3a]">Shopping cart</h1></div><span className="text-sm text-slate-500">{products.length} item{products.length === 1 ? '' : 's'}</span></div><div className="divide-y divide-slate-200">{grouped.map(({ product, quantity }) => <div key={product.id} className="py-5 flex gap-4"><img src={product.image} alt={product.name} className="w-24 h-24 object-cover bg-slate-100" /><div className="flex-1 min-w-0"><p className="text-xs text-slate-500">{product.brand}</p><h2 className="font-bold text-[#172b3a] mt-1">{product.name}</h2><p className="text-lg font-black mt-2">₹{product.price.toLocaleString('en-IN')}</p><div className="flex items-center gap-3 mt-3"><button onClick={() => onRemove(product.id)} className="text-xs text-[#007185] hover:underline flex items-center gap-1"><Trash2 className="w-3.5 h-3.5" /> Remove</button><span className="flex items-center border border-slate-300 rounded-md"><button onClick={() => onQuantityChange(product.id, Math.max(0, quantity - 1))} className="p-1.5"><Minus className="w-3 h-3" /></button><span className="px-3 text-xs font-bold">{quantity}</span><button onClick={() => onQuantityChange(product.id, quantity + 1)} className="p-1.5"><Plus className="w-3 h-3" /></button></span></div></div></div>)}</div></section><aside className="bg-white p-6 h-fit"><div className="flex items-center gap-2 text-emerald-700 text-sm font-bold"><Truck className="w-5 h-5" /> Free delivery available</div><div className="flex justify-between mt-6 text-lg"><span>Subtotal</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><div className="flex gap-2 text-xs text-slate-500 mt-3"><ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" /> Secure checkout with protected payment details.</div>{!checkoutOpen ? <button onClick={() => setCheckoutOpen(true)} className="mt-6 w-full rounded-full bg-[#ffd814] py-3 text-sm font-bold flex items-center justify-center gap-2">Proceed to checkout <ArrowRight className="w-4 h-4" /></button> : <form onSubmit={checkout} className="mt-6 space-y-3"><label className="block text-sm font-bold text-[#172b3a]">Delivery address<textarea required minLength={8} value={address} onChange={event => setAddress(event.target.value)} placeholder="House, street, city, pincode" className="mt-1 w-full min-h-24 border border-slate-300 rounded-md p-3 text-sm font-normal" /></label>{error && <p className="text-xs text-red-700 bg-red-50 p-2">{error}</p>}<button disabled={busy} className="w-full rounded-full bg-[#ffd814] py-3 text-sm font-bold">{busy ? 'Placing order...' : 'Place order'}</button></form>}</aside></div></div>;
};
