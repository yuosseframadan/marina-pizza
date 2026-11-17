/* مارينا بيتزا — رسم المنيو من menu-data.js + سلة الطلب + رسالة واتساب جاهزة.
   مفيش حاجة هنا محتاجة تعديل لما الأسعار تتغير: عدّل menu-data.js بس. */
(function () {
  'use strict';
  var D = window.MARINA, C = D.config;
  var SIZES = ['صغير', 'وسط', 'كبير'];
  var LS_CART = 'marina-cart-v1', LS_CUST = 'marina-customer-v1';

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function h(tag, attrs) {
    var e = document.createElement(tag), k, i, c;
    if (attrs) for (k in attrs) {
      var v = attrs[k];
      if (v == null || v === false) continue;
      if (k === 'class') e.className = v;
      else if (k === 'text') e.textContent = v;
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), v);
      else e.setAttribute(k, v === true ? '' : v);
    }
    for (i = 2; i < arguments.length; i++) {
      c = arguments[i];
      if (c == null || c === false) continue;
      if (Array.isArray(c)) c.forEach(function (x) { if (x != null && x !== false) e.appendChild(typeof x === 'string' ? document.createTextNode(x) : x); });
      else e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c);
    }
    return e;
  }
  function store(key, val) { try { if (val === undefined) { var r = localStorage.getItem(key); return r ? JSON.parse(r) : null; } localStorage.setItem(key, JSON.stringify(val)); } catch (e) { return null; } return null; }
  function money(n) { return n + ' ' + C.currency; }
  function digits(s) { return String(s).replace(/[٠-٩]/g, function (d) { return d.charCodeAt(0) - 1632; }).replace(/[۰-۹]/g, function (d) { return d.charCodeAt(0) - 1776; }); }
  function waLink(num, text) { return 'https://wa.me/' + num + '?text=' + encodeURIComponent(text); }

  /* ------------- الأرقام والروابط الثابتة ------------- */
  $$('[data-order-phone]').forEach(function (n) { n.textContent = C.orderPhone; });
  $$('[data-call]').forEach(function (a) { a.setAttribute('href', 'tel:' + C.orderPhone); });
  var designer = $('#designer'); if (designer) { designer.textContent = C.designer.name; designer.setAttribute('href', C.designer.url); }
  $('#quickChat').setAttribute('href', waLink(C.orderWa, 'أهلاً مارينا، عايز أطلب'));

  /* ------------- السلة (الحالة) ------------- */
  var REG = {};   // key -> تعريف الصنف الحالي (السعر بيتاخد من هنا دايماً)
  var cart = [];  // { key, qty, combo }

  function saveCart() { store(LS_CART, cart.map(function (l) { return { key: l.key, name: REG[l.key] && REG[l.key].name, qty: l.qty, combo: l.combo }; })); }
  function lineUnit(l) { var d = REG[l.key]; return d.price + (l.combo && d.comboOk ? C.comboPrice : 0); }
  function lineTotal(l) { return lineUnit(l) * l.qty; }
  function totals() { var n = 0, t = 0; cart.forEach(function (l) { n += l.qty; t += lineTotal(l); }); return { n: n, t: t }; }

  function register(sec, groupShort, name, variant, price, key) {
    var short = groupShort != null ? groupShort : sec.short;
    REG[key] = { key: key, sid: sec.id, prefix: short, name: name, variant: variant, price: price, comboOk: !!sec.combo };
  }

  /* ------------- رسم المنيو ------------- */
  var toastTimer;
  function toast(msg) {
    var t = $('#toast'); t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer); toastTimer = setTimeout(function () { t.classList.remove('show'); }, 1800);
  }
  function addToCart(key, btn) {
    var l = cart.filter(function (x) { return x.key === key; })[0];
    if (l) l.qty++; else cart.push({ key: key, qty: 1, combo: false });
    saveCart(); renderCart();
    var d = REG[key];
    if (!drawer.hidden) return;
    toast('اتضاف: ' + (d.prefix ? d.prefix + ' ' : '') + d.name + (d.variant ? ' (' + d.variant + ')' : ''));
    if (btn) { btn.classList.add('added'); setTimeout(function () { btn.classList.remove('added'); }, 650); }
    var b = $('#openCart'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
  }
  function priceBtn(key, label, price, opts) {
    opts = opts || {};
    var d = REG[key];
    var aria = 'أضف ' + (d.prefix ? d.prefix + ' ' : '') + d.name + (d.variant ? ' ' + d.variant : '') + ' بسعر ' + price + ' جنيه';
    var kids = [];
    if (opts.label) kids.push(h('span', { class: 'pl', text: opts.label }));
    kids.push(h('span', { class: 'pv', text: String(price) }));
    if (opts.plus) kids.push(h('span', { class: 'plus', 'aria-hidden': 'true', text: '+' }));
    return h('button', { type: 'button', class: 'pbtn' + (opts.cls ? ' ' + opts.cls : ''), 'aria-label': aria, onclick: function (ev) { addToCart(key, ev.currentTarget); } }, kids);
  }
  function naBtn(label) {
    var kids = [];
    if (label) kids.push(h('span', { class: 'pl', text: label }));
    kids.push(h('span', { class: 'pv', text: '—' }));
    return h('button', { type: 'button', class: 'pbtn', disabled: true, 'aria-label': (label || '') + ' غير متاح' }, kids);
  }

  function renderCards(sec) {
    var wrap = h('div', { class: 'pizzas' });
    sec.items.forEach(function (it, ii) {
      var row = h('div', { class: 'prices' });
      it.sizes.forEach(function (p, vi) {
        if (p == null) { row.appendChild(naBtn(SIZES[vi])); return; }
        var key = sec.id + ':0:' + ii + ':' + vi;
        register(sec, null, it.name, SIZES[vi], p, key);
        row.appendChild(priceBtn(key, SIZES[vi], p, { label: SIZES[vi] }));
      });
      wrap.appendChild(h('article', { class: 'pizza' },
        h('img', { class: 'thumb', src: it.img, alt: '', width: '64', height: '64', loading: 'lazy' }),
        h('div', { class: 'pbody' }, h('h3', null, it.name, it.tag ? h('span', { class: 'tag', text: it.tag }) : null), row)));
    });
    return h('div', null, h('p', { class: 'note', text: 'الأسعار بالجنيه المصري. اضغط على السعر عشان تضيف الصنف للسلة. الشرطة (—) تعني إن الحجم ده مش متاح.' }), wrap);
  }

  function listItem(sec, gi, group, it, ii) {
    var key = sec.id + ':' + gi + ':' + ii + ':0';
    register(sec, group && group.short != null ? group.short : null, it.name, '', it.price, key);
    return h('li', null,
      h('span', { class: 'nm', text: it.name }), h('span', { class: 'dots', 'aria-hidden': 'true' }),
      priceBtn(key, null, it.price, { plus: true, cls: 'single' }),
      it.detail ? h('span', { class: 'det', text: it.detail }) : null);
  }
  function comboNote(sec) {
    if (!sec.combo) return null;
    return h('p', { class: 'note-combo' }, 'التحويل إلى كومبو ', h('small', { text: '(بطاطس + كولا)' }), ' +' + C.comboPrice + ' ' + C.currency + '. بتختاره من السلة.');
  }
  function renderList(sec) {
    return h('div', null, h('ul', { class: 'plist' }, sec.items.map(function (it, ii) { return listItem(sec, 0, null, it, ii); })), comboNote(sec));
  }

  function groupBlock(sec, gi, g) {
    if (g.layout === 'list') {
      return h('div', { class: 'grp' }, g.title ? h('div', { class: 'grp-h' }, h('h3', { text: g.title })) : null,
        h('ul', { class: 'plist' }, g.items.map(function (it, ii) { return listItem(sec, gi, g, it, ii); })));
    }
    var rows = g.items.map(function (it, ii) {
      var cells = it.sizes.map(function (p, vi) {
        if (p == null) return naBtn(null);
        var key = sec.id + ':' + gi + ':' + ii + ':' + vi;
        register(sec, g.short != null ? g.short : null, it.name, SIZES[vi], p, key);
        return priceBtn(key, null, p);
      });
      return h('div', { class: 'row3' }, h('span', { class: 'nm' }, it.name, it.detail ? h('span', { class: 'det', text: it.detail }) : null), cells);
    });
    var head = h('div', { class: 'grp-h' }, h('h3', { text: g.title || '' }),
      h('div', { class: 'cols', 'aria-hidden': 'true' }, SIZES.map(function (s) { return h('span', { text: s }); })));
    return h('div', { class: 'grp' }, head, rows);
  }
  function renderGrouped(sec) {
    var groups = sec.groups.map(function (g, gi) { return groupBlock(sec, gi, g); });
    if (sec.image) return h('div', { class: 'lead' }, h('img', { src: sec.image, alt: 'فطير شرقي مورّق من مارينا', loading: 'lazy' }), h('div', null, groups));
    return h('div', null, groups);
  }
  function renderExtras(sec) {
    return h('ul', { class: 'plist' }, sec.items.map(function (it, ii) {
      var multi = it.prices.length > 1;
      var chips = it.prices.map(function (p, vi) {
        var key = sec.id + ':0:' + ii + ':' + vi;
        register(sec, null, it.name, multi ? 'سعر ' + p + ' ' + C.currency : '', p, key);
        return priceBtn(key, null, p);
      });
      return h('li', null, h('span', { class: 'nm', text: it.name }), h('span', { class: 'dots', 'aria-hidden': 'true' }), h('span', { class: 'chips' }, chips),
        it.detail ? h('span', { class: 'det', text: it.detail }) : null);
    }));
  }

  function copyBtn(which, label) { return h('button', { class: 'copy', type: 'button', 'data-copy': which, text: label || 'نسخ الرقم' }); }
  function renderBranches() {
    var cards = D.branches.map(function (b) { return h('div', { class: 'card' }, h('h3', { text: b.name }), h('p', { text: b.address })); });
    var ic = function (path) { var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); s.setAttribute('class', 'ic'); s.setAttribute('viewBox', '0 0 24 24'); s.setAttribute('aria-hidden', 'true'); var p = document.createElementNS('http://www.w3.org/2000/svg', 'path'); p.setAttribute('fill', 'currentColor'); p.setAttribute('d', path); s.appendChild(p); return s; };
    var WA = 'M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3a.5.5 0 0 0 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.8 11.9 11.9 0 0 0 4.6 4c1.7.7 2.4.8 3.2.7a2.7 2.7 0 0 0 1.8-1.3 2.2 2.2 0 0 0 .2-1.3c-.1-.1-.3-.2-.5-.3z';
    var PH = 'M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.6a1 1 0 0 1-.25 1z';
    var FB = 'M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.95.45-1.9 1.95-1.9h1.5V3.7s-1.3-.2-2.6-.2c-2.7 0-4.4 1.6-4.4 4.5v2.5H7v3.3h2.95V22z';
    cards.push(h('div', { class: 'card' }, h('h3', { text: 'للطلبات' }),
      h('div', { class: 'numline' }, h('bdi', { dir: 'ltr', text: C.orderPhone }), copyBtn('order')),
      h('div', { class: 'cta' },
        h('a', { class: 'btn wa', href: waLink(C.orderWa, 'أهلاً مارينا، عايز أطلب'), target: '_blank', rel: 'noopener' }, ic(WA), ' واتساب'),
        h('a', { class: 'btn call', href: 'tel:' + C.orderPhone }, ic(PH), ' اتصال'))));
    cards.push(h('div', { class: 'card' }, h('h3', { text: 'للشكاوى والاستفسارات' }),
      h('div', { class: 'numline' }, h('bdi', { dir: 'ltr', text: C.complaintPhone }), copyBtn('complaint')),
      h('div', { class: 'cta' }, h('a', { class: 'btn wa', href: waLink(C.complaintWa, 'أهلاً مارينا، عندي استفسار'), target: '_blank', rel: 'noopener' }, ic(WA), ' واتساب'))));
    cards.push(h('div', { class: 'card' }, h('h3', { text: 'تابعنا' }), h('p', { text: 'فطاطري مارينا على فيسبوك.' }),
      h('div', { class: 'cta' }, h('a', { class: 'btn ghost', href: C.facebook, target: '_blank', rel: 'noopener' }, ic(FB), ' صفحة فيسبوك'))));
    return h('div', { class: 'contact' }, cards);
  }

  var main = $('#menu'), nav = $('#nav');
  D.sections.forEach(function (sec) {
    var body = sec.type === 'cards' ? renderCards(sec) : sec.type === 'grouped' ? renderGrouped(sec) : sec.type === 'extras' ? renderExtras(sec) : renderList(sec);
    main.appendChild(h('section', { id: sec.id },
      h('div', { class: 'sec-h' }, h('h2', { text: sec.title }), sec.slogan ? h('span', { class: 'slogan', text: sec.slogan }) : null),
      h('div', { class: 'sec-b' }, body)));
    nav.appendChild(h('a', { href: '#' + sec.id, 'data-t': sec.id, text: sec.title }));
  });
  main.appendChild(h('section', { id: 'branches' }, h('div', { class: 'sec-h' }, h('h2', { text: 'فروعنا' }), h('span', { class: 'slogan', text: 'للتواصل والطلبات' })), h('div', { class: 'sec-b' }, renderBranches())));
  nav.appendChild(h('a', { href: '#branches', 'data-t': 'branches', text: 'فروعنا' }));

  /* التنقل بين الأقسام */
  function goTo(id) { var t = document.getElementById(id); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  $$('[data-t]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); goTo(a.getAttribute('data-t')); }); });
  $$('[data-scroll]').forEach(function (a) { a.addEventListener('click', function (e) { e.preventDefault(); goTo(a.getAttribute('data-scroll')); }); });
  if ('IntersectionObserver' in window) {
    var links = $$('#nav a'), map = {};
    links.forEach(function (a) { map[a.getAttribute('data-t')] = a; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        if (en.isIntersecting) {
          links.forEach(function (a) { a.classList.remove('on'); });
          var a = map[en.target.id];
          if (a) { a.classList.add('on'); var nr = nav.getBoundingClientRect(), ar = a.getBoundingClientRect(); if (ar.left < nr.left || ar.right > nr.right) nav.scrollLeft += (ar.left + ar.right) / 2 - (nr.left + nr.right) / 2; }
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    Object.keys(map).forEach(function (id) { var el = document.getElementById(id); if (el) io.observe(el); });
  }

  /* نسخ الأرقام */
  function flashCopied(b) { var o = b.textContent; b.textContent = 'تم النسخ'; setTimeout(function () { b.textContent = o; }, 1600); }
  function selectText(node) { var r = document.createRange(); r.selectNodeContents(node); var s = window.getSelection(); s.removeAllRanges(); s.addRange(r); }
  function copyText(text, btn, fallbackNode) {
    var fb = function () { if (fallbackNode) selectText(fallbackNode); };
    try { navigator.clipboard.writeText(text).then(function () { flashCopied(btn); }, fb); } catch (e) { fb(); }
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest && e.target.closest('.copy[data-copy]'); if (!b) return;
    var num = b.getAttribute('data-copy') === 'order' ? C.orderPhone : C.complaintPhone;
    copyText(num, b, b.parentNode.querySelector('bdi'));
  });

  /* ------------- رسالة الواتساب ------------- */
  function getForm() {
    var otype = ($('input[name="otype"]:checked') || {}).value || 'delivery';
    var br = $('input[name="branch"]:checked');
    return { name: $('#fName').value.trim(), phone: digits($('#fPhone').value).replace(/[^\d]/g, ''), otype: otype, branch: br ? br.value : '', addr: $('#fAddr').value.trim(), notes: $('#fNotes').value.trim() };
  }
  function branchName(id) { var b = D.branches.filter(function (x) { return x.id === id; })[0]; return b ? b.name : '—'; }
  var touched = false; // العميل لمس نموذج البيانات (عشان نعرف نحط نوع الطلب والفرع في الرسالة السريعة)
  function buildMessage(quick) {
    var f = getForm(), t = totals(), L = [], sep = '──────────';
    var engaged = !quick || touched || !!(f.name || f.phone || f.addr);
    L.push('*طلب جديد من موقع مارينا بيتزا*'); L.push(sep);
    if (!quick || f.name) L.push('الاسم: ' + (f.name || '—'));
    if (!quick || f.phone) L.push('الموبايل: ' + (f.phone || '—'));
    if (engaged) {
      L.push('نوع الطلب: ' + (f.otype === 'delivery' ? 'توصيل' : 'استلام من الفرع'));
      L.push((f.otype === 'delivery' ? 'أقرب فرع: ' : 'الفرع: ') + branchName(f.branch));
    }
    if (f.otype === 'delivery' && (!quick || f.addr)) L.push('العنوان: ' + (f.addr || '—'));
    if (L.length > 2) L.push(sep);
    L.push('*الأصناف:*');
    cart.forEach(function (l, i) {
      var d = REG[l.key];
      var nm = (d.prefix ? d.prefix + ' ' : '') + d.name + (d.variant ? ' (' + d.variant + ')' : '');
      L.push((i + 1) + ') ' + nm + ' × ' + l.qty + ' = ' + money(lineTotal(l)));
      if (l.combo && d.comboOk) L.push('    + كومبو (بطاطس + كولا) ' + money(C.comboPrice) + ' للواحد');
    });
    L.push(sep); L.push('*الإجمالي: ' + money(t.t) + '*');
    if (f.otype === 'delivery' && engaged) L.push('(رسوم التوصيل لو فيه بتتأكد معاكم)');
    if (f.notes) { L.push(sep); L.push('ملاحظات: ' + f.notes); }
    return L.join('\n');
  }

  /* ------------- رسم السلة ------------- */
  function renderCart() {
    cart = cart.filter(function (l) { return REG[l.key] && l.qty > 0; });
    var t = totals(), ul = $('#cartLines');
    $('#cartCount').textContent = t.n;
    var bt = $('#cartTotal'); bt.hidden = t.n === 0; bt.textContent = money(t.t);
    $('#sheetTotal').textContent = money(t.t);
    ul.textContent = '';
    cart.forEach(function (l) {
      var d = REG[l.key];
      var unit = (d.variant && !/^سعر/.test(d.variant) ? d.variant + ' · ' : '') + money(lineUnit(l)) + ' للواحد' + (l.combo && d.comboOk ? ' (شامل الكومبو)' : '');
      var nameTxt = (d.prefix ? d.prefix + ' ' : '') + d.name + (/^سعر/.test(d.variant) ? ' (' + d.variant + ')' : '');
      var line = h('li', { class: 'line' },
        h('div', { class: 'line-top' },
          h('div', { class: 'line-name' }, nameTxt, h('small', { class: 'line-unit', text: unit })),
          h('span', { class: 'line-sum', text: money(lineTotal(l)) })),
        h('div', { class: 'line-ctl' },
          h('div', { class: 'qty' },
            h('button', { type: 'button', 'aria-label': 'قلل الكمية', disabled: l.qty <= 1 ? true : null, text: '−', onclick: function () { l.qty--; saveCart(); renderCart(); } }),
            h('output', { 'aria-label': 'الكمية', text: String(l.qty) }),
            h('button', { type: 'button', 'aria-label': 'زوّد الكمية', text: '+', onclick: function () { if (l.qty < 99) { l.qty++; saveCart(); renderCart(); } } })),
          d.comboOk ? h('label', { class: 'combo-opt' },
            h('input', { type: 'checkbox', checked: l.combo ? true : null, onchange: function (e) { l.combo = e.target.checked; saveCart(); renderCart(); } }),
            'كومبو (بطاطس + كولا) +' + C.comboPrice) : null,
          h('button', { type: 'button', class: 'line-del', 'aria-label': 'احذف ' + d.name + ' من السلة', text: 'حذف', onclick: function () { l.qty = 0; saveCart(); renderCart(); } })));
      ul.appendChild(line);
    });
    var has = cart.length > 0;
    $('#cartEmpty').hidden = has; $('#orderForm').hidden = !has; $('#preview').hidden = !has; $('#addMore').hidden = !has;
    refreshOutput();
  }

  function refreshOutput() {
    var msg = buildMessage(false);
    $('#msgPreview').textContent = msg;
    var a = $('#sendWa'), has = cart.length > 0;
    a.setAttribute('href', has ? waLink(C.orderWa, msg) : '#');
    a.setAttribute('aria-disabled', has ? 'false' : 'true');
    // زر واتساب في الشريط السفلي: رسالة جاهزة بالأصناف (أو تحية لو السلة فاضية)
    $('#barWa').setAttribute('href', waLink(C.orderWa, has ? buildMessage(true) : 'أهلاً مارينا، عايز أطلب'));
  }

  /* ------------- النموذج والتحقق ------------- */
  var branchSeg = $('#branchSeg');
  D.branches.forEach(function (b, i) {
    branchSeg.appendChild(h('label', null, h('input', { type: 'radio', name: 'branch', value: b.id, checked: i === 0 ? true : null }), h('span', { text: b.name })));
  });
  function syncType() {
    var del = getForm().otype === 'delivery';
    $('#addrField').hidden = !del;
    $('#branchLegend').textContent = del ? 'أقرب فرع ليك' : 'الفرع اللي هتستلم منه';
  }
  function setErr(inputId, errId, msg) {
    var i = $('#' + inputId), e = $('#' + errId);
    if (e) e.textContent = msg || '';
    if (i) { if (msg) i.setAttribute('aria-invalid', 'true'); else i.removeAttribute('aria-invalid'); }
    return !msg;
  }
  function validate() {
    var f = getForm(), bad = [];
    if (!setErr('fName', 'eName', f.name.length >= 2 ? '' : 'اكتب اسمك.')) bad.push('fName');
    if (!setErr('fPhone', 'ePhone', /^01[0125]\d{8}$/.test(f.phone) ? '' : 'اكتب رقم موبايل مصري صحيح: 11 رقم بيبدأ بـ 01.')) bad.push('fPhone');
    if (f.otype === 'delivery') { if (!setErr('fAddr', 'eAddr', f.addr.length >= 6 ? '' : 'اكتب العنوان بالتفصيل عشان نوصلك.')) bad.push('fAddr'); } else setErr('fAddr', 'eAddr', '');
    return bad;
  }
  var cust = store(LS_CUST);
  if (cust) { $('#fName').value = cust.name || ''; $('#fPhone').value = cust.phone || ''; $('#fAddr').value = cust.addr || ''; }
  function saveCust() { var f = getForm(); store(LS_CUST, { name: f.name, phone: f.phone, addr: f.addr }); }
  $('#orderForm').addEventListener('input', function (e) { touched = true; if (e.target.hasAttribute && e.target.hasAttribute('aria-invalid')) { validate(); } syncType(); refreshOutput(); saveCust(); $('#sendNote').textContent = ''; });
  $('#orderForm').addEventListener('change', function () { touched = true; syncType(); refreshOutput(); });
  $('#orderForm').addEventListener('submit', function (e) { e.preventDefault(); });

  $('#sendWa').addEventListener('click', function (e) {
    var note = $('#sendNote');
    if (!cart.length) { e.preventDefault(); note.textContent = 'ضيف أصناف للسلة الأول.'; return; }
    var bad = validate();
    if (bad.length) { e.preventDefault(); note.textContent = 'كمّل البيانات الناقصة فوق.'; var f = $('#' + bad[0]); if (f) { f.scrollIntoView({ block: 'center' }); f.focus(); } return; }
    refreshOutput(); saveCust();
    note.textContent = 'اتفتح واتساب برسالة جاهزة. اضغط إرسال هناك عشان الطلب يوصل للمطعم. لو ماتفتحش، اضغط "نسخ الرسالة" وابعتها على ' + C.orderPhone + '.';
  });
  $('#copyMsg').addEventListener('click', function (e) {
    var pv = $('#preview'); refreshOutput();
    copyText(buildMessage(false), e.currentTarget, null);
    if (!navigator.clipboard) { pv.open = true; selectText($('#msgPreview')); }
  });
  $('#clearCart').addEventListener('click', function () { cart = []; saveCart(); renderCart(); $('#sendNote').textContent = ''; });

  /* ------------- فتح وغلق السلة ------------- */
  var drawer = $('#drawer'), sheet = $('.sheet', drawer), lastFocus = null;
  function focusables() { return $$('a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), summary, [tabindex="0"]', sheet).filter(function (n) { return n.offsetParent !== null; }); }
  function openCart() {
    if (!drawer.hidden) return;
    lastFocus = document.activeElement; $('#toast').classList.remove('show'); drawer.hidden = false;
    document.documentElement.style.overflow = 'hidden'; syncType(); renderCart(); sheet.focus();
    try { if (location.hash !== '#cart') location.hash = 'cart'; } catch (e) {}
  }
  function hideCart() { drawer.hidden = true; document.documentElement.style.overflow = ''; if (lastFocus && lastFocus.focus) lastFocus.focus(); }
  function closeCart() {
    if (drawer.hidden) return;
    hideCart();
    try { if (location.hash === '#cart') history.back(); } catch (e) {}
  }
  window.addEventListener('hashchange', function () { if (location.hash !== '#cart' && !drawer.hidden) hideCart(); });
  try { if (location.hash === '#cart') history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
  $('#openCart').addEventListener('click', openCart);
  $$('[data-close]', drawer).forEach(function (n) { n.addEventListener('click', closeCart); });
  $('#addMore').addEventListener('click', closeCart);
  document.addEventListener('keydown', function (e) {
    if (drawer.hidden) return;
    if (e.key === 'Escape') { closeCart(); return; }
    if (e.key === 'Tab') {
      var f = focusables(); if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && (document.activeElement === first || document.activeElement === sheet)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });

  /* استرجاع السلة المحفوظة (الصنف يتطابق بالاسم والمفتاح، والسعر دايماً من المنيو الحالي) */
  var saved = store(LS_CART);
  if (saved && saved.forEach) saved.forEach(function (s) { var d = REG[s.key]; if (d && d.name === s.name && s.qty > 0) cart.push({ key: s.key, qty: Math.min(99, s.qty | 0), combo: !!s.combo }); });
  syncType(); renderCart();
})();
