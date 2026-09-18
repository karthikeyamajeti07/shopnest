import React, { useEffect, useState } from 'react';
import { ArrowRight, ChevronRight, Clock3, Heart, PackageCheck, ShoppingCart, Sparkles, Star } from 'lucide-react';
import { ActiveTab, Product } from '../types';
import { ApiService } from '../services/api';

interface HomePageProps {
  setActiveTab: (tab: ActiveTab) => void;
  onViewProductDetail: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ setActiveTab, onViewProductDetail, onAddToCart }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    ApiService.getProducts({ sortBy: 'featured' })
      .then(response => setProducts(response.products.slice(0, 8)))
      .catch(() => setProducts([]));
  }, []);

  const categories = [
    { label: 'Mobiles & tablets', emoji: '📱', color: 'bg-[#d9f3f0]' },
    { label: 'Laptops', emoji: '💻', color: 'bg-[#dce9fb]' },
    { label: 'Audio', emoji: '🎧', color: 'bg-[#f8e1d8]' },
    { label: 'Smart watches', emoji: '⌚', color: 'bg-[#eee3f8]' },
    { label: 'Shoes', emoji: '👟', color: 'bg-[#f8edcf]' },
    { label: 'Cameras', emoji: '📷', color: 'bg-[#dcebd8]' },
  ];

  return (
    <div className="bg-[#eaeded] pb-14">
      <section className="relative min-h-[350px] overflow-hidden bg-[#dfeef4]">
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#f4f8fa_0%,#e3eff3_42%,rgba(224,238,243,0.2)_100%)]" />
        <div className="relative max-w-[1500px] mx-auto px-5 py-12 sm:py-16 flex items-center min-h-[350px]">
          <div className="max-w-xl">
            <p className="text-sm font-bold text-[#c4552d] uppercase tracking-[0.18em] mb-3">The smart way to shop</p>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-[#172b3a] leading-[0.98]">Find your next<br /><span className="text-[#006b70]">everyday essential.</span></h1>
            <p className="mt-5 text-base text-slate-600 max-w-md">Curated products, clear prices, and an AI assistant that helps you choose with confidence.</p>
            <button onClick={() => setActiveTab('catalog')} className="mt-7 inline-flex items-center gap-2 bg-[#ff9900] hover:bg-[#e68a00] text-slate-950 font-bold px-5 py-3 rounded-md shadow-sm">Shop today's picks <ArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="hidden md:block absolute right-[8%] bottom-0 text-[170px] leading-none grayscale-[.15] opacity-80">🛍️</div>
        </div>
      </section>

      <main className="max-w-[1500px] mx-auto px-3 sm:px-5 -mt-8 relative space-y-5">
        <section className="bg-white p-5 sm:p-7 shadow-sm">
          <div className="flex items-end justify-between mb-5"><div><p className="text-xs font-bold uppercase tracking-widest text-[#c4552d]">Browse by department</p><h2 className="text-2xl font-bold text-[#172b3a] mt-1">Shop what you need</h2></div><button onClick={() => setActiveTab('catalog')} className="text-sm font-semibold text-[#007185] hover:underline">See all <ChevronRight className="inline w-4 h-4" /></button></div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map(category => <button key={category.label} onClick={() => setActiveTab('catalog')} className={`${category.color} min-h-32 p-4 flex flex-col items-center justify-center gap-2 hover:brightness-95 transition`}><span className="text-5xl">{category.emoji}</span><span className="text-sm font-bold text-[#172b3a]">{category.label}</span></button>)}
          </div>
        </section>

        <section className="bg-[#fff4e5] border-l-4 border-[#ff9900] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"><div className="flex items-center gap-3"><Clock3 className="w-6 h-6 text-[#c4552d]" /><div><p className="font-black text-[#172b3a]">Deals picked for you</p><p className="text-sm text-slate-600">Fresh finds under your budget, updated from our live catalog.</p></div></div><button onClick={() => setActiveTab('recommend')} className="text-sm font-bold text-[#007185] hover:underline">Ask the AI assistant <ArrowRight className="inline w-4 h-4" /></button></section>

        <section className="bg-white p-5 sm:p-7 shadow-sm">
          <div className="flex items-end justify-between mb-5"><div><p className="text-xs font-bold uppercase tracking-widest text-[#c4552d]">Featured today</p><h2 className="text-2xl font-bold text-[#172b3a] mt-1">Popular with shoppers</h2></div><button onClick={() => setActiveTab('catalog')} className="text-sm font-semibold text-[#007185] hover:underline">View the full catalog <ChevronRight className="inline w-4 h-4" /></button></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {products.map(product => <article key={product.id} className="group border border-slate-200 bg-white p-3 flex flex-col min-w-0"><button onClick={() => onViewProductDetail(product)} className="bg-[#f7f7f7] aspect-square flex items-center justify-center overflow-hidden"><img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" /></button><div className="pt-3 flex-1"><p className="text-xs text-slate-500">{product.brand}</p><button onClick={() => onViewProductDetail(product)} className="text-left text-sm font-semibold text-[#172b3a] hover:text-[#c4552d] line-clamp-2 mt-1">{product.name}</button><div className="flex items-center gap-1 mt-2"><span className="text-xs font-bold text-[#b75d00]">{product.rating}</span><Star className="w-3.5 h-3.5 fill-[#ff9900] text-[#ff9900]" /><span className="text-xs text-slate-400">• {product.deliveryDays} day delivery</span></div><p className="text-lg font-black text-[#172b3a] mt-2">₹{product.price.toLocaleString('en-IN')}</p></div><button onClick={() => onAddToCart(product)} className="mt-3 w-full py-2 rounded-full bg-[#ffd814] hover:bg-[#f7ca00] text-xs font-bold flex items-center justify-center gap-1"><ShoppingCart className="w-3.5 h-3.5" /> Add to cart</button></article>)}
          </div>
          {!products.length && <div className="py-12 text-center text-sm text-slate-500">Loading today's picks...</div>}
        </section>

        <section className="grid md:grid-cols-3 gap-5">
          {[{ icon: <PackageCheck />, title: 'Reliable delivery', text: 'See estimated delivery times before you buy.', tab: 'catalog' as ActiveTab }, { icon: <Sparkles />, title: 'Smarter recommendations', text: 'Tell us what matters and get a ranked shortlist.', tab: 'recommend' as ActiveTab }, { icon: <Heart />, title: 'Easy comparisons', text: 'Keep your finalists together while you decide.', tab: 'compare' as ActiveTab }].map(item => <button key={item.title} onClick={() => setActiveTab(item.tab)} className="bg-white p-5 text-left flex gap-4 hover:shadow-md transition-shadow"><span className="text-[#007185]">{item.icon}</span><span><strong className="block text-[#172b3a]">{item.title}</strong><span className="text-sm text-slate-500">{item.text}</span></span></button>)}
        </section>
      </main>
    </div>
  );
};
