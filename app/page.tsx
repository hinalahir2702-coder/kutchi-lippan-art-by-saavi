'use client';
import { useMemo, useState } from 'react';

type Product={id:number;name:string;cat:string;price:number;image:string;note?:string};
const products:Product[]=[
 {id:1,name:'Rann Sun Mandala',cat:'Mandalas',price:320,image:'/products/sun-mandala.jpg',note:'One of one · 36 in'},
 {id:2,name:'Geru Celebration Mandala',cat:'Mandalas',price:280,image:'/products/red-mandala.jpg'},
 {id:3,name:'Turquoise Jharokha Mandala',cat:'Mandalas',price:195,image:'/archive/turquoise-mandala.jpg'},
 {id:4,name:'Village Mini Mandala Set',cat:'Mandalas',price:98,image:'/archive/mini-mandalas.jpg'},
 {id:5,name:'Chakra Wall Tile',cat:'Mandalas',price:110,image:'/archive/chakra.jpg'},
 {id:6,name:'Sun & Earth Diamond',cat:'Mandalas',price:145,image:'/archive/yellow-diamond.jpg'},
 {id:7,name:'Terracotta Story Panel',cat:'Wall Art',price:235,image:'/archive/terracotta-panel.jpg'},
 {id:8,name:'Camel of Kutch',cat:'Wall Art',price:120,image:'/archive/camel.jpg'},
 {id:9,name:'Folk Life Grid',cat:'Wall Art',price:210,image:'/archive/folk-grid.jpg'},
 {id:10,name:'Kutchi Folk Panel',cat:'Wall Art',price:245,image:'/archive/folk-panel.jpg'},
 {id:11,name:'Tree of Life',cat:'Wall Art',price:420,image:'/archive/tree-of-life.jpg'},
 {id:12,name:'White Mirror Triptych',cat:'Wall Art',price:330,image:'/archive/white-triptych.jpg'},
 {id:13,name:'Folk Symbols Panel',cat:'Wall Art',price:385,image:'/archive/folk-symbols.jpg'},
 {id:14,name:'White Diamond Panel',cat:'Wall Art',price:260,image:'/archive/white-diamond.jpg'},
 {id:15,name:'Golden Tree Installation',cat:'Wall Art',price:690,image:'/archive/tree-installation.jpg'},
 {id:16,name:'Elephant Ghar Key Holder',cat:'Useful Art',price:72,image:'/products/key-holder.jpg'},
 {id:17,name:'Red Ghar Key Holder',cat:'Useful Art',price:72,image:'/products/key-holder-red.jpg'},
 {id:18,name:'Rann Keepsake Box',cat:'Useful Art',price:88,image:'/products/rust-box.jpg'},
 {id:19,name:'Marigold Keepsake Box',cat:'Useful Art',price:96,image:'/products/yellow-box.jpg'},
 {id:20,name:'Sky Keepsake Box',cat:'Useful Art',price:96,image:'/archive/blue-box.jpg'},
 {id:21,name:'Mehndi Tissue Box',cat:'Useful Art',price:64,image:'/products/green-tissue.jpg'},
 {id:22,name:'Terracotta Mirror',cat:'Mirrors',price:165,image:'/archive/terra-mirror.jpg'},
 {id:23,name:'White Cascade Mirror',cat:'Mirrors',price:240,image:'/archive/white-mirror-panel.jpg'},
 {id:24,name:'Elephant Folk Tile',cat:'Folk Tiles',price:54,image:'/archive/elephant-tile.jpg'},
 {id:25,name:'Purple Peacock Tile',cat:'Folk Tiles',price:54,image:'/archive/peacock-purple.jpg'},
 {id:26,name:'Green Peacock Tile',cat:'Folk Tiles',price:54,image:'/archive/peacock-green.jpg'},
 {id:27,name:'Blue Bird Tile',cat:'Folk Tiles',price:54,image:'/archive/bird-blue.jpg'},
 {id:28,name:'Dancer Folk Tile',cat:'Folk Tiles',price:54,image:'/archive/dancer.jpg'},
 {id:29,name:'Musician Folk Tile',cat:'Folk Tiles',price:54,image:'/archive/musician.jpg'},
 {id:30,name:'Twin Peacock Tile',cat:'Folk Tiles',price:54,image:'/archive/peacock-double.jpg'},
 {id:31,name:'Red Elephant Panel',cat:'Folk Tiles',price:88,image:'/archive/red-elephant.jpg'},
 {id:32,name:'Folk Tile Collection',cat:'Folk Tiles',price:540,image:'/archive/tile-collection.jpg'},
 {id:33,name:'Radha Mirror Medallion',cat:'Sacred Art',price:180,image:'/archive/radha.jpg'},
 {id:34,name:'Shrinathji Medallion',cat:'Sacred Art',price:210,image:'/archive/shrinathji.jpg'},
 {id:35,name:'Ganesha Wall Blessing',cat:'Sacred Art',price:175,image:'/products/ganesh.jpg'},
];
const cats=['All','Mandalas','Wall Art','Useful Art','Mirrors','Folk Tiles','Sacred Art'];

