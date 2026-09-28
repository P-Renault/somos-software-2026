const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
$('#year').textContent=new Date().getFullYear();

// Mobile navigation
const menu=$('#menuToggle'), nav=$('#mainNav');
menu.addEventListener('click',()=>{const open=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(open));});
$$('#mainNav a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}));

// Scroll progress + compact header
const progress=$('#scrollProgress'), header=$('#siteHeader');
addEventListener('scroll',()=>{const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${Math.min(100,scrollY/Math.max(max,1)*100)}%`;header.classList.toggle('scrolled',scrollY>20)},{passive:true});

// Reveal on scroll
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
$$('.reveal').forEach(el=>observer.observe(el));

function makeCarousel({root,track,items,dots,prev,next,visible=1,interval=5000}){
  let index=0,timer=null,startX=0;
  const getVisible=()=>typeof visible==='function'?visible():visible;
  function pageCount(){return Math.max(1,items.length-getVisible()+1)}
  function renderDots(){dots.innerHTML='';for(let i=0;i<pageCount();i++){const b=document.createElement('button');b.type='button';b.setAttribute('aria-label',`Ir a ${i+1}`);b.className=i===index?'active':'';b.onclick=()=>go(i,true);dots.appendChild(b)}}
  function go(i,manual=false){const max=pageCount()-1;index=Math.max(0,Math.min(i,max));const width=items[0].getBoundingClientRect().width;const gap=parseFloat(getComputedStyle(track).gap)||0;track.style.transform=`translate3d(${-index*(width+gap)}px,0,0)`;$$('button',dots).forEach((b,j)=>b.classList.toggle('active',j===index));if(manual)restart()}
  function restart(){if(timer)clearInterval(timer);if(interval>0)timer=setInterval(()=>go(index>=pageCount()-1?0:index+1),interval)}
  prev.addEventListener('click',()=>go(index-1,true));next.addEventListener('click',()=>go(index+1,true));
  root.addEventListener('mouseenter',()=>{if(timer)clearInterval(timer)});root.addEventListener('mouseleave',restart);root.addEventListener('touchstart',e=>{startX=e.touches[0].clientX},{passive:true});root.addEventListener('touchend',e=>{const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>45)go(index+(dx<0?1:-1),true)},{passive:true});
  addEventListener('resize',()=>{renderDots();go(index)});renderDots();go(0);restart();
}

// Main hero carousel: one slide at a time.
const heroSlides=$$('.hero-slide'), heroDots=$('#heroDots');
makeCarousel({root:$('#heroCarousel'),track:$('#heroTrack'),items:heroSlides,dots:heroDots,prev:$('.hero-prev'),next:$('.hero-next'),visible:1,interval:6000});
const heroObserver=new MutationObserver(()=>{}); // keeps carousel initialization isolated for static hosting

// Offer carousel: 3 desktop, 2 tablet, 1 mobile.
const offerCards=$$('.offer-card');
makeCarousel({root:$('#offerCarousel'),track:$('#offerTrack'),items:offerCards,dots:$('#offerDots'),prev:$('.offer-prev'),next:$('.offer-next'),visible:()=>innerWidth<=780?1:innerWidth<=1100?2:3,interval:6500});

// Product carousel.
const productSlides=$$('.product-track figure');
makeCarousel({root:$('#productCarousel'),track:$('#productTrack'),items:productSlides,dots:$('#productDots'),prev:$('.product-prev'),next:$('.product-next'),visible:1,interval:5500});

// WhatsApp configuration: replace with the future WOM number, country code included.
const WHATSAPP_NUMBER='';
const wa=$('#whatsappButton');
const defaultMessage='Hola, Somos Software. Me interesa conocer sus soluciones digitales.';
function whatsappUrl(message){return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`}
function configureWhatsApp(){if(WHATSAPP_NUMBER){wa.href=whatsappUrl(defaultMessage);wa.removeAttribute('aria-disabled');}else{wa.href='#contacto';wa.setAttribute('aria-disabled','true');}}
configureWhatsApp();
$$('[data-offer]').forEach(btn=>btn.addEventListener('click',e=>{if(!WHATSAPP_NUMBER){e.preventDefault();$('#contacto').scrollIntoView({behavior:'smooth'});return}wa.href=whatsappUrl(`Hola, Somos Software. Me interesa la oferta ${btn.dataset.offer}.`)}));
