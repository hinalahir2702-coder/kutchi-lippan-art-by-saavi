'use client';
import { type FormEvent, useMemo, useRef, useState } from 'react';

type Product={id:number;name:string;cat:string;price:number;image:string;note?:string};
const products:Product[]=[
 {id:1,name:'Rann Sun Mandala',cat:'Mandalas',price:320,image:'products/sun-mandala.jpg',note:'One of one · 36 in'},
 {id:2,name:'Geru Celebration Mandala',cat:'Mandalas',price:280,image:'products/red-mandala.jpg'},
 {id:3,name:'Turquoise Jharokha Mandala',cat:'Mandalas',price:195,image:'archive/turquoise-mandala.jpg'},
 {id:4,name:'Village Mini Mandala Set',cat:'Mandalas',price:98,image:'archive/mini-mandalas.jpg'},
 {id:5,name:'Chakra Wall Tile',cat:'Mandalas',price:110,image:'archive/chakra.jpg'},
 {id:6,name:'Sun & Earth Diamond',cat:'Mandalas',price:145,image:'archive/yellow-diamond.jpg'},
 {id:7,name:'Terracotta Story Panel',cat:'Wall Art',price:235,image:'archive/terracotta-panel.jpg'},
 {id:8,name:'Camel of Kutch',cat:'Wall Art',price:120,image:'archive/camel.jpg'},
 {id:9,name:'Folk Life Grid',cat:'Wall Art',price:210,image:'archive/folk-grid.jpg'},
 {id:10,name:'Kutchi Folk Panel',cat:'Wall Art',price:245,image:'archive/folk-panel.jpg'},
 {id:11,name:'Tree of Life',cat:'Wall Art',price:420,image:'archive/tree-of-life.jpg'},
 {id:12,name:'White Mirror Triptych',cat:'Wall Art',price:330,image:'archive/white-triptych.jpg'},
 {id:13,name:'Folk Symbols Panel',cat:'Wall Art',price:385,image:'archive/folk-symbols.jpg'},
 {id:14,name:'White Diamond Panel',cat:'Wall Art',price:260,image:'archive/white-diamond.jpg'},
 {id:15,name:'Golden Tree Installation',cat:'Wall Art',price:690,image:'archive/tree-installation.jpg'},
 {id:16,name:'Elephant Ghar Key Holder',cat:'Useful Art',price:72,image:'products/key-holder.jpg'},
 {id:17,name:'Red Ghar Key Holder',cat:'Useful Art',price:72,image:'products/key-holder-red.jpg'},
 {id:18,name:'Rann Keepsake Box',cat:'Useful Art',price:88,image:'products/rust-box.jpg'},
 {id:19,name:'Marigold Keepsake Box',cat:'Useful Art',price:96,image:'products/yellow-box.jpg'},
 {id:20,name:'Sky Keepsake Box',cat:'Useful Art',price:96,image:'archive/blue-box.jpg'},
 {id:21,name:'Mehndi Tissue Box',cat:'Useful Art',price:64,image:'products/green-tissue.jpg'},
 {id:22,name:'Terracotta Mirror',cat:'Mirrors',price:165,image:'archive/terra-mirror.jpg'},
 {id:23,name:'White Cascade Mirror',cat:'Mirrors',price:240,image:'archive/white-mirror-panel.jpg'},
 {id:24,name:'Elephant Folk Tile',cat:'Folk Tiles',price:54,image:'archive/elephant-tile.jpg'},
 {id:25,name:'Purple Peacock Tile',cat:'Folk Tiles',price:54,image:'archive/peacock-purple.jpg'},
 {id:26,name:'Green Peacock Tile',cat:'Folk Tiles',price:54,image:'archive/peacock-green.jpg'},
 {id:27,name:'Blue Bird Tile',cat:'Folk Tiles',price:54,image:'archive/bird-blue.jpg'},
 {id:28,name:'Dancer Folk Tile',cat:'Folk Tiles',price:54,image:'archive/dancer.jpg'},
 {id:29,name:'Musician Folk Tile',cat:'Folk Tiles',price:54,image:'archive/musician.jpg'},
 {id:30,name:'Twin Peacock Tile',cat:'Folk Tiles',price:54,image:'archive/peacock-double.jpg'},
 {id:31,name:'Red Elephant Panel',cat:'Folk Tiles',price:88,image:'archive/red-elephant.jpg'},
 {id:32,name:'Folk Tile Collection',cat:'Folk Tiles',price:540,image:'archive/tile-collection.jpg'},
 {id:33,name:'Radha Mirror Medallion',cat:'Sacred Art',price:180,image:'archive/radha.jpg'},
 {id:34,name:'Shrinathji Medallion',cat:'Sacred Art',price:210,image:'archive/shrinathji.jpg'},
 {id:35,name:'Ganesha Wall Blessing',cat:'Sacred Art',price:175,image:'products/ganesh.jpg'},
];
const cats=['All','Mandalas','Wall Art','Useful Art','Mirrors','Folk Tiles','Sacred Art'];

