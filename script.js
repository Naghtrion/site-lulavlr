(function(){
  // marcas do mostrador (24h)
  var g=document.querySelector('.dial-marcas');
  if(g){for(var i=0;i<24;i++){var a=i/24*2*Math.PI,r1=i%6?80:74,l=document.createElementNS('http://www.w3.org/2000/svg','line');
    l.setAttribute('x1',100+r1*Math.sin(a));l.setAttribute('y1',100-r1*Math.cos(a));l.setAttribute('x2',100+86*Math.sin(a));l.setAttribute('y2',100-86*Math.cos(a));g.appendChild(l);}}
  // hora de Brasília
  function horaBR(){
    var p=new Intl.DateTimeFormat('pt-BR',{timeZone:'America/Sao_Paulo',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
    var h=+p.find(function(x){return x.type==='hour'}).value%24,m=+p.find(function(x){return x.type==='minute'}).value;return h+m/60;
  }
  function atualiza(){
    var h=horaBR(),pt=document.getElementById('ponteiro'),st=document.getElementById('status-live');
    if(pt)pt.style.transform='rotate('+(h/24*360)+'deg)';
    if(!st)return;
    var hh=Math.floor(h),mm=String(Math.round((h-hh)*60)%60).padStart(2,'0');
    if(h>=8&&h<16){st.textContent='Agora são '+hh+'h'+mm+' em Brasília: pela agenda, é horário de live. Dá o play!';}
    else{var falta=h<8?8-h:32-h;st.textContent='Agora são '+hh+'h'+mm+' em Brasília. Próxima live pela agenda: às 8h (em ~'+Math.ceil(falta)+'h).';}
  }
  atualiza();setInterval(atualiza,60000);
  // copiar e-mail
  var b=document.getElementById('copiar');
  if(b)b.addEventListener('click',function(){
    var e=b.getAttribute('data-email');
    (navigator.clipboard?navigator.clipboard.writeText(e):Promise.reject()).then(function(){b.textContent='Copiado ✓';},function(){window.location.href='mailto:'+e;});
    setTimeout(function(){b.textContent='Copiar e-mail';},2500);
  });
})();