export default function Home(){
 const [cat,setCat]=useState('All'); const [cart,setCart]=useState<Record<number,number>>({}); const [cartOpen,setCartOpen]=useState(false); const [menu,setMenu]=useState(false); const [selected,setSelected]=useState<Product|null>(null);
 const shown=cat==='All'?products:products.filter(p=>p.cat===cat); const count=Object.values(cart).reduce((a,b)=>a+b,0); const total=useMemo(()=>products.reduce((s,p)=>s+(cart[p.id]||0)*p.price,0),[cart]);
 const add=(p:Product)=>{setCart(c=>({...c,[p.id]:(c[p.id]||0)+1}));setCartOpen(true)}; const qty=(id:number,n:number)=>setCart(c=>{const next={...c};if(n<=0)delete next[id];else next[id]=n;return next});
 return <main>
  <div className="grain"/><div className="announcement">ખમ્મા ઘણી · KHAMMA GHANI <span>✦</span> Handcrafted in Kutch · Shipping to the U.S.</div>
  <header className="nav"><a className="brand" href="#top"><i>✦</i><span>KUTCHI LIPPAN ART<em>by Saavi</em></span></a><button className="menu" onClick={()=>setMenu(!menu)}>{menu?'Close':'Menu'}</button><nav className={menu?'open':''}><a href="#shop">Collection</a><a href="#story">Saavi&apos;s Story</a><a href="#making">The Making</a></nav><button className="bag" onClick={()=>setCartOpen(true)}>Bag <b>{count}</b></button></header>
  <section className="hero" id="top"><img src="/kutch-women-artisans-ai.png" alt="Artistic representation of Kutchi women creating Lippan art together"/><div className="hero-shade"/><div className="hero-copy"><p className="eyebrow">A love letter from the salt desert</p><h1>Made of <i>mitti.</i><br/>Lit by <i>mirrors.</i></h1><p>Objects shaped by Saavi&apos;s hands, carrying the old songs, bright courtyards, and generous spirit of Kutch into your home.</p><a href="#shop">Enter the collection <span>↓</span></a></div><div className="ai-note">ARTISTIC REPRESENTATION · CREATED WITH AI</div><div className="sun-seal">કચ્છ<br/><small>KUTCH</small></div></section>
  <section className="ticker"><div>CLAY remembers · MIRRORS gather light · HANDS carry stories · CLAY remembers · MIRRORS gather light · HANDS carry stories ·</div></section>
  <section className="story" id="story"><div className="story-left"><p className="num">01 / SAAVI&apos;S STORY</p><h2>“I make each line<br/>the way I <i>feel it.</i>”</h2><p className="drop">In Kutch, art has never lived only in galleries. It lives on walls, in courtyards, around doorways—and in the hands of women who gather, talk, laugh, and make.</p><p>Saavi brings that intimate rhythm to every piece. Clay is rolled by hand. Mirrors are set one by one. The tiny differences are not flaws; they are proof that a person was here.</p><a href="#making">Watch Saavi at work →</a></div><div className="story-collage"><img className="large" src="/products/key-holder-red.jpg" alt="Saavi's handcrafted key holder"/><img className="small" src="/archive/mini-mandalas.jpg" alt="Colorful collection of small mandalas"/><span>ઘર · HOME</span></div></section>
  <section className="process" id="making"><div className="process-video"><video src="/video/making.mp4" controls muted playsInline poster="/products/ganesh.jpg"/><b>SAAVI AT WORK</b></div><div><p className="num">02 / FROM HER HANDS</p><h2>Mud. Mirror.<br/><i>Memory.</i></h2><ol><li><span>01</span><p><b>Draw the rhythm</b>Each motif begins without a template—guided by memory and instinct.</p></li><li><span>02</span><p><b>Shape the earth</b>Clay is rolled and pressed into lines that rise from the surface.</p></li><li><span>03</span><p><b>Invite the light</b>Mirrors are placed one by one, giving every piece its changing glow.</p></li></ol></div></section>
  <section className="shop" id="shop"><div className="shop-head"><div><p className="num">04 / THE FULL ARCHIVE</p><h2>Find your piece<br/>of <i>Kutch.</i></h2></div><p>{products.length} designs from Saavi&apos;s photo archive, gathered by form and feeling.</p></div><div className="filters">{cats.map(c=><button className={cat===c?'active':''} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div><div className="grid">{shown.map((p,i)=><article className="card" key={p.id}><button className="photo" onClick={()=>setSelected(p)} aria-label={`View ${p.name}`}><img src={p.image} alt={p.name}/><span>{String(i+1).padStart(2,'0')}</span><i>View</i></button><div><h3>{p.name}</h3><p>{p.cat} · Handmade</p><strong>${p.price}</strong><button onClick={()=>add(p)}>Add to bag +</button></div></article>)}</div></section>
  <section className="closing"><p>From one Kutchi home<br/>to <i>yours.</i></p><a href="#shop">Choose what calls to you →</a></section>
  <footer><a className="brand" href="#top"><i>✦</i><span>KUTCHI LIPPAN ART<em>by Saavi</em></span></a><p>Crafted in Kutch. Shared with the world.</p><small>© 2026 Kutchi Lippan Art by Saavi</small></footer>
  <div className={`drawer-back ${cartOpen?'show':''}`} onClick={()=>setCartOpen(false)}/><aside className={`cart ${cartOpen?'show':''}`} aria-label="Shopping bag"><div className="cart-title"><h2>Your bag <i>({count})</i></h2><button onClick={()=>setCartOpen(false)}>Close</button></div>{count===0?<div className="empty"><b>Your bag is waiting.</b><p>Choose a piece that feels like home.</p><button onClick={()=>{setCartOpen(false);document.querySelector('#shop')?.scrollIntoView({behavior:'smooth'})}}>Explore collection</button></div>:<><div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-row" key={p.id}><img src={p.image} alt=""/><div><b>{p.name}</b><small>${p.price}</small><div className="stepper"><button onClick={()=>qty(p.id,cart[p.id]-1)}>−</button><span>{cart[p.id]}</span><button onClick={()=>qty(p.id,cart[p.id]+1)}>+</button></div></div><button className="remove" onClick={()=>qty(p.id,0)}>×</button></div>)}</div><div className="checkout"><p><span>Subtotal</span><b>${total}</b></p><small>Shipping calculated at checkout</small><button onClick={()=>alert('Checkout connection will be added when your payment account is ready.')}>Continue to checkout →</button></div></>}</aside>
  {selected&&<div className="modal" role="dialog"><button className="modal-close" onClick={()=>setSelected(null)}>Close ×</button><img src={selected.image} alt={selected.name}/><div><p className="num">{selected.cat}</p><h2>{selected.name}</h2><p>Handmade by Saavi in Kutch. Natural variations in clay lines and mirror placement make this piece entirely yours.</p><b>${selected.price}</b><button onClick={()=>{add(selected);setSelected(null)}}>Add to bag →</button></div></div>}
 </main>
}