export default function Home(){
 const [cat,setCat]=useState('All'); const [cart,setCart]=useState<Record<number,number>>({}); const [cartOpen,setCartOpen]=useState(false); const [menu,setMenu]=useState(false); const [selected,setSelected]=useState<Product|null>(null);
 const [inquiryOpen,setInquiryOpen]=useState(false); const [inquiryContext,setInquiryContext]=useState(''); const [formStatus,setFormStatus]=useState<'idle'|'sending'|'success'|'error'>('idle');
 const heroVideo=useRef<HTMLVideoElement|null>(null); const [playing,setPlaying]=useState(true); const [muted,setMuted]=useState(true);
 const shown=cat==='All'?products:products.filter(p=>p.cat===cat); const count=Object.values(cart).reduce((a,b)=>a+b,0); const total=useMemo(()=>products.reduce((s,p)=>s+(cart[p.id]||0)*p.price,0),[cart]);
 const add=(p:Product)=>{setCart(c=>({...c,[p.id]:(c[p.id]||0)+1}));setCartOpen(true)}; const qty=(id:number,n:number)=>setCart(c=>{const next={...c};if(n<=0)delete next[id];else next[id]=n;return next});
 const togglePlayback=()=>{const video=heroVideo.current;if(!video)return;if(video.paused){void video.play();}else video.pause()};
 const toggleSound=()=>{const video=heroVideo.current;if(!video)return;video.muted=!video.muted;setMuted(video.muted)};
 const cartSummary=products.filter(p=>cart[p.id]).map(p=>`${cart[p.id]} × ${p.name} — $${p.price*cart[p.id]}`).join('\n');
 const openInquiry=(piece?:Product)=>{setInquiryContext(piece?`${piece.name} — $${piece.price}`:cartSummary);setSelected(null);setCartOpen(false);setFormStatus('idle');setInquiryOpen(true)};
 const submitInquiry=async(event:FormEvent<HTMLFormElement>)=>{event.preventDefault();const form=event.currentTarget;setFormStatus('sending');try{const response=await fetch('https://formsubmit.co/ajax/kutchiartbysaavi@gmail.com',{method:'POST',headers:{Accept:'application/json'},body:new FormData(form)});if(!response.ok)throw new Error('Unable to send');form.reset();setFormStatus('success')}catch{setFormStatus('error')}};
 return <main>
  <div className="grain"/><div className="announcement">ખમ્મા ઘણી · KHAMMA GHANI <span>✦</span> Handcrafted in Kutch · Shipping to the U.S.</div>
  <header className="nav nav-overlay"><a className="brand" href="#top"><i>✦</i><span>KUTCHI LIPPAN ART<em>by Saavi</em></span></a><button className="menu" onClick={()=>setMenu(!menu)}>{menu?'Close':'Menu'}</button><nav className={menu?'open':''}><a href="#shop">Collection</a><a href="#story">Saavi&apos;s Story</a><a href="#making">The Making</a></nav><button className="bag" onClick={()=>setCartOpen(true)}>Bag <b>{count}</b></button></header>
  <section className="cinematic-hero" id="top" aria-label="The story of Kutchi Lippan Art by Saavi">
   <video ref={heroVideo} src="video/saavi-heritage-hero.mp4" poster="video/saavi-heritage-poster.jpg" autoPlay muted loop playsInline preload="auto" onPlay={()=>setPlaying(true)} onPause={()=>setPlaying(false)}/>
   <div className="cinematic-shade"/>
   <div className="cinematic-copy"><p>A living tradition</p><h1>Kutchi Lippan Art <i>by Saavi</i></h1><div><a href="#shop">Explore the collection</a><a href="#story">Meet Saavi</a></div></div>
   <div className="cinematic-controls"><button onClick={togglePlayback} aria-label={playing?'Pause opening film':'Play opening film'}>{playing?'Pause':'Play'}</button><button onClick={toggleSound} aria-label={muted?'Turn film sound on':'Mute film'}>{muted?'Sound on':'Mute'}</button></div>
  </section>
  <section className="hero"><div className="hero-copy"><p className="eyebrow">A love letter from the salt desert</p><h2 className="intro-title">Made of <i>mitti.</i><br/>Lit by <i>mirrors.</i></h2><p>Objects shaped by Saavi&apos;s hands, carrying the old songs, bright courtyards, and generous spirit of Kutch into your home.</p><a href="#shop">Enter the collection <span>↓</span></a></div></section>
  <section className="ticker"><div>CLAY remembers · MIRRORS gather light · HANDS carry stories · CLAY remembers · MIRRORS gather light · HANDS carry stories ·</div></section>
  <section className="story" id="story"><div className="story-left"><p className="num">01 / SAAVI&apos;S STORY</p><h2>“I make each line<br/>the way I <i>feel it.</i>”</h2><p className="drop">In Kutch, art has never lived only in galleries. It lives on walls, in courtyards, around doorways—and in the hands of women who gather, talk, laugh, and make.</p><p>Saavi brings that intimate rhythm to every piece. Clay is rolled by hand. Mirrors are set one by one. The tiny differences are not flaws; they are proof that a person was here.</p><a href="#making">Watch Saavi at work →</a></div><div className="story-collage"><img className="large" src="products/key-holder-red.jpg" alt="Saavi's handcrafted key holder"/><img className="small" src="archive/mini-mandalas.jpg" alt="Colorful collection of small mandalas"/><span>ઘર · HOME</span></div></section>
  <section className="process" id="making"><div className="process-video"><video src="video/making.mp4" controls muted playsInline poster="products/ganesh.jpg"/><b>SAAVI AT WORK</b></div><div><p className="num">02 / FROM HER HANDS</p><h2>Mud. Mirror.<br/><i>Memory.</i></h2><ol><li><span>01</span><p><b>Draw the rhythm</b>Each motif begins without a template—guided by memory and instinct.</p></li><li><span>02</span><p><b>Shape the earth</b>Clay is rolled and pressed into lines that rise from the surface.</p></li><li><span>03</span><p><b>Invite the light</b>Mirrors are placed one by one, giving every piece its changing glow.</p></li></ol></div></section>
  <section className="shop" id="shop"><div className="shop-head"><div><p className="num">04 / THE FULL ARCHIVE</p><h2>Find your piece<br/>of <i>Kutch.</i></h2></div><p>{products.length} designs from Saavi&apos;s photo archive, gathered by form and feeling.</p></div><div className="filters">{cats.map(c=><button className={cat===c?'active':''} onClick={()=>setCat(c)} key={c}>{c}</button>)}</div><div className="grid">{shown.map((p,i)=><article className="card" key={p.id}><button className="photo" onClick={()=>setSelected(p)} aria-label={`View ${p.name}`}><img src={p.image} alt={p.name}/><span>{String(i+1).padStart(2,'0')}</span><i>View</i></button><div><h3>{p.name}</h3><p>{p.cat} · Handmade</p><strong>${p.price}</strong><button onClick={()=>add(p)}>Add to bag +</button></div></article>)}</div></section>
  <section className="closing"><p>From one Kutchi home<br/>to <i>yours.</i></p><button onClick={()=>openInquiry()}>Begin an enquiry →</button></section>
  <footer><a className="brand" href="#top"><i>✦</i><span>KUTCHI LIPPAN ART<em>by Saavi</em></span></a><p>Crafted in Kutch. Shared with the world.<br/><a className="footer-email" href="mailto:kutchiartbysaavi@gmail.com">kutchiartbysaavi@gmail.com</a></p><small>© 2026 Kutchi Lippan Art by Saavi</small></footer>
  <div className={`drawer-back ${cartOpen?'show':''}`} onClick={()=>setCartOpen(false)}/><aside className={`cart ${cartOpen?'show':''}`} aria-label="Shopping bag"><div className="cart-title"><h2>Your bag <i>({count})</i></h2><button onClick={()=>setCartOpen(false)}>Close</button></div>{count===0?<div className="empty"><b>Your bag is waiting.</b><p>Choose a piece that feels like home, or tell Saavi what you are looking for.</p><button onClick={()=>openInquiry()}>Start an enquiry</button></div>:<><div className="cart-items">{products.filter(p=>cart[p.id]).map(p=><div className="cart-row" key={p.id}><img src={p.image} alt=""/><div><b>{p.name}</b><small>${p.price}</small><div className="stepper"><button onClick={()=>qty(p.id,cart[p.id]-1)}>−</button><span>{cart[p.id]}</span><button onClick={()=>qty(p.id,cart[p.id]+1)}>+</button></div></div><button className="remove" onClick={()=>qty(p.id,0)}>×</button></div>)}</div><div className="checkout"><p><span>Estimated total</span><b>${total}</b></p><small>No payment is taken online. Saavi will confirm availability, shipping, and next steps by email.</small><button onClick={()=>openInquiry()}>Send order request →</button></div></>}</aside>
  {selected&&<div className="modal" role="dialog" aria-modal="true"><button className="modal-close" onClick={()=>setSelected(null)}>Close ×</button><img src={selected.image} alt={selected.name}/><div><p className="num">{selected.cat}</p><h2>{selected.name}</h2><p>Handmade by Saavi in Kutch. Natural variations in clay lines and mirror placement make this piece entirely yours.</p><b>${selected.price}</b><div className="modal-actions"><button onClick={()=>{add(selected);setSelected(null)}}>Add to bag →</button><button className="secondary" onClick={()=>openInquiry(selected)}>Ask about this piece</button></div></div></div>}
  {inquiryOpen&&<><div className="inquiry-back" onClick={()=>setInquiryOpen(false)}/><section className="inquiry-modal" role="dialog" aria-modal="true" aria-labelledby="inquiry-title"><button className="inquiry-close" onClick={()=>setInquiryOpen(false)} aria-label="Close enquiry form">Close ×</button><div className="inquiry-intro"><p className="num">PRIVATE ORDER ENQUIRY</p><h2 id="inquiry-title">Bring a piece<br/>of <i>Kutch</i> home.</h2><p>No payment is collected here. Tell us what you love and Saavi will reply personally with availability, shipping, and the next steps.</p><a href="mailto:kutchiartbysaavi@gmail.com">kutchiartbysaavi@gmail.com</a></div><form className="inquiry-form" onSubmit={submitInquiry}><input type="hidden" name="_subject" value="New Saavi art enquiry"/><input type="hidden" name="_template" value="table"/><input className="honey" type="text" name="_honey" tabIndex={-1} autoComplete="off"/><label>Full name<input name="name" autoComplete="name" required/></label><label>Email address<input type="email" name="email" autoComplete="email" required/></label><label>Phone or WhatsApp <span>Optional</span><input name="phone" autoComplete="tel"/></label><label>City and country<input name="location" autoComplete="country-name" required/></label><label className="full">Piece(s) you are interested in<textarea name="pieces" rows={4} defaultValue={inquiryContext} placeholder="Tell us which artwork caught your eye" required/></label><label className="full">Anything else? <span>Optional</span><textarea name="message" rows={4} placeholder="Custom size, colours, gifting, shipping questions…"/></label><div className="form-finish"><p>Your details are used only to respond to this enquiry.</p><button type="submit" disabled={formStatus==='sending'}>{formStatus==='sending'?'Sending…':'Send enquiry →'}</button></div>{formStatus==='success'&&<p className="form-message success" role="status">Thank you. Your enquiry has been sent to Saavi.</p>}{formStatus==='error'&&<p className="form-message error" role="alert">The form could not send just now. Please email us directly using the address shown.</p>}</form></section></>}
 </main>
}
