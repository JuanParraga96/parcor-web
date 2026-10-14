/* =====================================================================
   PARCOR DISTRIBUCIONES — app.js
   Router por hash, catálogo, ficha de producto, carrito → WhatsApp,
   test del colchón ideal y modo revisión.
   No necesitas editar este archivo para cambiar precios: usa catalogo.js
   ===================================================================== */
(function () {
  'use strict';

  /* ---------------- utilidades ---------------- */
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));
  const fmt = n => '$' + Math.round(n).toLocaleString('es-CO');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]));
  const byId = id => PRODUCTOS.find(p => p.id === id);
  const catById = id => CATEGORIAS.find(c => c.id === id);
  const isColchon = p => p.cat === 'enrollados' || p.cat === 'extendidos';
  const tallaLabel = t => (TALLAS[t] ? `${TALLAS[t]} (${t.replace('x', '×')})` : t.replace('x', '×'));

  const PLACEHOLDER = (txt) => `<div class="placeholder"><div><svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="20" width="36" height="14" rx="3"/><path d="M10 20v-6a3 3 0 0 1 3-3h22a3 3 0 0 1 3 3v6M8 34v4M40 34v4"/></svg><div>${esc(txt || 'Foto en camino')}</div></div></div>`;

  const waLink = (msg) => `https://wa.me/${CONFIG.WHATSAPP}?text=${encodeURIComponent(msg)}`;

  /* precios */
  function alturasDe(p) { return p.alturas || [{ altura: p.altura, precios: p.precios }]; }
  function precioDesde(p) {
    let min = Infinity;
    if (isColchon(p)) alturasDe(p).filter(a => a.altura >= 25).forEach(a => Object.values(a.precios).forEach(v => { if (v < min) min = v; }));
    else if (p.variantes) p.variantes.forEach(v => { if (v.precio && v.precio < min) min = v.precio; });
    else if (p.precio) min = p.precio;
    return min === Infinity ? null : min;
  }
  function precioTalla(p, altura, talla) {
    const a = alturasDe(p).find(x => x.altura === altura) || alturasDe(p)[0];
    return a && a.precios[talla] != null ? a.precios[talla] : null;
  }
  const tienePendiente = (p, k) => (p.pendientes || []).includes(k);

  /* descuento visible: precio de lista = real ÷ (1 − pct) */
  const DESC = Number(CONFIG.DESCUENTO_PCT) || 0;
  const lista = x => DESC ? Math.round(x / (1 - DESC / 100) / 100) * 100 : null;
  const offTag = () => DESC ? `<span class="off">-${DESC}%</span>` : '';
  const wasHtml = x => DESC ? `<s class="was">${fmt(lista(x))}</s>` : '';

  /* ---------------- toast ---------------- */
  let toastT;
  function toast(msg) {
    const t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('show'), 2200);
  }

  /* =====================================================================
     CARRITO
     ===================================================================== */
  const Cart = {
    key: 'parcor_pedido',
    items: [],
    load() { try { this.items = JSON.parse(localStorage.getItem(this.key) || '[]'); } catch (e) { this.items = []; } },
    save() { try { localStorage.setItem(this.key, JSON.stringify(this.items)); } catch (e) { /* modo privado */ } this.renderBadge(); },
    add(item) {
      const ex = this.items.find(i => i.key === item.key);
      if (ex) ex.qty += item.qty; else this.items.push(item);
      this.save(); this.render();
    },
    setQty(key, qty) {
      const it = this.items.find(i => i.key === key); if (!it) return;
      it.qty = Math.max(0, qty);
      if (it.qty === 0) this.items = this.items.filter(i => i.key !== key);
      this.save(); this.render();
    },
    remove(key) { this.items = this.items.filter(i => i.key !== key); this.save(); this.render(); },
    clear() { this.items = []; this.save(); this.render(); },
    total() { return this.items.reduce((s, i) => s + i.precio * i.qty, 0); },
    count() { return this.items.reduce((s, i) => s + i.qty, 0); },
    renderBadge() {
      const n = this.count(); const b = $('#cart-count');
      b.textContent = n; b.hidden = n === 0;
    },
    open() {
      $('#cart-drawer').classList.add('open'); $('#cart-drawer').setAttribute('aria-hidden', 'false');
      $('#cart-overlay').hidden = false; document.body.style.overflow = 'hidden'; this.render();
    },
    close() {
      $('#cart-drawer').classList.remove('open'); $('#cart-drawer').setAttribute('aria-hidden', 'true');
      $('#cart-overlay').hidden = true; document.body.style.overflow = '';
    },
    mensaje(nombre, ciudad) {
      const lines = this.items.map((i, n) => `${n + 1}. ${i.nombre}${i.variante ? ' · ' + i.variante : ''} × ${i.qty} — ${fmt(i.precio * i.qty)}${i.sku ? ' (' + i.sku + ')' : ''}`);
      return `Hola Parcor 👋 Quiero hacer este pedido:\n\n${lines.join('\n')}\n\nTotal de referencia: ${fmt(this.total())} (IVA incluido)\n\nNombre: ${nombre || '—'}\nCiudad: ${ciudad || '—'}\n\n¿Me confirman disponibilidad y costo de envío?`;
    },
    render() {
      const body = $('#cart-body'), foot = $('#cart-foot');
      if (!this.items.length) {
        body.innerHTML = `<div class="cart-empty"><p>Tu pedido está vacío.</p><p>Elige un colchón con el test o explora el catálogo.</p><button class="btn btn-ghost" data-test-start="">Hacer el test</button></div>`;
        foot.innerHTML = '';
        return;
      }
      body.innerHTML = this.items.map(i => `
        <div class="citem" data-key="${esc(i.key)}">
          ${i.img ? `<img src="${esc(i.img)}" alt="">` : '<div class="ph"></div>'}
          <div>
            <h4>${esc(i.nombre)}</h4>
            <div class="cvar">${esc(i.variante || '')}</div>
            <div class="cctl">
              <button data-act="minus" aria-label="Quitar uno">−</button>
              <span>${i.qty}</span>
              <button data-act="plus" aria-label="Agregar uno">+</button>
            </div>
            <button class="rm" data-act="remove">Quitar</button>
          </div>
          <div class="cprice">${fmt(i.precio * i.qty)}</div>
        </div>`).join('');
      const saved = JSON.parse(localStorage.getItem('parcor_cliente') || '{}');
      const ahorro = DESC ? this.items.reduce((s, i) => s + (lista(i.precio) - i.precio) * i.qty, 0) : 0;
      foot.innerHTML = `
        ${ahorro ? `<div class="totals-save"><span>Precio de lista</span><s>${fmt(this.total() + ahorro)}</s></div><div class="totals-save"><span>Descuento ${DESC}%</span><b>−${fmt(ahorro)}</b></div>` : ''}
        <div class="totals"><span>Total de referencia</span><b>${fmt(this.total())}</b></div>
        <div class="totals-note">IVA incluido. El envío se confirma por WhatsApp según tu ciudad.</div>
        <div class="field-row">
          <div class="field"><label for="c-nombre">Tu nombre</label><input id="c-nombre" value="${esc(saved.nombre || '')}" placeholder="Nombre" autocomplete="name"></div>
          <div class="field"><label for="c-ciudad">Ciudad</label><input id="c-ciudad" value="${esc(saved.ciudad || '')}" placeholder="Ciudad de entrega" autocomplete="address-level2"></div>
        </div>
        <a class="btn btn-wa btn-block btn-lg" id="cart-send" href="#" target="_blank" rel="noopener">
          <svg class="ico" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.6.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4 5.3 5.3 0 0 0 3.2.7 2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z"/></svg>
          Finalizar pedido por WhatsApp
        </a>
        <button class="link-quiet" id="cart-clear" style="background:none;border:0;margin-top:12px">Vaciar pedido</button>`;
      const upd = () => {
        const nombre = $('#c-nombre').value.trim(), ciudad = $('#c-ciudad').value.trim();
        try { localStorage.setItem('parcor_cliente', JSON.stringify({ nombre, ciudad })); } catch (e) { }
        $('#cart-send').href = waLink(this.mensaje(nombre, ciudad));
      };
      upd();
      $('#c-nombre').addEventListener('input', upd);
      $('#c-ciudad').addEventListener('input', upd);
      $('#cart-clear').addEventListener('click', () => { if (confirm('¿Vaciar el pedido?')) this.clear(); });
    }
  };

  $('#cart-body').addEventListener('click', e => {
    const b = e.target.closest('button[data-act]'); if (!b) return;
    const key = b.closest('.citem').dataset.key; const it = Cart.items.find(i => i.key === key);
    if (b.dataset.act === 'plus') Cart.setQty(key, it.qty + 1);
    if (b.dataset.act === 'minus') Cart.setQty(key, it.qty - 1);
    if (b.dataset.act === 'remove') Cart.remove(key);
  });
  $('#cart-btn').addEventListener('click', () => Cart.open());
  $('#cart-close').addEventListener('click', () => Cart.close());
  $('#cart-overlay').addEventListener('click', () => Cart.close());

  /* =====================================================================
     INICIO: categorías, comparador, FAQ, contacto, videos
     ===================================================================== */
  function renderHome() {
    $('#cat-grid').innerHTML = CATEGORIAS.map(c => {
      const prods = PRODUCTOS.filter(p => p.cat === c.id);
      const soon = !prods.some(p => precioDesde(p));
      const rev = CONFIG.MODO_REVISION && soon ? `<span class="badge-rev">Sin productos con precio</span>` : '';
      return `<a href="#/catalogo/${c.id}" class="cat-card ${soon ? 'soon' : ''}">
        ${c.img ? `<img src="${c.img}" alt="" loading="lazy">` : ''}${rev}
        <div class="cat-txt"><h3>${esc(c.nombre)}</h3><span>${soon ? 'Muy pronto · consúltanos por WhatsApp' : esc(c.sub)}</span></div></a>`;
    }).join('');

    $('#footer-cats').innerHTML = CATEGORIAS.map(c => `<li><a href="#/catalogo/${c.id}">${esc(c.nombre)}</a></li>`).join('');

    /* comparador: dos tablas, extendidos primero */
    const tabla = (linea, titulo, sub) => {
      const rows = PRODUCTOS.filter(p => isColchon(p) && p.linea === linea).sort((a, b) => precioDesde(a) - precioDesde(b)).map(p => `
      <tr>
        <td class="name">${esc(p.nombre)}<small>${esc(p.marca)}</small></td>
        <td>${alturasDe(p).map(a => a.altura).filter(a => a >= 25).join(' / ')} cm</td>
        <td>${esc(p.nucleo)}</td>
        <td><span class="firm" title="${esc(p.sensacion)}">${[1, 2, 3, 4, 5].map(n => `<i class="${n <= p.firmeza ? 'on' : ''}"></i>`).join('')}</span> <small style="color:var(--muted)">${esc(p.sensacion)}</small></td>
        <td>${p.aisla ? 'Sí' : 'Parcial'}</td>
        <td class="price">${wasHtml(precioDesde(p))}${fmt(precioDesde(p))}</td>
        <td><a href="#/p/${p.id}">Ver</a></td>
      </tr>`).join('');
      return `<thead><tr><th colspan="7" class="group"><span class="tag ${linea === 'enrollado' ? 'tag-roll' : ''}">${titulo}</span> <span class="group-sub">${sub}</span></th></tr>
        <tr><th>Colchón</th><th>Altura</th><th>Núcleo</th><th>Firmeza</th><th>Independencia de movimiento</th><th>Desde (sencillo)</th><th></th></tr></thead><tbody>${rows}</tbody>`;
    };
    $('#compare-table').innerHTML = tabla('extendido', 'Extendidos', 'Casa Di Luna · llegan listos para usar');
    $('#compare-table-2').innerHTML = tabla('enrollado', 'Enrollados', 'Azame · llegan comprimidos en caja a cualquier ciudad');

    /* anuncio */
    const an = $('#announce'); if (CONFIG.ANUNCIO) { an.textContent = CONFIG.ANUNCIO; an.hidden = false; }


    /* FAQ pagos */
    $('#faq-pagos').textContent = `Aceptamos ${CONFIG.FORMAS_PAGO.slice(0, -1).join(', ').toLowerCase()} y ${CONFIG.FORMAS_PAGO.slice(-1)[0].toLowerCase()}. Te enviamos los datos por WhatsApp una vez confirmado el pedido.`;

    /* contacto */
    const hola = waLink('Hola Parcor 👋 Quiero asesoría para elegir un colchón.');
    ['#header-wa', '#footer-wa', '#wa-float'].forEach(s => { $(s).href = hola; });
    $('#footer-mail').href = 'mailto:' + CONFIG.EMAIL; $('#footer-mail').textContent = CONFIG.EMAIL;
    $('#year').textContent = new Date().getFullYear();
    const nets = { instagram: 'IG', tiktok: 'TT', facebook: 'FB', linkedin: 'IN' };
    const names = { instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook', linkedin: 'LinkedIn' };
    $('#social').innerHTML = Object.keys(nets).map(k => CONFIG.REDES[k]
      ? `<a href="${esc(CONFIG.REDES[k])}" target="_blank" rel="noopener" aria-label="${names[k]}">${nets[k]}</a>`
      : (CONFIG.MODO_REVISION ? `<a href="#" aria-label="${names[k]} (pendiente)" title="Falta el link de ${names[k]} en catalogo.js" style="opacity:.35">${nets[k]}</a>` : '')).join('');

    /* videos: toca para reproducir */
    $$('.clip').forEach(f => {
      const v = $('video', f);
      f.addEventListener('click', () => {
        if (v.paused) { $$('.clip video').forEach(o => { if (o !== v) { o.pause(); o.closest('.clip').classList.remove('playing'); } }); v.play(); f.classList.add('playing'); }
        else { v.pause(); f.classList.remove('playing'); }
      });
    });
  }

  /* =====================================================================
     MODO REVISIÓN
     ===================================================================== */
  function renderRevision() {
    const box = $('#revision');
    if (!CONFIG.MODO_REVISION) { box.hidden = true; return; }
    const labels = { foto: 'foto real', precio: 'precio', medidas: 'medidas/tallas' };
    const items = PRODUCTOS.filter(p => (p.pendientes && p.pendientes.length) || p.notaPendiente).map(p =>
      `<li><a href="#/p/${p.id}">${esc(p.nombre)}</a>: ${(p.pendientes || []).map(k => labels[k]).join(', ')}${p.notaPendiente ? ' — ' + esc(p.notaPendiente) : ''}</li>`);
    const redes = Object.keys(CONFIG.REDES).filter(k => !CONFIG.REDES[k]);
    if (redes.length) items.push(`<li>Links de redes sociales: ${redes.join(', ')}</li>`);
    box.hidden = false;
    box.innerHTML = `<div class="wrap"><strong>Modo revisión</strong><span>${items.length} pendientes. Las etiquetas ámbar no se verán cuando pongas <code>MODO_REVISION: false</code> en <code>js/catalogo.js</code>.</span>
      <details><summary>Ver lista de pendientes</summary><ul>${items.join('')}</ul></details></div>`;
  }
  function badges(p) {
    if (!CONFIG.MODO_REVISION || !p.pendientes || !p.pendientes.length) return '';
    const labels = { foto: 'Falta foto real', precio: 'Precio por confirmar', medidas: 'Faltan medidas' };
    return `<div class="badges">${p.pendientes.map(k => `<span class="badge-rev">${labels[k]}</span>`).join('')}</div>`;
  }

  /* =====================================================================
     CATÁLOGO
     ===================================================================== */
  const filtroState = { linea: 'todos', firmeza: 'todas' };
  function renderCatalogo(catId) {
    const cat = catById(catId) || CATEGORIAS[0];
    $('#cat-crumb').textContent = cat.nombre;
    $('#cat-title').textContent = cat.nombre;
    $('#cat-sub').textContent = cat.sub;
    $('#cat-tabs').innerHTML = CATEGORIAS.map(c => `<a href="#/catalogo/${c.id}" class="${c.id === cat.id ? 'active' : ''}">${esc(c.nombre)}</a>`).join('');

    const esCol = cat.id === 'enrollados' || cat.id === 'extendidos';
    const f = $('#filters');
    if (esCol) {
      f.innerHTML = `<span class="flabel">Firmeza</span>
        ${[['todas', 'Todas'], ['suave', 'Suave'], ['media', 'Media'], ['firme', 'Firme']].map(([k, l]) => `<button data-f="firmeza" data-v="${k}" class="${filtroState.firmeza === k ? 'active' : ''}">${l}</button>`).join('')}`;
      f.hidden = false;
    } else { f.hidden = true; f.innerHTML = ''; }

    let prods = PRODUCTOS.filter(p => p.cat === cat.id);
    if (esCol && filtroState.firmeza !== 'todas') {
      prods = prods.filter(p => filtroState.firmeza === 'suave' ? p.firmeza <= 2 : filtroState.firmeza === 'media' ? p.firmeza === 3 : p.firmeza >= 4);
    }
    const grid = $('#product-grid');
    if (!prods.length) {
      grid.innerHTML = `<div class="empty"><p>Todavía no hay productos con precio en esta categoría.</p><a class="btn btn-wa" href="${waLink('Hola Parcor 👋 Quiero información sobre ' + cat.nombre.toLowerCase() + '.')}" target="_blank" rel="noopener">Preguntar por WhatsApp</a></div>`;
      return;
    }
    grid.innerHTML = prods.map(p => {
      const desde = precioDesde(p);
      const meta = isColchon(p) ? `${esc(p.marca)} · ${alturasDe(p).map(a => a.altura).filter(a => a >= 25).join('/')} cm · ${esc(p.sensacion)}` : (p.variantes ? `${p.variantes.length} opciones` : (p.sku || ''));
      return `<a class="pcard" href="#/p/${p.id}">
        ${badges(p)}${desde ? offTag() : ''}
        <div class="pimg">${p.img && p.img[0] ? `<img src="${p.img[0]}" alt="${esc(p.nombre)}" loading="lazy">` : PLACEHOLDER()}</div>
        <div class="pbody">
          <div class="pmeta">${meta}</div>
          <h3>${esc(p.nombre)}</h3>
          <p class="pdesc">${esc(p.desc)}</p>
          <div class="pprice">${desde ? `<span>${wasHtml(desde)}<b>${fmt(desde)}</b></span><small>${isColchon(p) || p.variantes ? 'desde' : 'IVA incluido'}</small>` : `<small>Consultar precio</small>`}</div>
        </div></a>`;
    }).join('');
  }
  $('#filters').addEventListener('click', e => {
    const b = e.target.closest('button[data-f]'); if (!b) return;
    filtroState[b.dataset.f] = b.dataset.v; renderCatalogo(currentCat);
  });

  /* =====================================================================
     FICHA DE PRODUCTO
     ===================================================================== */
  const sel = { altura: null, talla: null, variante: 0, qty: 1, img: 0 };
  function renderProducto(id) {
    const p = byId(id);
    const wrap = $('#producto-wrap');
    if (!p) { wrap.innerHTML = `<div class="empty"><p>No encontramos ese producto.</p><a class="btn btn-ghost" href="#/catalogo/enrollados">Ir al catálogo</a></div>`; return; }
    const cat = catById(p.cat);
    const col = isColchon(p);
    const alts = col ? alturasDe(p) : null;
    if (col) {
      if (!alts.some(a => a.altura === sel.altura)) sel.altura = alts[0].altura;
      const tallas = Object.keys((alts.find(a => a.altura === sel.altura) || alts[0]).precios);
      if (!tallas.includes(sel.talla)) sel.talla = tallas.includes('140x190') ? '140x190' : tallas[0];
    }
    if (p.variantes && sel.variante >= p.variantes.length) sel.variante = 0;
    if (sel.img >= (p.img || []).length) sel.img = 0;

    /* precio actual */
    let precio = null, variante = '', sku = p.sku || '';
    if (col) { precio = precioTalla(p, sel.altura, sel.talla); variante = `${sel.altura} cm · ${tallaLabel(sel.talla)}`; }
    else if (p.variantes) { const v = p.variantes[sel.variante]; precio = v.precio; variante = v.nombre; sku = v.sku || ''; }
    else precio = p.precio;

    const specs = col ? `<div class="specs">
        <div><small>Altura</small><b>${alts.map(a => a.altura).filter(a => a >= 25).join(' / ')} cm</b></div>
        <div><small>Núcleo</small><b>${esc(p.nucleo)}</b></div>
        <div><small>Sensación</small><b>${esc(p.sensacion)}</b></div>
        <div><small>Entrega</small><b>${p.linea === 'enrollado' ? 'Enrollado en caja' : 'Extendido'}</b></div>
        <div><small>Soporta</small><b>Hasta ${p.soporte} kg por persona</b></div>
        <div><small>Garantía</small><b>${CONFIG.GARANTIA_COLCHONES}</b></div>
      </div>` : '';

    const opciones = col ? `
      ${alts.length > 1 ? `<div class="opt"><div class="opt-label">Altura</div><div class="chips">${alts.map(a => `<button class="chip ${a.altura === sel.altura ? 'selected' : ''}" data-opt="altura" data-v="${a.altura}">${a.altura} cm${a.nota ? `<small>${esc(a.nota)}</small>` : ''}</button>`).join('')}</div></div>` : ''}
      <div class="opt"><div class="opt-label">Talla <span>${tallaLabel(sel.talla)}</span></div><div class="chips">${Object.keys((alts.find(a => a.altura === sel.altura) || alts[0]).precios).map(t => `<button class="chip ${t === sel.talla ? 'selected' : ''}" data-opt="talla" data-v="${t}">${TALLAS[t] || t}<small>${t.replace('x', '×')}</small></button>`).join('')}</div></div>`
      : (p.variantes ? `<div class="opt"><div class="opt-label">Opción</div><div class="chips">${p.variantes.map((v, i) => `<button class="chip ${i === sel.variante ? 'selected' : ''}" data-opt="variante" data-v="${i}">${esc(v.nombre)}</button>`).join('')}</div></div>` : '');

    const canBuy = precio != null;
    const cta = canBuy ? `
      <div class="price-box"><div>${wasHtml(precio)}<div class="big">${fmt(precio)}${offTag()}</div><small>IVA incluido · ${esc(variante || 'precio unitario')}</small></div>
        <div class="qty"><button data-q="-1" aria-label="Menos">−</button><input id="qty" type="number" min="1" value="${sel.qty}" aria-label="Cantidad"><button data-q="1" aria-label="Más">+</button></div></div>
      <div class="cta-row">
        <button class="btn btn-primary btn-lg" id="add-cart">Agregar al pedido</button>
        <a class="btn btn-wa btn-lg" id="buy-wa" href="${waLink(`Hola Parcor 👋 Quiero comprar: ${p.nombre}${variante ? ' · ' + variante : ''} × ${sel.qty} — ${fmt(precio * sel.qty)}. ¿Me confirman disponibilidad y envío?`)}" target="_blank" rel="noopener">Comprar por WhatsApp</a>
      </div>` : `
      <div class="price-box"><div><div class="big" style="font-size:1.3rem">Precio a consultar</div><small>Te lo confirmamos en minutos por WhatsApp</small></div></div>
      <div class="cta-row"><a class="btn btn-wa btn-lg" href="${waLink(`Hola Parcor 👋 Quiero saber el precio y disponibilidad de: ${p.nombre}.`)}" target="_blank" rel="noopener">Consultar por WhatsApp</a></div>`;

    const pend = CONFIG.MODO_REVISION && (p.notaPendiente || (p.pendientes && p.pendientes.length)) ? `<div class="pending-note"><b>Pendiente:</b> ${(p.pendientes || []).map(k => ({ foto: 'foto real', precio: 'precio', medidas: 'medidas' })[k]).join(', ')}${p.notaPendiente ? ' — ' + esc(p.notaPendiente) : ''}</div>` : '';

    const related = PRODUCTOS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 3);

    wrap.innerHTML = `
      <nav class="crumbs" aria-label="Ruta"><a href="#/">Inicio</a><span>/</span><a href="#/catalogo/${cat.id}">${esc(cat.nombre)}</a><span>/</span><span>${esc(p.nombre)}</span></nav>
      <div class="prod">
        <div class="gallery">
          <div class="main">${p.img && p.img.length ? `<img src="${p.img[sel.img]}" alt="${esc(p.nombre)}" id="main-img">` : PLACEHOLDER('Foto en camino')}</div>
          ${p.img && p.img.length > 1 ? `<div class="thumbs">${p.img.map((s, i) => `<button class="${i === sel.img ? 'active' : ''}" data-img="${i}" aria-label="Foto ${i + 1}"><img src="${s}" alt="" loading="lazy"></button>`).join('')}</div>` : ''}
        </div>
        <div class="pinfo">
          <div class="pmeta">${col ? `<span class="tag ${p.linea === 'enrollado' ? 'tag-roll' : ''}">${p.linea === 'enrollado' ? 'Enrollado' : 'Extendido'}</span><span>${esc(p.marca)}</span>` : `<span>${esc(cat.nombre)}</span>${sku ? `<span>· ${esc(sku)}</span>` : ''}`}</div>
          <h1>${esc(p.nombreLargo || p.nombre)}</h1>
          <p class="pdesc">${esc(p.desc)}</p>
          ${pend}
          ${specs}
          ${opciones}
          ${cta}
          ${col && p.capas ? `<div class="capas"><h3>Qué hay adentro</h3><ol>${p.capas.map(c => `<li>${esc(c)}</li>`).join('')}</ol></div>` : ''}
          ${col ? `<p style="margin-top:22px;color:var(--muted);font-size:.9rem">${p.linea === 'enrollado' ? 'Llega comprimido al vacío en caja. Al abrirlo recupera su altura en 24 a 48 horas.' : 'Llega extendido, listo para usar el mismo día.'} ${p.dobleCara ? 'Doble cara: puedes voltearlo para que dure más.' : ''}</p>` : ''}
        </div>
      </div>
      ${related.length ? `<div class="related"><h2>También en ${esc(cat.nombre.toLowerCase())}</h2><div class="product-grid">${related.map(r => `<a class="pcard" href="#/p/${r.id}">${badges(r)}<div class="pimg">${r.img && r.img[0] ? `<img src="${r.img[0]}" alt="" loading="lazy">` : PLACEHOLDER()}</div><div class="pbody"><h3>${esc(r.nombre)}</h3><div class="pprice">${precioDesde(r) ? `<span>${wasHtml(precioDesde(r))}<b>${fmt(precioDesde(r))}</b></span><small>desde</small>` : '<small>Consultar precio</small>'}</div></div></a>`).join('')}</div></div>` : ''}`;

    /* interacciones */
    $$('[data-opt]', wrap).forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.opt, v = b.dataset.v;
      if (k === 'altura') sel.altura = Number(v); else if (k === 'talla') sel.talla = v; else sel.variante = Number(v);
      renderProducto(id);
    }));
    $$('[data-img]', wrap).forEach(b => b.addEventListener('click', () => { sel.img = Number(b.dataset.img); $('#main-img').src = p.img[sel.img]; $$('[data-img]', wrap).forEach(x => x.classList.toggle('active', x === b)); }));
    $$('[data-q]', wrap).forEach(b => b.addEventListener('click', () => { sel.qty = Math.max(1, sel.qty + Number(b.dataset.q)); renderProducto(id); }));
    const qi = $('#qty', wrap); if (qi) qi.addEventListener('change', () => { sel.qty = Math.max(1, parseInt(qi.value) || 1); renderProducto(id); });
    const add = $('#add-cart', wrap);
    if (add) add.addEventListener('click', () => {
      Cart.add({ key: `${p.id}|${col ? sel.altura + '|' + sel.talla : sel.variante}`, id: p.id, nombre: p.nombre + (col ? ` ${sel.altura} cm` : ''), variante: col ? tallaLabel(sel.talla) : variante, precio, qty: sel.qty, img: p.img && p.img[0] || '', sku });
      toast('Agregado al pedido'); Cart.open();
    });
  }

  /* =====================================================================
     TEST DEL COLCHÓN IDEAL
     ===================================================================== */
  const PREG = [
    { id: 'quien', t: '¿Para quién es el colchón?', h: 'Nos ayuda con la talla y el presupuesto.', o: [['yo', 'Para mí'], ['pareja', 'Para mi pareja y yo'], ['nino', 'Para un niño o adolescente'], ['invitados', 'Cuarto de invitados o alquiler']] },
    { id: 'posicion', t: '¿Cómo duermes la mayor parte de la noche?', h: 'La posición define cuánta firmeza necesitas.', o: [['lado', 'De lado'], ['espalda', 'Boca arriba'], ['abajo', 'Boca abajo'], ['mixto', 'Cambio mucho']] },
    { id: 'sensacion', t: '¿Qué sensación te gusta al acostarte?', h: 'Piensa en el mejor colchón donde hayas dormido.', o: [['nube', 'Que me reciba suave, como una nube'], ['equilibrio', 'Ni muy suave ni muy duro'], ['firme', 'Firme, que me sostenga'], ['nose', 'No sé, sorpréndeme']] },
    { id: 'peso', t: '¿Cuánto pesa la persona que más pesa?', h: 'A mayor peso, más altura y soporte necesitas.', o: [['bajo', 'Menos de 80 kg'], ['medio', 'Entre 80 y 100 kg'], ['alto', 'Más de 100 kg']] },
    { id: 'ciudad', t: '¿Dónde lo recibes?', h: 'Define si te conviene enrollado o extendido.', o: [['bq', 'Barranquilla o área metropolitana'], ['otra', 'Otra ciudad de Colombia']] }
  ];
  const Test = {
    r: {}, step: 0, skip: [],
    open(preset) {
      this.r = {}; this.step = 0; this.skip = [];
      if (preset) { this.r.posicion = preset; this.skip = ['posicion']; }
      $('#test-modal').classList.add('open'); $('#test-modal').setAttribute('aria-hidden', 'false');
      $('#test-overlay').hidden = false; document.body.style.overflow = 'hidden';
      this.render();
    },
    close() { $('#test-modal').classList.remove('open'); $('#test-modal').setAttribute('aria-hidden', 'true'); $('#test-overlay').hidden = true; document.body.style.overflow = ''; },
    render() {
      const body = $('#test-body');
      while (this.step < PREG.length && this.skip.includes(PREG[this.step].id)) this.step++;
      if (this.step >= PREG.length) { this.results(); return; }
      const q = PREG[this.step];
      const first = PREG.findIndex(x => !this.skip.includes(x.id)) === this.step;
      body.innerHTML = `<div class="progress">${PREG.map((x, i) => this.skip.includes(x.id) ? '' : `<i class="${i <= this.step ? 'done' : ''}"></i>`).join('')}</div>
        <div class="q"><h3>${q.t}</h3><p class="qhelp">${q.h}</p>
        <div class="chips">${q.o.map(([v, l]) => `<button class="chip ${this.r[q.id] === v ? 'selected' : ''}" data-v="${v}">${l}</button>`).join('')}</div></div>
        <div class="qnav"><button class="btn btn-ghost" id="t-back" ${first ? 'disabled style="visibility:hidden"' : ''}>Atrás</button><span style="align-self:center;color:var(--muted);font-size:.85rem">${PREG.slice(0, this.step + 1).filter(x => !this.skip.includes(x.id)).length} de ${PREG.length - this.skip.length}</span></div>`;
      $$('.chip', body).forEach(b => b.addEventListener('click', () => { this.r[q.id] = b.dataset.v; this.step++; this.render(); }));
      const back = $('#t-back', body); if (back) back.addEventListener('click', () => { this.step--; while (this.step > 0 && this.skip.includes(PREG[this.step].id)) this.step--; this.render(); });
    },
    score(p) {
      const r = this.r; let s = 0; const why = [];
      const POS = { lado: 'de lado', espalda: 'boca arriba', abajo: 'boca abajo', mixto: 'cambiando de postura' }[r.posicion] || '';
      let target = { lado: 2.5, espalda: 3.5, abajo: 4.5, mixto: 3 }[r.posicion] || 3;
      target += { nube: -1, equilibrio: 0, firme: 1.2, nose: 0 }[r.sensacion] || 0;
      target = Math.max(1, Math.min(5, target));
      const dist = Math.abs(p.firmeza - target);
      s += 10 - dist * 3;
      const sens = p.sensacion.toLowerCase();
      /* 1. firmeza: siempre explicamos la relación con lo que pidió */
      if (dist <= 0.75) why.push(`Firmeza ${sens} (${p.firmeza}/5): es justo lo que pediste para dormir ${POS}`);
      else if (p.firmeza > target) why.push(`Firmeza ${sens} (${p.firmeza}/5): algo más firme de lo que pediste; buena opción si prefieres más soporte durmiendo ${POS}`);
      else why.push(`Firmeza ${sens} (${p.firmeza}/5): algo más suave de lo que pediste; buena opción si prefieres hundirte un poco más`);
      /* 2. núcleo y pareja */
      if (r.quien === 'pareja') { if (p.aisla) { s += 2.5; why.push(`${p.nucleo}: no sientes cuando tu pareja se mueve`); } else { s -= 1.5; why.push(`${p.nucleo}: transmite algo de movimiento entre los dos`); } }
      else why.push(p.nucleo + (p.dobleCara ? ', doble cara para voltearlo' : ''));
      /* 3. peso y altura */
      const altura = Math.max(...alturasDe(p).map(a => a.altura));
      if (r.peso === 'alto') { if (p.firmeza >= 4 || altura >= 32) { s += 2; why.push(`${altura} cm de altura y soporte hasta ${p.soporte} kg por persona: aguanta más de 100 kg sin deformarse`); } else { why.push(`Soporta hasta ${p.soporte} kg por persona; para más de 100 kg conviene un modelo más alto o más firme`); } if (p.soporte < 100) s -= 2.5; }
      else if (r.peso === 'medio') { if (altura >= 30) { s += 1; why.push(`${altura} cm de altura, adecuado para 80–100 kg`); } else why.push(`${altura} cm de altura, suficiente para menos de 100 kg`); }
      else why.push(`${altura} cm de altura, más que suficiente para menos de 80 kg`);
      /* 4. precio según uso */
      const d = precioDesde(p);
      if (r.quien === 'nino' || r.quien === 'invitados') { if (d < 600000) { s += 2; why.push(`Desde ${fmt(d)}: precio justo para ${r.quien === 'nino' ? 'un cuarto infantil' : 'un cuarto de invitados'}`); } if (altura <= 27) s += 1; if (d > 900000) s -= 2; }
      /* 5. entrega */
      if (r.ciudad === 'otra') { if (p.linea === 'enrollado') { s += 2.5; why.push('Llega enrollado en caja por transportadora a tu ciudad'); } else { s -= 1.5; why.push('Es extendido: el envío fuera de Barranquilla cuesta más'); } }
      if (r.ciudad === 'bq') { if (p.linea === 'extendido') { s += .7; why.push('Te lo entregamos extendido en Barranquilla, listo para usar el mismo día'); } else why.push('Enrollado: lo entregamos en Barranquilla y lo abres en casa'); }
      if (p.fresco) { s += .5; }
      if (r.sensacion === 'nube' && /pillow/i.test(p.nucleo)) { s += 1; why.push('Pillow top que te recibe suave, como pediste'); }
      if (r.sensacion === 'firme' && /espuma|foam|D80/i.test(p.nucleo)) { s += .8; }
      return { s, why };
    },
    resumen() {
      const r = this.r;
      return PREG.filter(q => r[q.id]).map(q => (q.o.find(o => o[0] === r[q.id]) || [])[1]).filter(Boolean);
    },
    results() {
      const r = this.r;
      const ranked = PRODUCTOS.filter(isColchon).map(p => Object.assign({ p }, this.score(p))).sort((a, b) => b.s - a.s).slice(0, 3);
      const talla = r.quien === 'pareja' ? '140x190' : r.quien === 'invitados' ? '140x190' : '100x190';
      const body = $('#test-body');
      const resumen = this.resumen();
      body.innerHTML = `<div class="result-intro"><h3>${r.quien === 'pareja' ? 'Estas tres opciones les sirven a los dos.' : 'Tres colchones que coinciden contigo.'}</h3><p>Ordenados de mayor a menor coincidencia. Precio en talla ${TALLAS[talla].toLowerCase()}; puedes cambiarla en la ficha.</p></div>
        <div class="answers">${resumen.map(a => `<span>${esc(a)}</span>`).join('')}<button id="t-edit">Cambiar respuestas</button></div>
        ${ranked.map((x, i) => {
          const p = x.p; const alt = alturasDe(p)[0]; const precio = alt.precios[talla] != null ? alt.precios[talla] : precioDesde(p);
          return `<div class="rcard">
            ${p.img && p.img[0] ? `<img src="${p.img[0]}" alt="">` : '<div class="ph"></div>'}
            <div><div class="rrank">${['Mejor coincidencia', 'Segunda opción', 'También te sirve'][i]}</div>
              <h4>${esc(p.nombre)} <span style="font-size:.85rem;color:var(--muted)">${alt.altura} cm · ${esc(p.marca)}</span></h4>
              <ul class="rwhy-list">${x.why.slice(0, 4).map(w => `<li>${esc(w)}</li>`).join('')}</ul>
              <div class="ract"><span class="rprice">${wasHtml(precio)}${fmt(precio)}</span><span class="rsize">${tallaLabel(talla)}</span><a class="btn btn-ghost btn-sm" href="#/p/${p.id}">Ver ficha</a><button class="btn btn-primary btn-sm" data-add="${p.id}" data-altura="${alt.altura}" data-talla="${talla}" data-precio="${precio}">Agregar al pedido</button></div>
            </div></div>`; }).join('')}
        <div class="qnav"><button class="btn btn-ghost" id="t-restart">Repetir el test</button><a class="btn btn-wa" href="${waLink(`Hola Parcor 👋 Hice el test (${resumen.join(', ').toLowerCase()}) y me recomendó: ${ranked.map(x => x.p.nombre).join(', ')}. Quiero asesoría para decidir.`)}" target="_blank" rel="noopener">Pedir asesoría</a></div>`;
      $('#t-restart').addEventListener('click', () => { this.r = {}; this.step = 0; this.skip = []; this.render(); });
      $('#t-edit').addEventListener('click', () => { this.step = 0; this.skip = []; this.render(); });
      $$('[data-add]', body).forEach(b => b.addEventListener('click', () => {
        const p = byId(b.dataset.add);
        Cart.add({ key: `${p.id}|${b.dataset.altura}|${b.dataset.talla}`, id: p.id, nombre: `${p.nombre} ${b.dataset.altura} cm`, variante: tallaLabel(b.dataset.talla), precio: Number(b.dataset.precio), qty: 1, img: p.img && p.img[0] || '', sku: '' });
        this.close(); toast('Agregado al pedido'); Cart.open();
      }));
      $$('a[href^="#/p/"]', body).forEach(a => a.addEventListener('click', () => this.close()));
    }
  };
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-test-start]'); if (!b) return;
    e.preventDefault(); Cart.close(); Test.open(b.dataset.testStart || null);
  });
  $('#test-close').addEventListener('click', () => Test.close());
  $('#test-overlay').addEventListener('click', () => Test.close());
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { Test.close(); Cart.close(); } });

  /* =====================================================================
     ROUTER
     ===================================================================== */
  let currentCat = 'enrollados';
  function show(id) { $$('.view').forEach(v => { v.hidden = v.id !== id; }); }
  function route() {
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').filter(Boolean);
    $$('.nav a').forEach(a => a.classList.remove('active'));
    if (parts[0] === 'catalogo') {
      currentCat = parts[1] && catById(parts[1]) ? parts[1] : 'enrollados';
      show('view-catalogo'); renderCatalogo(currentCat); window.scrollTo(0, 0);
      $$('.nav a').forEach(a => { if ((currentCat === 'enrollados' || currentCat === 'extendidos') ? a.getAttribute('href') === '#/catalogo/enrollados' : a.getAttribute('href') === '#/catalogo/almohadas') a.classList.add('active'); });
    } else if (parts[0] === 'p' && parts[1]) {
      sel.altura = null; sel.talla = null; sel.variante = 0; sel.qty = 1; sel.img = 0;
      show('view-producto'); renderProducto(parts[1]); window.scrollTo(0, 0);
    } else if (parts[0] === 'test') {
      show('view-home'); Test.open(null);
    } else {
      show('view-home');
      if (pendingScroll) { const t = $('#' + pendingScroll); pendingScroll = null; if (t) setTimeout(() => t.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30); }
      else if (!parts.length && location.hash !== '#/') window.scrollTo(0, 0);
    }
    $('#nav').classList.remove('open'); $('#burger').setAttribute('aria-expanded', 'false');
  }
  let pendingScroll = null;
  document.addEventListener('click', e => {
    const a = e.target.closest('a[data-scroll]'); if (!a) return;
    pendingScroll = a.dataset.scroll;
    if (location.hash === '#/' || location.hash === '') { e.preventDefault(); route(); }
  });
  $('#burger').addEventListener('click', () => { const n = $('#nav'); n.classList.toggle('open'); $('#burger').setAttribute('aria-expanded', n.classList.contains('open')); });
  window.addEventListener('hashchange', route);

  /* ---------------- arranque ---------------- */
  Cart.load(); Cart.renderBadge();
  renderHome(); renderRevision(); route();
})();
